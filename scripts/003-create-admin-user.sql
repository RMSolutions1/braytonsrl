-- Create admin user for BRAYTON SRL
-- Credentials: admin@braytonsrl.com.ar / Admin123456!

INSERT INTO neon_auth."user" (
  id,
  email,
  name,
  role,
  "emailVerified",
  "createdAt",
  "updatedAt"
) VALUES (
  gen_random_uuid(),
  'admin@braytonsrl.com.ar',
  'Administrador BRAYTON',
  'SuperAdmin',
  true,
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;

-- Note: For production, use bcrypt to hash the password and store in neon_auth.account table
-- The password hash should be stored securely
