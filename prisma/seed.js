import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const ROLES = [
  'SuperAdmin',
  'Administrador',
  'RRHH',
  'Contabilidad',
  'Supervisor de obra',
  'Empleado',
  'Cliente',
  'Proveedor',
];

const RESOURCES = ['employees', 'payroll', 'clients', 'providers', 'projects', 'invoices', 'payments', 'documents', 'users'];
const ACTIONS = ['create', 'read', 'update', 'delete'];

const PASSWORD_TEST = 'Test123!';

const usersToCreate = [
  { email: 'admin@braytonsrl.com.ar', roleName: 'SuperAdmin', password: 'Admin123!' },
  { email: 'administrador@braytonsrl.com.ar', roleName: 'Administrador', password: PASSWORD_TEST },
  { email: 'rrhh@braytonsrl.com.ar', roleName: 'RRHH', password: PASSWORD_TEST },
  { email: 'contabilidad@braytonsrl.com.ar', roleName: 'Contabilidad', password: PASSWORD_TEST },
  { email: 'supervisor@braytonsrl.com.ar', roleName: 'Supervisor de obra', password: PASSWORD_TEST },
  { email: 'empleado@braytonsrl.com.ar', roleName: 'Empleado', password: PASSWORD_TEST },
  { email: 'cliente@braytonsrl.com.ar', roleName: 'Cliente', password: PASSWORD_TEST },
  { email: 'proveedor@braytonsrl.com.ar', roleName: 'Proveedor', password: PASSWORD_TEST },
];

async function main() {
  for (const name of ROLES) {
    await prisma.role.upsert({
      where: { name },
      create: { name, description: `Rol ${name}` },
      update: {},
    });
  }
  const superAdmin = await prisma.role.findUnique({ where: { name: 'SuperAdmin' } });
  for (const resource of RESOURCES) {
    for (const action of ACTIONS) {
      let perm = await prisma.permission.findFirst({ where: { resource, action } });
      if (!perm) perm = await prisma.permission.create({ data: { resource, action, description: action + ' ' + resource } });
      if (superAdmin) {
        await prisma.rolePermission.upsert({
          where: { roleId_permissionId: { roleId: superAdmin.id, permissionId: perm.id } },
          create: { roleId: superAdmin.id, permissionId: perm.id },
          update: {},
        }).catch(() => {});
      }
    }
  }

  const roles = await prisma.role.findMany();
  const roleById = Object.fromEntries(roles.map((r) => [r.name, r]));

  let employeeForPortal = await prisma.employee.findFirst({ where: { email: 'empleado@braytonsrl.com.ar' } });
  if (!employeeForPortal) {
    employeeForPortal = await prisma.employee.create({
      data: {
        employeeCode: 'EMP-0001',
        firstName: 'Juan',
        lastName: 'Pérez',
        dni: '20123456',
        email: 'empleado@braytonsrl.com.ar',
        phone: '+54 11 1234-5678',
        address: 'Av. Ejemplo 100',
        hireDate: new Date('2022-01-15'),
        position: 'Técnico de obra',
        area: 'Construcción',
        salary: 450000,
        active: true,
      },
    });
    console.log('Empleado de prueba creado: Juan Pérez (EMP-0001)');
  }

  let clientForPortal = await prisma.client.findFirst({ where: { email: 'cliente@braytonsrl.com.ar' } });
  if (!clientForPortal) {
    clientForPortal = await prisma.client.create({
      data: {
        company: 'Constructora Demo S.A.',
        contact: 'María García',
        email: 'cliente@braytonsrl.com.ar',
        phone: '+54 11 8765-4321',
        address: 'Calle Falsa 123',
      },
    });
    console.log('Cliente de prueba creado: Constructora Demo S.A.');
  }

  let providerForPortal = await prisma.provider.findFirst({ where: { email: 'proveedor@braytonsrl.com.ar' } });
  if (!providerForPortal) {
    providerForPortal = await prisma.provider.create({
      data: {
        company: 'Proveedores Industriales S.R.L.',
        contact: 'Carlos López',
        email: 'proveedor@braytonsrl.com.ar',
        phone: '+54 11 5555-6666',
        services: 'Materiales y equipos',
      },
    });
    console.log('Proveedor de prueba creado: Proveedores Industriales S.R.L.');
  }

  for (const u of usersToCreate) {
    const existing = await prisma.user.findUnique({ where: { email: u.email } });
    if (existing) continue;
    const role = roleById[u.roleName];
    if (!role) continue;
    const passwordHash = await bcrypt.hash(u.password, 12);
    const data = {
      email: u.email,
      passwordHash,
      roleId: role.id,
    };
    if (u.roleName === 'Empleado' && employeeForPortal) data.employeeId = employeeForPortal.id;
    if (u.roleName === 'Cliente' && clientForPortal) data.clientId = clientForPortal.id;
    if (u.roleName === 'Proveedor' && providerForPortal) data.providerId = providerForPortal.id;
    await prisma.user.create({ data });
    console.log('Usuario creado: %s (rol: %s) - contraseña: %s', u.email, u.roleName, u.password);
  }

  console.log('\n--- Usuarios para probar el dashboard ---');
  console.log('Todos usan contraseña: Test123! (SuperAdmin: Admin123!)');
  console.log('SuperAdmin:       admin@braytonsrl.com.ar');
  console.log('Administrador:    administrador@braytonsrl.com.ar');
  console.log('RRHH:             rrhh@braytonsrl.com.ar');
  console.log('Contabilidad:     contabilidad@braytonsrl.com.ar');
  console.log('Supervisor obra:  supervisor@braytonsrl.com.ar');
  console.log('Empleado:         empleado@braytonsrl.com.ar');
  console.log('Cliente:          cliente@braytonsrl.com.ar');
  console.log('Proveedor:        proveedor@braytonsrl.com.ar');
  console.log('----------------------------------------\n');
  console.log('Seed completado.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
