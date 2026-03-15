import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../lib/prisma.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

const canManageEmployees = requireRole('SuperAdmin', 'Administrador', 'RRHH');

router.get('/', async (req, res, next) => {
  try {
    if (req.user.role.name === 'Empleado' && req.user.employeeId) {
      const emp = await prisma.employee.findUnique({
        where: { id: req.user.employeeId },
        include: { payrolls: { orderBy: [{ periodYear: 'desc' }, { periodMonth: 'desc' }], take: 12 } },
      });
      return res.json(emp ? [emp] : []);
    }
    const active = req.query.active !== 'false';
    const list = await prisma.employee.findMany({
      where: active ? { active: true } : {},
      include: { payrolls: { take: 1, orderBy: [{ periodYear: 'desc' }, { periodMonth: 'desc' }] } },
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
    if (req.user.role.name === 'Empleado' && req.user.employeeId !== id)
      return res.status(403).json({ error: 'Sin permisos' });
    const emp = await prisma.employee.findUnique({
      where: { id },
      include: { documents: true, payrolls: { orderBy: [{ periodYear: 'desc' }, { periodMonth: 'desc' }] } },
    });
    if (!emp) return res.status(404).json({ error: 'Empleado no encontrado' });
    res.json(emp);
  } catch (e) {
    next(e);
  }
});

router.post(
  '/',
  canManageEmployees,
  body('firstName').trim().notEmpty(),
  body('lastName').trim().notEmpty(),
  body('dni').trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('hireDate').isISO8601(),
  body('position').trim().notEmpty(),
  body('area').trim().notEmpty(),
  body('salary').isFloat({ min: 0 }),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      const count = await prisma.employee.count();
      const employeeCode = 'EMP-' + String(count + 1).padStart(4, '0');
      const data = {
        employeeCode,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dni: req.body.dni,
        email: req.body.email,
        phone: req.body.phone || null,
        address: req.body.address || null,
        hireDate: new Date(req.body.hireDate),
        position: req.body.position,
        area: req.body.area,
        salary: req.body.salary,
      };
      const employee = await prisma.employee.create({ data });
      res.status(201).json(employee);
    } catch (e) {
      next(e);
    }
  }
);

router.patch('/:id', canManageEmployees, async (req, res, next) => {
  try {
    const { firstName, lastName, dni, email, phone, address, position, area, salary, active } = req.body;
    const employee = await prisma.employee.update({
      where: { id: req.params.id },
      data: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(dni && { dni }),
        ...(email && { email }),
        ...(phone !== undefined && { phone }),
        ...(address !== undefined && { address }),
        ...(position && { position }),
        ...(area && { area }),
        ...(salary !== undefined && { salary }),
        ...(typeof active !== 'undefined' && { active }),
      },
    });
    res.json(employee);
  } catch (e) {
    next(e);
  }
});

export { router as employeesRouter };
