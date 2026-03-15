import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../lib/prisma.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

router.get('/', async (req, res, next) => {
  try {
    const list = await prisma.payment.findMany({
      include: { invoice: true, provider: true },
      orderBy: { date: 'desc' },
    });
    if (req.user.role.name === 'Proveedor' && req.user.providerId)
      return res.json(list.filter((p) => p.providerId === req.user.providerId));
    res.json(list);
  } catch (e) {
    next(e);
  }
});

router.post(
  '/',
  requireRole('SuperAdmin', 'Administrador', 'Contabilidad'),
  body('amount').isFloat({ min: 0 }),
  body('date').isISO8601(),
  body('type').trim().notEmpty(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      const data = {
        invoiceId: req.body.invoiceId || null,
        providerId: req.body.providerId || null,
        amount: req.body.amount,
        date: new Date(req.body.date),
        reference: req.body.reference || null,
        type: req.body.type,
      };
      const payment = await prisma.payment.create({ data });
      res.status(201).json(payment);
    } catch (e) {
      next(e);
    }
  }
);

export { router as paymentsRouter };
