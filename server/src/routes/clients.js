import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../lib/prisma.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

router.get('/', async (req, res, next) => {
  try {
    if (req.user.role.name === 'Cliente' && req.user.clientId) {
      const c = await prisma.client.findUnique({
        where: { id: req.user.clientId },
        include: { projects: true, invoices: true },
      });
      return res.json(c ? [c] : []);
    }
    const list = await prisma.client.findMany({
      include: { projects: { take: 3 }, invoices: { take: 3 } },
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
    if (req.user.role.name === 'Cliente' && req.user.clientId !== id)
      return res.status(403).json({ error: 'Sin permisos' });
    const client = await prisma.client.findUnique({
      where: { id },
      include: { projects: true, invoices: true },
    });
    if (!client) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(client);
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
        address: req.body.address || null,
      };
      const client = await prisma.client.create({ data });
      res.status(201).json(client);
    } catch (e) {
      next(e);
    }
  }
);

router.patch('/:id', requireRole('SuperAdmin', 'Administrador'), async (req, res, next) => {
  try {
    const { company, contact, email, phone, address } = req.body;
    const client = await prisma.client.update({
      where: { id: req.params.id },
      data: {
        ...(company && { company }),
        ...(contact && { contact }),
        ...(email && { email }),
        ...(phone !== undefined && { phone }),
        ...(address !== undefined && { address }),
      },
    });
    res.json(client);
  } catch (e) {
    next(e);
  }
});

export { router as clientsRouter };
