import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { prisma } from '../lib/prisma.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh-change-me';
const ACCESS_EXPIRY = '15m';
const REFRESH_EXPIRY = '7d';

export { router as authRouter };

router.post(
  '/login',
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({
        where: { email },
        include: { role: true, employee: true, client: true, provider: true },
      });
      if (!user || !user.active)
        return res.status(401).json({ error: 'Credenciales inválidas' });
      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' });
      const accessToken = jwt.sign(
        { userId: user.id, role: user.role.name },
        JWT_SECRET,
        { expiresIn: ACCESS_EXPIRY }
      );
      const refreshToken = jwt.sign(
        { userId: user.id },
        JWT_REFRESH_SECRET,
        { expiresIn: REFRESH_EXPIRY }
      );
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);
      await prisma.refreshToken.create({
        data: { token: refreshToken, userId: user.id, expiresAt },
      });
      res.json({
        accessToken,
        refreshToken,
        expiresIn: 900,
        user: {
          id: user.id,
          email: user.email,
          role: user.role.name,
          roleId: user.roleId,
          employeeId: user.employeeId,
          clientId: user.clientId,
          providerId: user.providerId,
        },
      });
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  '/refresh',
  body('refreshToken').notEmpty(),
  async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      const stored = await prisma.refreshToken.findUnique({
        where: { token: refreshToken },
        include: { user: { include: { role: true } } },
      });
      if (!stored || stored.expiresAt < new Date())
        return res.status(401).json({ error: 'Refresh token inválido o expirado' });
      const accessToken = jwt.sign(
        { userId: stored.user.id, role: stored.user.role.name },
        JWT_SECRET,
        { expiresIn: ACCESS_EXPIRY }
      );
      res.json({ accessToken, expiresIn: 900 });
    } catch (e) {
      next(e);
    }
  }
);

router.post('/logout', body('refreshToken').notEmpty(), async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    await prisma.refreshToken.deleteMany({ where: { token: req.body.refreshToken } });
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});
