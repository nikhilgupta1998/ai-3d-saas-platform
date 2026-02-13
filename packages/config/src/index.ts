// Environment Configuration
export const config = {
  env: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',

  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    timeout: 30000,
  },

  // Database
  database: {
    url: process.env.DATABASE_URL || 'postgresql://localhost:5432/ai3d',
  },

  // Redis
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD,
  },

  // JWT
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'your-access-secret-key',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
    accessExpiration: '15m',
    refreshExpiration: '7d',
  },

  // S3/Storage
  storage: {
    bucket: process.env.S3_BUCKET || 'ai-3d-saas',
    region: process.env.S3_REGION || 'us-east-1',
    endpoint: process.env.S3_ENDPOINT,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    publicUrl: process.env.S3_PUBLIC_URL || 'http://localhost:9000',
  },

  // Stripe
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  },

  // AI Services
  ai: {
    workerUrl: process.env.AI_WORKER_URL || 'http://localhost:8000',
    blenderWorkerUrl: process.env.BLENDER_WORKER_URL || 'http://localhost:8001',
  },

  // Credits & Limits
  credits: {
    free: {
      monthly: 100,
      textToAvatar: 10,
      imageTo3D: 20,
      videoToAnimation: 30,
      promptToAnimation: 15,
      export: 5,
    },
    starter: {
      monthly: 500,
      textToAvatar: 10,
      imageTo3D: 20,
      videoToAnimation: 30,
      promptToAnimation: 15,
      export: 5,
    },
    pro: {
      monthly: 2000,
      textToAvatar: 10,
      imageTo3D: 20,
      videoToAnimation: 30,
      promptToAnimation: 15,
      export: 5,
    },
    enterprise: {
      monthly: 10000,
      textToAvatar: 10,
      imageTo3D: 20,
      videoToAnimation: 30,
      promptToAnimation: 15,
      export: 5,
    },
  },

  // Upload Limits
  upload: {
    maxImageSize: 10 * 1024 * 1024, // 10MB
    maxVideoSize: 100 * 1024 * 1024, // 100MB
    maxModelSize: 50 * 1024 * 1024, // 50MB
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
    allowedVideoTypes: ['video/mp4', 'video/webm', 'video/quicktime'],
    allowedModelTypes: ['model/gltf-binary', 'application/octet-stream'],
  },

  // WebSocket
  websocket: {
    url: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001',
  },
};

export default config;
