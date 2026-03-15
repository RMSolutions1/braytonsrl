import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

router.get('/metrics', async (req, res, next) => {
  try {
    const role = req.user.role.name;
    if (role === 'Cliente' || role === 'Proveedor' || role === 'Empleado') {
      return res.status(403).json({ error: 'Sin acceso al dashboard completo' });
    }
    const [projectsActive, employeesCount, clientsCount, providersCount, invoicesMonth, paymentsMonth] = await Promise.all([
      prisma.project.count({ where: { status: 'en ejecución' } }),
      prisma.employee.count({ where: { active: true } }),
      prisma.client.count(),
      prisma.provider.count(),
      prisma.invoice.aggregate({
        where: {
          issueDate: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
          },
        },
        _sum: { amount: true },
      }),
      prisma.payment.aggregate({
        where: {
          date: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
          },
        },
        _sum: { amount: true },
      }),
    ]);
    res.json({
      projectsActive,
      employeesCount,
      clientsCount,
      providersCount,
      invoicingMonth: Number(invoicesMonth._sum.amount || 0),
      paymentsMonth: Number(paymentsMonth._sum.amount || 0),
    });
  } catch (e) {
    next(e);
  }
});

export { router as dashboardRouter };
