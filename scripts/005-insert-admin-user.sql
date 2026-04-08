-- Insert default admin user
-- Username: admin
-- Password: Brayton2024! (hashed with bcrypt)
-- Hash: $2b$10$yLfM9p.7k3V8q2X1Z9a8l.O7K2j9m8N7Q6P5O4N3M2L1K0J9I8H7G6F5

INSERT INTO admin_users (username, password_hash, email, role, is_active) VALUES
  ('admin', '$2b$10$yLfM9p.7k3V8q2X1Z9a8l.O7K2j9m8N7Q6P5O4N3M2L1K0J9I8H7G6F5', 'admin@braytonsrl.com', 'SuperAdmin', true)
ON CONFLICT (username) DO NOTHING;
