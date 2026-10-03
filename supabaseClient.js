/**
 * Ridingo — Supabase Backend Client & Data Service
 * Connects Ridingo User App to Supabase Database, Auth & Realtime
 */

// Supabase Project Credentials
const SUPABASE_URL = window.ENV_SUPABASE_URL || 'https://xxmcjgonsxpjrgdxchwl.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_xsxb_nMEozSSKCReR_DzkA_aXJIp--c';

// Initialize Supabase Client if library is loaded and URL is configured
let supabase = null;

if (window.supabase && typeof window.supabase.createClient === 'function') {
  if (SUPABASE_URL && !SUPABASE_URL.includes('YOUR_PROJECT_REF')) {
    try {
      supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
      console.log('✅ Ridingo: Connected to Supabase Backend successfully');
    } catch (err) {
      console.warn('⚠️ Ridingo: Supabase init error, using local fallback:', err);
    }
  } else {
    console.info('ℹ️ Ridingo: Supabase Client ready. Please set your Supabase Project URL to enable cloud sync.');
  }
}

/**
 * Backend Data Service with Cloud Sync & Offline Fallback
 */
window.RidingoDB = {
  client: supabase,
  url: SUPABASE_URL,
  key: SUPABASE_PUBLISHABLE_KEY,

  // Check if live backend connection is configured
  isLive() {
    return !!supabase && !SUPABASE_URL.includes('YOUR_PROJECT_REF');
  },

  // 1. USER PROFILE MANAGEMENT
  async getProfile(userId = 'current_user') {
    if (!this.isLive()) {
      return {
        full_name: localStorage.getItem('ridingo_user_name') || 'Alexander Vance',
        phone: localStorage.getItem('ridingo_user_phone') || '+91 98450 12345',
        email: localStorage.getItem('ridingo_user_email') || 'alexander.vance@techcorp.in',
        membership: 'Ridingo Club',
        wallet_balance: parseFloat(localStorage.getItem('ridingo_wallet_bal') || '4250.00')
      };
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (e) {
      console.warn('Backend fetch failed, falling back to local cache:', e.message);
      return {
        full_name: localStorage.getItem('ridingo_user_name') || 'Alexander Vance',
        phone: localStorage.getItem('ridingo_user_phone') || '+91 98450 12345'
      };
    }
  },

  async updateProfile(profileData, userId = 'current_user') {
    // Always sync locally first for instantaneous UI response
    if (profileData.full_name) localStorage.setItem('ridingo_user_name', profileData.full_name);
    if (profileData.phone) localStorage.setItem('ridingo_user_phone', profileData.phone);
    if (profileData.email) localStorage.setItem('ridingo_user_email', profileData.email);

    if (!this.isLive()) {
      return { success: true, mode: 'local' };
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          full_name: profileData.full_name,
          phone: profileData.phone,
          email: profileData.email,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      return { success: true, data, mode: 'supabase' };
    } catch (e) {
      console.error('Supabase updateProfile error:', e);
      return { success: false, error: e.message, mode: 'local_fallback' };
    }
  },

  // 2. CHAUFFEUR RIDES & BOOKINGS
  async createRide(rideData) {
    const ride = {
      id: 'ride_' + Date.now(),
      created_at: new Date().toISOString(),
      pickup_address: rideData.pickup || 'UB City, Bengaluru',
      dropoff_address: rideData.dropoff || 'Kempegowda International Airport',
      car_type: rideData.carType || 'sedan',
      duration_hours: rideData.duration || 4,
      total_fare: rideData.fare || 1499,
      status: 'searching',
      pin: rideData.pin || Math.floor(1000 + Math.random() * 9000).toString()
    };

    // Save locally
    const currentRides = JSON.parse(localStorage.getItem('ridingo_rides') || '[]');
    currentRides.unshift(ride);
    localStorage.setItem('ridingo_rides', JSON.stringify(currentRides));

    if (!this.isLive()) return { success: true, ride, mode: 'local' };

    try {
      const { data, error } = await supabase
        .from('rides')
        .insert([ride])
        .select()
        .single();

      if (error) throw error;
      return { success: true, ride: data, mode: 'supabase' };
    } catch (e) {
      console.warn('Supabase createRide error, saved locally:', e.message);
      return { success: true, ride, mode: 'local_fallback' };
    }
  },

  // 3. SAVED PICKUP SPOTS & LOCATIONS
  async getSavedPlaces() {
    const defaultSpots = [
      { id: '1', title: 'Home', address: '14th Main Rd, Koramangala 4th Block, Bengaluru', is_default: true, icon: 'home' },
      { id: '2', title: 'Office', address: 'UB City Tower, 24 Vittal Mallya Rd, Bengaluru', is_default: false, icon: 'briefcase' },
      { id: '3', title: 'Airport VIP Gate', address: 'Kempegowda International Airport T1 & T2 Curb', is_default: false, icon: 'navigation' }
    ];

    if (!this.isLive()) return defaultSpots;

    try {
      const { data, error } = await supabase.from('saved_places').select('*');
      if (error || !data || data.length === 0) return defaultSpots;
      return data;
    } catch (e) {
      return defaultSpots;
    }
  },

  // 4. CONCIERGE CHAT MESSAGES
  async sendSupportMessage(text, isOutgoing = true) {
    const msg = {
      id: 'msg_' + Date.now(),
      created_at: new Date().toISOString(),
      text,
      is_outgoing: isOutgoing
    };

    if (this.isLive()) {
      try {
        await supabase.from('chat_messages').insert([msg]);
      } catch (e) {
        console.warn('Chat message cloud save deferred:', e.message);
      }
    }
    return msg;
  }
};
