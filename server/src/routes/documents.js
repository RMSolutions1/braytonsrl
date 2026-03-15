import { Router } from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { prisma } from '../lib/prisma.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

const uploadsDir = process.env.UPLOADS_DIR || path.join(process.cwd(), 'uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(uploadsDir, req.body.category || 'docs');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname) || '.bin');
  },
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

router.post('/upload', upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No se subió archivo' });
    const { category, projectId, employeeId, type } = req.body;
    const fileKey = path.relative(uploadsDir, req.file.path);
    const fileName = req.file.originalname || req.file.filename;
    if (projectId) {
      await prisma.projectDocument.create({
        data: { projectId, type: type || 'otro', fileKey, fileName },
      });
    } else if (employeeId) {
      await prisma.employeeDocument.create({
        data: { employeeId, type: type || 'otro', fileKey, fileName },
      });
    } else if (category) {
      await prisma.companyDocument.create({
        data: { category, fileKey, fileName },
      });
    } else {
      return res.status(400).json({ error: 'Indique category, projectId o employeeId' });
    }
    res.status(201).json({ fileKey, fileName });
  } catch (e) {
    next(e);
  }
});

router.get('/download/:fileKey', async (req, res, next) => {
  try {
    const rawKey = req.params.fileKey;
    if (!rawKey || rawKey.includes('..') || path.isAbsolute(rawKey)) {
      return res.status(400).json({ error: 'fileKey inválido' });
    }
    const resolved = path.resolve(uploadsDir, rawKey);
    if (!resolved.startsWith(path.resolve(uploadsDir))) {
      return res.status(400).json({ error: 'fileKey inválido' });
    }
    const filePath = path.join(uploadsDir, rawKey);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Archivo no encontrado' });
    const fileName = path.basename(filePath);
    res.setHeader('Content-Disposition', 'attachment; filename="' + fileName + '"');
    fs.createReadStream(filePath).pipe(res);
  } catch (e) {
    next(e);
  }
});

export { router as documentsRouter };
