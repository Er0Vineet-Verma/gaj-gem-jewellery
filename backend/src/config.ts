import 'dotenv/config';

export const config = {
  port: Number(process.env.PORT || 4000),
  nodeEnv: process.env.NODE_ENV || 'development',
  business: {
    whatsapp: process.env.WHATSAPP_NUMBER || '919816024887',
    email: process.env.BUSINESS_EMAIL || 'hello@gemandjewellery.in',
    phone: process.env.BUSINESS_PHONE || '+91 9816024887',
  },
  rates: {
    apiKey: process.env.METALS_API_KEY || '',
    apiUrl: process.env.METALS_API_URL || '',
  },
  corsOrigins: (process.env.CORS_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean),
};
