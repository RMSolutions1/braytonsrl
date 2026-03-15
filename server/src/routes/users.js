import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import { prisma } from '../lib/prisma.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

router.get('/', requireRole('SuperAdmin', 'Administrador'), async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      include: { role: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(users.map((u) => ({ ...u, passwordHash: undefined })));
  } catch (e) {
    next(e);
  }
});

router.post(
  '/',
  requireRole('SuperAdmin', 'Administrador'),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('roleId').notEmpty(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      const { email, password, roleId, employeeId, clientId, providerId } = req.body;
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) return res.status(400).json({ error: 'Email ya registrado' });
      const passwordHash = await bcrypt.hash(password, 12);
      const user = await prisma.user.create({
        data: { email, passwordHash, roleId, employeeId: employeeId || null, clientId: clientId || null, providerId: providerId || null },
        include: { role: true },
      });
      const { passwordHash: _, ...rest } = user;
      res.status(201).json(rest);
    } catch (e) {
      next(e);
    }
  }
);

router.patch('/:id', requireRole('SuperAdmin', 'Administrador'), async (req, res, next) => {
  try {
    const { active, roleId } = req.body;
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { ...(typeof active !== 'undefined' && { active }), ...(roleId && { roleId }) },
      include: { role: true },
    });
    const { passwordHash: _, ...rest } = user;
    res.json(rest);
  } catch (e) {
    next(e);
  }
});

export { router as usersRouter };
