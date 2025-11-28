-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Crear tabla de propiedades
CREATE TABLE IF NOT EXISTS properties (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  price VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'paused', 'rented')),
  leads INTEGER DEFAULT 0,
  visits INTEGER DEFAULT 0,
  executions INTEGER DEFAULT 0,
  validation_rate DECIMAL(5,2) DEFAULT 0,
  image_url TEXT,
  description TEXT,
  rooms INTEGER,
  bathrooms INTEGER,
  size_m2 INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de leads
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
  property_name VARCHAR(255),
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'pending_docs', 'validated', 'visit_scheduled', 'visit_completed', 'rejected')),
  source VARCHAR(100),
  score INTEGER DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  monthly_income VARCHAR(50),
  profession VARCHAR(255),
  age INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de visitas
CREATE TABLE IF NOT EXISTS visits (
  id SERIAL PRIMARY KEY,
  lead_id INTEGER REFERENCES leads(id) ON DELETE CASCADE,
  property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  status VARCHAR(50) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled', 'no_show')),
  duration_minutes INTEGER DEFAULT 30,
  reminders_sent INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de conversaciones
CREATE TABLE IF NOT EXISTS conversations (
  id SERIAL PRIMARY KEY,
  lead_id INTEGER REFERENCES leads(id) ON DELETE CASCADE,
  type VARCHAR(20) DEFAULT 'email' CHECK (type IN ('email', 'whatsapp', 'phone', 'system')),
  from_type VARCHAR(20) DEFAULT 'system' CHECK (from_type IN ('system', 'lead', 'agent')),
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_leads_property_id ON leads(property_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_visits_lead_id ON visits(lead_id);
CREATE INDEX IF NOT EXISTS idx_visits_property_id ON visits(property_id);
CREATE INDEX IF NOT EXISTS idx_visits_scheduled_date ON visits(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_conversations_lead_id ON conversations(lead_id);

-- Configurar políticas RLS (Row Level Security)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- Políticas para permitir lectura pública (para desarrollo)
CREATE POLICY IF NOT EXISTS "Allow public read access on properties" ON properties FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Allow public read access on leads" ON leads FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Allow public read access on visits" ON visits FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Allow public read access on conversations" ON conversations FOR SELECT USING (true);

-- Insertar datos de ejemplo
INSERT INTO properties (title, address, price, status, leads, visits, executions, validation_rate, image_url, description, rooms, bathrooms, size_m2) VALUES
('Piso 3 hab. Salamanca', 'Calle Serrano 45, Madrid', '2.800€/mes', 'active', 12, 8, 45, 85.0, '/placeholder.svg?height=200&width=300', 'Precioso piso en el barrio de Salamanca, completamente reformado', 3, 2, 120),
('Apartamento Centro', 'Gran Vía 23, Madrid', '1.950€/mes', 'active', 8, 5, 32, 62.0, '/placeholder.svg?height=200&width=300', 'Apartamento moderno en pleno centro de Madrid', 2, 1, 80),
('Estudio Malasaña', 'Calle Fuencarral 89, Madrid', '1.200€/mes', 'paused', 15, 12, 67, 78.0, '/placeholder.svg?height=200&width=300', 'Estudio acogedor en el vibrante barrio de Malasaña', 1, 1, 45)
ON CONFLICT DO NOTHING;

INSERT INTO leads (name, email, phone, property_id, property_name, status, source, score, monthly_income, profession, age) VALUES
('María García', 'maria.garcia@email.com', '+34 666 123 456', 1, 'Piso 3 hab. Salamanca', 'validated', 'Idealista', 92, '4.200€', 'Ingeniera de Software', 28),
('Carlos Ruiz', 'carlos.ruiz@email.com', '+34 677 234 567', 2, 'Apartamento Centro', 'pending_docs', 'Fotocasa', 78, '3.500€', 'Consultor', 32),
('Ana López', 'ana.lopez@email.com', '+34 688 345 678', 3, 'Estudio Malasaña', 'visit_scheduled', 'Web propia', 85, '2.800€', 'Diseñadora Gráfica', 26)
ON CONFLICT DO NOTHING;

INSERT INTO visits (lead_id, property_id, scheduled_date, scheduled_time, status, reminders_sent) VALUES
(1, 1, '2024-01-17', '17:00', 'confirmed', 2),
(2, 2, '2024-01-17', '18:00', 'scheduled', 1),
(3, 3, '2024-01-18', '19:00', 'confirmed', 1)
ON CONFLICT DO NOTHING;

INSERT INTO conversations (lead_id, type, from_type, message) VALUES
(1, 'email', 'system', 'Hola María, hemos recibido tu interés en el Piso 3 hab. Salamanca. Para continuar, necesitamos algunos documentos.'),
(1, 'email', 'lead', 'Hola, perfecto. Adjunto mi DNI y las dos últimas nóminas. ¿Cuándo podríamos hacer la visita?'),
(1, 'whatsapp', 'system', 'Documentos verificados ✅ Te proponemos estas fechas para la visita: Miércoles 17/01 a las 17:00 o Jueves 18/01 a las 19:00'),
(2, 'email', 'system', 'Hola Carlos, te proponemos visitar el apartamento el 17/01 a las 18:00. ¿Te va bien?'),
(2, 'whatsapp', 'system', 'Hola Carlos, ¿has visto nuestro email sobre la visita? Necesitamos confirmación.'),
(3, 'whatsapp', 'lead', 'Hola, me interesa mucho el estudio. ¿Cuándo podríamos hacer la visita?'),
(3, 'whatsapp', 'system', '¡Perfecto! Te propongo mañana 18/01 a las 19:00. ¿Te va bien?')
ON CONFLICT DO NOTHING;

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updated_at
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_visits_updated_at BEFORE UPDATE ON visits FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
