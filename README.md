# AI 3D SaaS Platform

A production-ready SaaS platform for AI-powered 3D model creation, editing, animation, and export compatible with Blender.

## 🚀 Features

### Core Features
- **AI Avatar Creation**: Generate beginner-friendly AI avatars from text prompts with automatic rigging
- **2D Image → 3D Model**: Upload images and generate optimized GLB/FBX models
- **Video Motion Capture**: Extract human pose keypoints and convert to animations
- **Prompt → Animation**: Generate animations from natural language descriptions
- **Blender Export**: Export models in .blend, .glb, .fbx formats with addon integration support

### SaaS Features
- **Authentication**: JWT-based secure authentication
- **Subscription System**: Tiered pricing (Free, Starter, Pro, Enterprise)
- **Credit System**: Pay-per-use credit-based generation
- **Usage Limits**: Role-based access control and usage tracking

## 🏗️ Architecture

This is a monorepo built with modern technologies following production best practices:

```
ai-3d-saas-platform/
├── apps/
│   ├── web/              # Next.js 14 frontend
│   └── api/              # NestJS backend
├── services/
│   ├── ai-worker/        # Python FastAPI AI service
│   └── blender-worker/   # Python Blender automation
├── packages/
│   ├── types/            # Shared TypeScript types
│   ├── config/           # Shared configuration
│   ├── utils/            # Shared utilities
│   └── ui/               # Shared UI components
└── docker-compose.yml    # Local development setup
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **3D Rendering**: React Three Fiber + Three.js
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **API Client**: Axios

### Backend
- **Framework**: NestJS
- **Database**: PostgreSQL with Prisma ORM
- **Cache/Queue**: Redis + BullMQ
- **Authentication**: JWT with Passport
- **File Upload**: Multer with S3 support
- **API Style**: REST

### AI Services
- **Framework**: FastAPI (Python)
- **Motion Capture**: MediaPipe
- **Image Processing**: OpenCV, Pillow
- **Future Integration**: Stable Diffusion, TripoSR

### Infrastructure
- **Storage**: S3-compatible (MinIO for local dev)
- **Containerization**: Docker & Docker Compose
- **Build Tool**: Turbo (monorepo)

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Python >= 3.9
- Docker & Docker Compose (for local development)
- PostgreSQL 16 (or use Docker)
- Redis 7 (or use Docker)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/nikhilgupta1998/ai-3d-saas-platform.git
cd ai-3d-saas-platform
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install API dependencies
cd apps/api && npm install && cd ../..

# Install Web dependencies
cd apps/web && npm install && cd ../..

# Install Python dependencies
cd services/ai-worker && pip install -r requirements.txt && cd ../..
cd services/blender-worker && pip install -r requirements.txt && cd ../..
```

### 3. Setup Environment Variables

```bash
# Copy example env files
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
cp services/ai-worker/.env.example services/ai-worker/.env
cp services/blender-worker/.env.example services/blender-worker/.env
```

Edit the `.env` files with your configuration.

### 4. Start with Docker Compose (Recommended)

```bash
docker-compose up -d
```

This will start:
- PostgreSQL (port 5432)
- Redis (port 6379)
- MinIO S3 (ports 9000, 9001)
- API (port 3001)
- Web (port 3000)
- AI Worker (port 8000)
- Blender Worker (port 8001)

### 5. Setup Database

```bash
cd apps/api
npx prisma migrate dev
npx prisma generate
```

### 6. Access the Platform

- **Web App**: http://localhost:3000
- **API**: http://localhost:3001/api
- **API Docs**: http://localhost:3001/api (Swagger coming soon)
- **MinIO Console**: http://localhost:9001 (admin/password)

## 💻 Development

### Running Services Individually

**Frontend:**
```bash
npm run web:dev
# or
cd apps/web && npm run dev
```

**Backend:**
```bash
npm run api:dev
# or
cd apps/api && npm run start:dev
```

**AI Worker:**
```bash
npm run ai-worker:dev
# or
cd services/ai-worker && python -m uvicorn app.main:app --reload
```

**Blender Worker:**
```bash
npm run blender-worker:dev
# or
cd services/blender-worker && python -m uvicorn app.main:app --reload
```

### Running All Services

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

## 📁 Project Structure

### Apps

#### `apps/web` - Next.js Frontend
- `/src/app` - Next.js 14 App Router pages
- `/src/components` - React components (UI, 3D, layout)
- `/src/lib` - API client, stores, utilities
- `/src/hooks` - Custom React hooks

#### `apps/api` - NestJS Backend
- `/src/modules` - Feature modules (auth, users, projects, jobs, assets)
- `/src/common` - Shared decorators, guards, interceptors
- `/src/prisma` - Prisma service and schema
- `/prisma` - Database migrations and schema

### Services

#### `services/ai-worker` - AI Processing Service
- `/app` - FastAPI application
- Motion capture, image-to-3D, avatar generation

#### `services/blender-worker` - Blender Automation
- `/app` - FastAPI application
- Model export, optimization, format conversion

### Packages

#### `packages/types` - Shared TypeScript Types
- User, Project, Asset, Job types
- API response types
- 3D model and animation types

#### `packages/config` - Shared Configuration
- Environment configuration
- Credit system configuration
- Upload limits

#### `packages/utils` - Shared Utilities
- String, number, date utilities
- Validation helpers
- Credit calculations

## 🎨 Key Features Implementation

### 3D Viewer
- Built with React Three Fiber
- OrbitControls for camera manipulation
- Multiple lighting presets
- Grid and environment support
- Dynamic model loading

### Authentication
- JWT-based authentication
- Refresh token rotation
- Protected routes
- Role-based access control

### Job Queue System
- BullMQ for job processing
- Real-time progress updates
- Retry logic for failed jobs
- Credit deduction on job creation

### Database Schema
- User and subscription management
- Project and asset organization
- Job tracking and history
- Relational data with Prisma

## 🔐 Security

- JWT tokens with rotation
- Password hashing with bcrypt
- Input validation with class-validator
- CORS configuration
- Rate limiting (to be implemented)
- Signed URLs for asset access (to be implemented)

## 📊 Database Schema

See `apps/api/prisma/schema.prisma` for the complete database schema including:
- User & Authentication
- Subscriptions & Billing
- Projects & Assets
- Jobs & Processing
- 3D Models & Animations
- Avatars

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run API tests
cd apps/api && npm run test

# Run Web tests
cd apps/web && npm run test
```

## 📦 Deployment

### Environment Variables
Ensure all production environment variables are set:
- Database connection strings
- Redis connection
- S3 credentials
- JWT secrets
- API URLs

### Build Production Images

```bash
docker-compose -f docker-compose.prod.yml build
```

### Deploy to Production
- Use orchestration tools like Kubernetes or Docker Swarm
- Configure CDN for static assets
- Setup monitoring and logging
- Configure auto-scaling for worker services

## 🤝 Contributing

Contributions are welcome! Please read the contributing guidelines before submitting PRs.

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Credits

Built with:
- [Next.js](https://nextjs.org/) - React framework
- [NestJS](https://nestjs.com/) - Node.js framework
- [Prisma](https://www.prisma.io/) - Database ORM
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) - React Three.js renderer
- [FastAPI](https://fastapi.tiangolo.com/) - Python API framework
- [MediaPipe](https://mediapipe.dev/) - ML solutions
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

## 📞 Support

For support, email support@ai3dplatform.com or open an issue on GitHub.

---

**Note**: This is a production-ready foundation. AI model integrations (Stable Diffusion, TripoSR, etc.) are implemented as placeholders and should be connected to actual models for full functionality.
