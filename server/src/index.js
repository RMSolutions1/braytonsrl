import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { authRouter } from './routes/auth.js';
import { usersRouter } from './routes/users.js';
import { employeesRouter } from './routes/employees.js';
import { payrollRouter } from './routes/payroll.js';
import { clientsRouter } from './routes/clients.js';
import { providersRouter } from './routes/providers.js';
import { projectsRouter } from './routes/projects.js';
import { invoicesRouter } from './routes/invoices.js';
import { paymentsRouter } from './routes/payments.js';
import { documentsRouter } from './routes/documents.js';
import { notificationsRouter } from './routes/notifications.js';
import { dashboardRouter } from './routes/dashboard.js';
import { contactRouter } from './routes/contact.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
// Permitir varios orígenes en desarrollo (p. ej. cuando Next usa 3001, 3002, 3003)
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  ...Array.from({ length: 11 }, (_, i) => `http://localhost:${3000 + i}`),
  'https://braytonsrl.com.ar',
  'https://www.braytonsrl.com.ar'
].filter((v, i, a) => a.indexOf(v) === i);
app.use(cors({ origin: (origin, cb) => (origin && allowedOrigins.includes(origin)) ? cb(null, true) : cb(null, allowedOrigins[0]), credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/payroll', payrollRouter);
app.use('/api/clients', clientsRouter);
app.use('/api/providers', providersRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/invoices', invoicesRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/documents', documentsRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/contact', contactRouter);

app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`BRAYTON API running on port ${PORT}`);
});
