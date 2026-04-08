-- Create admin users table with hashed passwords
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) NOT NULL DEFAULT 'Administrador',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON public.admin_users(username);

-- Insert default admin user (password will be set via API)
-- Default credentials: admin / Brayton@2024
INSERT INTO public.admin_users (
  email,
  username,
  password_hash,
  full_name,
  role,
  is_active
) VALUES (
  'admin@braytonsrl.com.ar',
  'admin',
  '$2b$10$YourHashedPasswordHere', -- Replace with actual bcrypt hash
  'Administrador BRAYTON SRL',
  'SuperAdmin',
  true
) ON CONFLICT (email) DO NOTHING;
