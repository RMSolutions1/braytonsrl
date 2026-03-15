import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';

const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production';

export async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  const token = authHeader.slice(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { role: true, employee: true, client: true, provider: true },
    });
    if (!user?.active) return res.status(401).json({ error: 'Usuario inactivo' });
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'No autorizado' });
    if (allowedRoles.includes(req.user.role.name)) return next();
    return res.status(403).json({ error: 'Sin permisos para esta acción' });
  };
}

export function requirePermission(resource, action) {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'No autorizado' });
    if (req.user.role.name === 'SuperAdmin') return next();
    const role = await prisma.role.findUnique({
      where: { id: req.user.roleId },
      include: { permissions: { include: { permission: true } } },
    });
    const hasPermission = role?.permissions?.some(
      (rp) => rp.permission.resource === resource && rp.permission.action === action
    );
    if (hasPermission) return next();
    return res.status(403).json({ error: 'Sin permisos para esta acción' });
  };
}
