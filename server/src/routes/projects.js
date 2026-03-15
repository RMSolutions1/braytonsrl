import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../lib/prisma.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

router.get('/', async (req, res, next) => {
  try {
    if (req.user.role.name === 'Cliente' && req.user.clientId) {
      const list = await prisma.project.findMany({
        where: { clientId: req.user.clientId },
        include: { client: true, documents: true },
        orderBy: { createdAt: 'desc' },
      });
      return res.json(list);
    }
    const list = await prisma.project.findMany({
      include: { client: true, documents: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(list);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
      include: { client: true, documents: true },
    });
    if (!project) return res.status(404).json({ error: 'Proyecto no encontrado' });
    if (req.user.role.name === 'Cliente' && project.clientId !== req.user.clientId)
      return res.status(403).json({ error: 'Sin permisos' });
    res.json(project);
  } catch (e) {
    next(e);
  }
});

router.post(
  '/',
  requireRole('SuperAdmin', 'Administrador', 'Supervisor de obra'),
  body('name').trim().notEmpty(),
  body('clientId').notEmpty(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      const data = {
        name: req.body.name,
        clientId: req.body.clientId,
        location: req.body.location || null,
        budget: req.body.budget ? parseFloat(req.body.budget) : null,
        startDate: req.body.startDate ? new Date(req.body.startDate) : null,
        endDate: req.body.endDate ? new Date(req.body.endDate) : null,
        status: req.body.status || 'planificación',
      };
      const project = await prisma.project.create({ data });
      res.status(201).json(project);
    } catch (e) {
      next(e);
    }
  }
);

router.patch('/:id', requireRole('SuperAdmin', 'Administrador', 'Supervisor de obra'), async (req, res, next) => {
  try {
    const body_ = req.body;
    const data = {};
    if (body_.name) data.name = body_.name;
    if (body_.clientId) data.clientId = body_.clientId;
    if (body_.location !== undefined) data.location = body_.location;
    if (body_.budget !== undefined) data.budget = body_.budget;
    if (body_.startDate !== undefined) data.startDate = body_.startDate ? new Date(body_.startDate) : null;
    if (body_.endDate !== undefined) data.endDate = body_.endDate ? new Date(body_.endDate) : null;
    if (body_.status) data.status = body_.status;
    const project = await prisma.project.update({
      where: { id: req.params.id },
      data,
      include: { client: true, documents: true },
    });
    res.json(project);
  } catch (e) {
    next(e);
  }
});

export { router as projectsRouter };
