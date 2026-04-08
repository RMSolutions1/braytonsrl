-- Migration: Create tables for contact forms, job applications, and admin management
-- Date: 2026-04-04

-- Contact messages table (for general inquiries and quotes)
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  project_type VARCHAR(100),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, read, responded, archived
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  responded_at TIMESTAMP WITH TIME ZONE
);

-- Job applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  position_area VARCHAR(100) NOT NULL,
  experience_years INTEGER,
  education VARCHAR(255),
  linkedin_url VARCHAR(500),
  cv_file_url VARCHAR(500), -- URL to uploaded CV file
  cv_file_name VARCHAR(255),
  cover_letter TEXT,
  status VARCHAR(50) DEFAULT 'new', -- new, reviewing, interview, hired, rejected
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE
);

-- Quote requests table (for specific quotations)
CREATE TABLE IF NOT EXISTS quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  service_type VARCHAR(100) NOT NULL,
  project_description TEXT NOT NULL,
  estimated_budget VARCHAR(100),
  timeline VARCHAR(100),
  location VARCHAR(255),
  attachments_urls TEXT[], -- Array of attachment URLs
  status VARCHAR(50) DEFAULT 'pending', -- pending, reviewing, quoted, approved, rejected
  quote_amount DECIMAL(15, 2),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  quoted_at TIMESTAMP WITH TIME ZONE
);

-- Admin activity log
CREATE TABLE IF NOT EXISTS admin_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL, -- contact_message, job_application, quote_request
  entity_id UUID NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_created_at ON job_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at ON quote_requests(created_at DESC);

-- Add comments for documentation
COMMENT ON TABLE contact_messages IS 'Stores contact form submissions and general inquiries';
COMMENT ON TABLE job_applications IS 'Stores job applications with CV uploads';
COMMENT ON TABLE quote_requests IS 'Stores detailed quote/quotation requests';
COMMENT ON TABLE admin_activity_log IS 'Tracks admin actions for audit purposes';
