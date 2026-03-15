import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../lib/prisma.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

router.get('/', async (req, res, next) => {
  try {
    if (req.user.role.name === 'Cliente' && req.user.clientId) {
      const list = await prisma.invoice.findMany({
        where: { clientId: req.user.clientId },
        include: { client: true, payments: true },
        orderBy: { issueDate: 'desc' },
      });
      return res.json(list);
    }
    const list = await prisma.invoice.findMany({
      include: { client: true, payments: true },
      orderBy: { issueDate: 'desc' },
    });
    res.json(list);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const inv = await prisma.invoice.findUnique({
      where: { id: req.params.id },
      include: { client: true, payments: true },
    });
    if (!inv) return res.status(404).json({ error: 'Factura no encontrada' });
    if (req.user.role.name === 'Cliente' && inv.clientId !== req.user.clientId)
      return res.status(403).json({ error: 'Sin permisos' });
    res.json(inv);
  } catch (e) {
    next(e);
  }
});

router.post(
  '/',
  requireRole('SuperAdmin', 'Administrador', 'Contabilidad'),
  body('clientId').notEmpty(),
  body('number').trim().notEmpty(),
  body('amount').isFloat({ min: 0 }),
  body('issueDate').isISO8601(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      const existing = await prisma.invoice.findUnique({ where: { number: req.body.number } });
      if (existing) return res.status(400).json({ error: 'Número de factura ya existe' });
      const data = {
        clientId: req.body.clientId,
        projectId: req.body.projectId || null,
        number: req.body.number,
        amount: req.body.amount,
        issueDate: new Date(req.body.issueDate),
        dueDate: req.body.dueDate ? new Date(req.body.dueDate) : null,
        status: req.body.status || 'pendiente',
      };
      const invoice = await prisma.invoice.create({ data });
      res.status(201).json(invoice);
    } catch (e) {
      next(e);
    }
  }
);

router.patch('/:id', requireRole('SuperAdmin', 'Administrador', 'Contabilidad'), async (req, res, next) => {
  try {
    const status = req.body.status;
    const invoice = await prisma.invoice.update({
      where: { id: req.params.id },
      data: status ? { status } : {},
      include: { client: true, payments: true },
    });
    res.json(invoice);
  } catch (e) {
    next(e);
  }
});

export { router as invoicesRouter };
