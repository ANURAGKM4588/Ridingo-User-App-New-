-- ==============================================================================
-- RIDINGO USER APP — SUPABASE DATABASE SCHEMA
-- Run this script in your Supabase Dashboard -> SQL Editor -> Click 'Run'
-- ==============================================================================

-- 1. PROFILES TABLE (Stores user rider profile info)
CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL DEFAULT 'Alexander Vance',
    phone TEXT DEFAULT '+91 98450 12345',
    email TEXT DEFAULT 'alexander.vance@techcorp.in',
    membership_tier TEXT DEFAULT 'Ridingo Club',
    wallet_balance NUMERIC(10,2) DEFAULT 4250.00,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default rider profile if not exists
INSERT INTO public.profiles (id, full_name, phone, email, membership_tier, wallet_balance)
VALUES ('current_user', 'Alexander Vance', '+91 98450 12345', 'alexander.vance@techcorp.in', 'Ridingo Club', 4250.00)
ON CONFLICT (id) DO NOTHING;

-- 2. SAVED PLACES TABLE (Home, Office, Airport, Frequent spots)
CREATE TABLE IF NOT EXISTS public.saved_places (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT DEFAULT 'current_user',
    title TEXT NOT NULL,
    address TEXT NOT NULL,
    icon TEXT DEFAULT 'navigation',
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed initial default spots
INSERT INTO public.saved_places (user_id, title, address, icon, is_default)
VALUES 
  ('current_user', 'Home', '14th Main Rd, Koramangala 4th Block, Bengaluru', 'home', TRUE),
  ('current_user', 'Office', 'UB City Tower, 24 Vittal Mallya Rd, Bengaluru', 'briefcase', FALSE),
  ('current_user', 'Airport VIP Gate', 'Kempegowda International Airport T1 & T2 Curb', 'navigation', FALSE)
ON CONFLICT DO NOTHING;

-- 3. RIDES & BOOKINGS TABLE (Chauffeur dispatch telemetry & requests)
CREATE TABLE IF NOT EXISTS public.rides (
    id TEXT PRIMARY KEY,
    user_id TEXT DEFAULT 'current_user',
    pickup_address TEXT NOT NULL,
    dropoff_address TEXT NOT NULL,
    car_type TEXT DEFAULT 'sedan',
    duration_hours INTEGER DEFAULT 4,
    total_fare NUMERIC(10,2) DEFAULT 1499.00,
    status TEXT DEFAULT 'searching', -- searching, assigned, arrived, in_progress, completed, cancelled
    driver_name TEXT DEFAULT NULL,
    driver_phone TEXT DEFAULT NULL,
    driver_rating NUMERIC(2,1) DEFAULT 4.9,
    pin TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ DEFAULT NULL
);

-- 4. CHAT MESSAGES TABLE (Concierge / 24/7 Operations Desk)
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id TEXT PRIMARY KEY,
    user_id TEXT DEFAULT 'current_user',
    text TEXT NOT NULL,
    is_outgoing BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed initial welcome greeting from Operations Desk
INSERT INTO public.chat_messages (id, user_id, text, is_outgoing, created_at)
VALUES 
  ('msg_init_1', 'current_user', 'Welcome to Ridingo Executive Concierge Desk. How can our operations team assist your trip today?', FALSE, NOW() - INTERVAL '1 hour')
ON CONFLICT DO NOTHING;

-- 5. ENABLE ROW LEVEL SECURITY (RLS) FOR SAFE PUBLISHABLE KEY ACCESS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_places ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Allow public read & write policies for the client publishable key
CREATE POLICY "Allow publishable key access to profiles" ON public.profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow publishable key access to saved_places" ON public.saved_places FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow publishable key access to rides" ON public.rides FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow publishable key access to chat_messages" ON public.chat_messages FOR ALL USING (true) WITH CHECK (true);
