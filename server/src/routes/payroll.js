import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import path from 'path';
import fs from 'fs';
import PDFDocument from 'pdfkit';
import { prisma } from '../lib/prisma.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

const uploadsDir = process.env.UPLOADS_DIR || path.join(process.cwd(), 'uploads');
const receiptsDir = path.join(uploadsDir, 'receipts');
if (!fs.existsSync(receiptsDir)) fs.mkdirSync(receiptsDir, { recursive: true });

function generateReceiptPDF(payroll, employee) {
  return new Promise((resolve, reject) => {
    const fileName = `recibo-${employee.employeeCode}-${payroll.periodYear}-${String(payroll.periodMonth).padStart(2, '0')}.pdf`;
    const filePath = path.join(receiptsDir, fileName);
    const doc = new PDFDocument({ margin: 50 });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);
    doc.fontSize(18).text('BRAYTON SRL', { align: 'center' });
    doc.fontSize(10).text('Recibo de sueldo', { align: 'center' }).moveDown();
    doc.fontSize(12).text(`Empleado: ${employee.lastName}, ${employee.firstName}`);
    doc.text(`Legajo: ${employee.employeeCode} | DNI: ${employee.dni}`).moveDown();
    doc.text(`Período: ${String(payroll.periodMonth).padStart(2, '0')}/${payroll.periodYear}`).moveDown();
    doc.text(`Salario base: $ ${Number(payroll.baseSalary).toFixed(2)}`);
    doc.text(`Bonificaciones: $ ${Number(payroll.bonuses).toFixed(2)}`);
    doc.text(`Descuentos: $ ${Number(payroll.deductions).toFixed(2)}`);
    doc.text(`Horas extras: ${payroll.overtimeHours} - $ ${Number(payroll.overtimeAmount).toFixed(2)}`);
    doc.moveDown().fontSize(14).text(`TOTAL NETO: $ ${Number(payroll.netAmount).toFixed(2)}`, { align: 'right' });
    doc.end();
    stream.on('finish', () => resolve({ filePath, fileName }));
    stream.on('error', reject);
    doc.on('error', reject);
  });
}

router.get('/', async (req, res, next) => {
  try {
    const { employeeId, year, month } = req.query;
    const where = {};
    if (req.user.role.name === 'Empleado' && req.user.employeeId)
      where.employeeId = req.user.employeeId;
    else if (employeeId) where.employeeId = employeeId;
    if (year) where.periodYear = parseInt(year, 10);
    if (month) where.periodMonth = parseInt(month, 10);
    const list = await prisma.payroll.findMany({
      where,
      include: { employee: { select: { employeeCode: true, firstName: true, lastName: true } }, receipt: true },
      orderBy: [{ periodYear: 'desc' }, { periodMonth: 'desc' }],
    });
    res.json(list);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const payroll = await prisma.payroll.findUnique({
      where: { id: req.params.id },
      include: { employee: true, receipt: true },
    });
    if (!payroll) return res.status(404).json({ error: 'Liquidación no encontrada' });
    if (req.user.role.name === 'Empleado' && payroll.employeeId !== req.user.employeeId)
      return res.status(403).json({ error: 'Sin permisos' });
    res.json(payroll);
  } catch (e) {
    next(e);
  }
});

router.post(
  '/',
  requireRole('SuperAdmin', 'Administrador', 'RRHH', 'Contabilidad'),
  body('employeeId').notEmpty(),
  body('periodMonth').isInt({ min: 1, max: 12 }),
  body('periodYear').isInt({ min: 2020, max: 2030 }),
  body('baseSalary').isFloat({ min: 0 }),
  body('bonuses').optional().isFloat({ min: 0 }),
  body('deductions').optional().isFloat({ min: 0 }),
  body('overtimeHours').optional().isFloat({ min: 0 }),
  body('overtimeAmount').optional().isFloat({ min: 0 }),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      const { employeeId, periodMonth, periodYear, baseSalary, bonuses = 0, deductions = 0, overtimeHours = 0, overtimeAmount = 0 } = req.body;
      const netAmount = Number(baseSalary) + Number(bonuses) - Number(deductions) + Number(overtimeAmount);
      const existing = await prisma.payroll.findUnique({
        where: { employeeId_periodMonth_periodYear: { employeeId, periodMonth, periodYear } },
      });
      if (existing) return res.status(400).json({ error: 'Ya existe liquidación para ese período' });
      const employee = await prisma.employee.findUnique({ where: { id: employeeId } });
      if (!employee) return res.status(404).json({ error: 'Empleado no encontrado' });
      const payroll = await prisma.payroll.create({
        data: {
          employeeId,
          periodMonth,
          periodYear,
          baseSalary,
          bonuses,
          deductions,
          overtimeHours,
          overtimeAmount,
          netAmount,
        },
        include: { employee: true },
      });
      const { filePath, fileName } = await generateReceiptPDF(payroll, employee);
      const fileKey = path.basename(filePath);
      await prisma.salaryReceipt.create({
        data: { payrollId: payroll.id, fileKey, fileName },
      });
      const updated = await prisma.payroll.findUnique({
        where: { id: payroll.id },
        include: { employee: true, receipt: true },
      });
      res.status(201).json(updated);
    } catch (e) {
      next(e);
    }
  }
);

router.get('/:id/receipt', async (req, res, next) => {
  try {
    const payroll = await prisma.payroll.findUnique({
      where: { id: req.params.id },
      include: { employee: true, receipt: true },
    });
    if (!payroll?.receipt) return res.status(404).json({ error: 'Recibo no encontrado' });
    if (req.user.role.name === 'Empleado' && payroll.employeeId !== req.user.employeeId)
      return res.status(403).json({ error: 'Sin permisos' });
    const filePath = path.join(receiptsDir, payroll.receipt.fileKey);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Archivo no encontrado' });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${payroll.receipt.fileName}"`);
    fs.createReadStream(filePath).pipe(res);
  } catch (e) {
    next(e);
  }
});

export { router as payrollRouter };
