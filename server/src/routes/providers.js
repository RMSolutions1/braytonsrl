import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../lib/prisma.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

router.get('/', async (req, res, next) => {
  try {
    if (req.user.role.name === 'Proveedor' && req.user.providerId) {
      const p = await prisma.provider.findUnique({
        where: { id: req.user.providerId },
        include: { payments: true },
      });
      return res.json(p ? [p] : []);
    }
    const list = await prisma.provider.findMany({
      include: { payments: { take: 5 } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(list);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    if (req.user.role.name === 'Proveedor' && req.user.providerId !== id)
      return res.status(403).json({ error: 'Sin permisos' });
    const provider = await prisma.provider.findUnique({
      where: { id },
      include: { payments: true },
    });
    if (!provider) return res.status(404).json({ error: 'Proveedor no encontrado' });
    res.json(provider);
  } catch (e) {
    next(e);
  }
});

router.post(
  '/',
  requireRole('SuperAdmin', 'Administrador'),
  body('company').trim().notEmpty(),
  body('contact').trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      const data = {
        company: req.body.company,
        contact: req.body.contact,
        email: req.body.email,
        phone: req.body.phone || null,
        services: req.body.services || null,
      };
      const provider = await prisma.provider.create({ data });
      res.status(201).json(provider);
    } catch (e) {
      next(e);
    }
  }
);

router.patch('/:id', requireRole('SuperAdmin', 'Administrador'), async (req, res, next) => {
  try {
    const { company, contact, email, phone, services } = req.body;
    const provider = await prisma.provider.update({
      where: { id: req.params.id },
      data: {
        ...(company && { company }),
        ...(contact && { contact }),
        ...(email && { email }),
        ...(phone !== undefined && { phone }),
        ...(services !== undefined && { services }),
      },
    });
    res.json(provider);
  } catch (e) {
    next(e);
  }
});

export { router as providersRouter };
