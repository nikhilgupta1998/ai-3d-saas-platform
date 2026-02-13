# Architecture Overview

## System Architecture

The AI 3D SaaS Platform is built as a microservices architecture using a monorepo structure.

```
┌─────────────────────────────────────────────────────────────┐
│                     Client (Browser)                         │
│                    Next.js 14 + React                        │
└──────────────────┬──────────────────────────────────────────┘
                   │ HTTP/WebSocket
┌──────────────────▼──────────────────────────────────────────┐
│                   API Gateway (NestJS)                       │
│  ┌──────────────┬──────────────┬──────────────────────┐    │
│  │ Auth Module  │ Jobs Module  │ Projects Module       │    │
│  │ JWT/Passport │ BullMQ Queue │ Assets Module         │    │
│  └──────────────┴──────────────┴──────────────────────┘    │
└───┬────────────────┬────────────────┬─────────────────┬────┘
    │                │                │                 │
    │ PostgreSQL     │ Redis          │ S3/MinIO       │ Python Workers
    │                │                │                 │
┌───▼──────┐  ┌─────▼─────┐   ┌─────▼──────┐   ┌──────▼──────────┐
│ Prisma   │  │  BullMQ   │   │   File     │   │   AI Worker     │
│   ORM    │  │  Queues   │   │  Storage   │   │   (FastAPI)     │
└──────────┘  └───────────┘   └────────────┘   │                 │
                                                 │ - Avatar Gen    │
                                                 │ - Image to 3D   │
                                                 │ - Motion Capture│
                                                 │ - Animations    │
                                                 └─────────────────┘
                                                 ┌─────────────────┐
                                                 │ Blender Worker  │
                                                 │   (FastAPI)     │
                                                 │                 │
                                                 │ - Export        │
                                                 │ - Optimization  │
                                                 │ - Conversion    │
                                                 └─────────────────┘
```

## Technology Stack

### Frontend Layer
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **UI Library**: React 18
- **3D Engine**: Three.js via React Three Fiber
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Build Tool**: Turbo

### Backend Layer
- **Framework**: NestJS
- **Language**: TypeScript
- **Database ORM**: Prisma
- **Authentication**: Passport.js + JWT
- **Queue**: BullMQ
- **Validation**: class-validator
- **API Style**: REST

### Data Layer
- **Database**: PostgreSQL 16
- **Cache**: Redis 7
- **Storage**: S3-compatible (MinIO for dev)
- **Queue**: Redis-backed BullMQ

### AI/Processing Layer
- **Framework**: FastAPI
- **Language**: Python 3.11
- **Motion Capture**: MediaPipe
- **Image Processing**: OpenCV, Pillow
- **3D Processing**: Blender (headless)
- **Future AI**: Stable Diffusion, TripoSR

## Data Flow

### 1. User Authentication Flow
```
User → Login Form → API /auth/login → JWT Token → Store in LocalStorage
                                     ↓
                                 Validate Password (bcrypt)
                                     ↓
                                 Create Access + Refresh Tokens
```

### 2. Job Creation Flow
```
User → Create Job → API /jobs → Check Credits → Deduct Credits
                                      ↓
                                Create Job Record
                                      ↓
                                Add to BullMQ Queue
                                      ↓
                              Worker Picks Up Job
                                      ↓
                              Process (AI/Blender)
                                      ↓
                              Update Job Status
                                      ↓
                              Upload Result to S3
                                      ↓
                              Complete Job
```

### 3. 3D Viewer Flow
```
User → Open Project → Fetch Assets → Load GLB/FBX
                                      ↓
                             React Three Fiber Canvas
                                      ↓
                             Render 3D Model
                                      ↓
                             OrbitControls + Lighting
```

## Module Architecture

### Backend Modules

#### Auth Module
- JWT strategy
- Local strategy (email/password)
- Token refresh mechanism
- Password hashing

#### Users Module
- User CRUD operations
- Credit management
- Subscription relationship

#### Projects Module
- Project CRUD
- Asset association
- Job tracking

#### Jobs Module
- Job creation and tracking
- BullMQ integration
- Progress updates
- Credit deduction

#### Assets Module
- File upload handling
- S3 integration
- Signed URL generation
- Asset metadata

#### Subscriptions Module
- Tier management
- Stripe integration (mocked)
- Credit allocation

### Frontend Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth routes
│   ├── dashboard/         # Dashboard
│   ├── projects/          # Project pages
│   └── layout.tsx         # Root layout
├── components/
│   ├── 3d/                # 3D components
│   ├── ui/                # Reusable UI
│   ├── layout/            # Layout components
│   └── features/          # Feature components
├── lib/
│   ├── api/               # API client
│   ├── store/             # State management
│   └── utils/             # Utilities
└── hooks/                 # Custom hooks
```

## Database Schema

### Core Entities

**User**
- Authentication credentials
- Role (USER/ADMIN)
- Credits balance
- Subscription relationship

**Subscription**
- Tier (FREE/STARTER/PRO/ENTERPRISE)
- Credits per month
- Stripe integration fields
- Status tracking

**Project**
- User ownership
- Metadata (name, description, thumbnail)
- Asset collection
- Job history

**Asset**
- Type (IMAGE/VIDEO/MODEL_3D/ANIMATION)
- Storage URL
- Format (GLB/FBX/BLEND)
- Metadata

**Job**
- Type (TEXT_TO_AVATAR, IMAGE_TO_3D, etc.)
- Status (PENDING/PROCESSING/COMPLETED/FAILED)
- Progress tracking
- Input/Output data
- Credits used

## Security Architecture

### Authentication
- JWT access tokens (15 min expiry)
- Refresh tokens (7 day expiry)
- Token rotation on refresh
- HttpOnly cookies (optional)

### Authorization
- Role-based access control (RBAC)
- Guards on protected routes
- Resource ownership validation

### Data Protection
- Password hashing (bcrypt)
- Input validation (class-validator)
- SQL injection prevention (Prisma ORM)
- XSS prevention (React)
- CORS configuration

### File Security
- Signed URLs for assets
- File type validation
- Size limits
- Virus scanning (future)

## Scalability Considerations

### Horizontal Scaling
- Stateless API servers
- Redis for shared state
- BullMQ for distributed jobs
- S3 for distributed storage

### Vertical Scaling
- Connection pooling (Prisma)
- Query optimization
- Caching strategies
- Asset CDN

### Performance
- Code splitting (Next.js)
- Dynamic imports for 3D viewer
- Lazy loading
- Image optimization
- Asset compression

## Deployment Architecture

### Development
```
Docker Compose
├── PostgreSQL (5432)
├── Redis (6379)
├── MinIO (9000, 9001)
├── API (3001)
├── Web (3000)
├── AI Worker (8000)
└── Blender Worker (8001)
```

### Production (Recommended)
```
Kubernetes/Cloud Platform
├── Load Balancer
├── Web Pods (Next.js)
├── API Pods (NestJS)
├── Worker Pods (Python)
├── Managed PostgreSQL
├── Managed Redis
├── S3/Cloud Storage
└── CDN for Assets
```

## Monitoring & Observability

### Logging
- Structured logging (Winston/Pino)
- Log aggregation (future)
- Error tracking (future)

### Metrics
- API response times
- Job completion rates
- Credit usage
- Active users

### Health Checks
- `/health` endpoints
- Database connectivity
- Redis connectivity
- Worker availability

## Future Enhancements

### AI Integration
- Stable Diffusion integration
- TripoSR for image-to-3D
- MediaPipe full integration
- Motion generation models

### Features
- WebSocket real-time updates
- Collaborative editing
- Animation timeline editor
- Material editor
- Texture painting

### Infrastructure
- Multi-region deployment
- Auto-scaling
- CDN integration
- Backup automation

### Security
- Rate limiting
- DDoS protection
- API key management
- OAuth providers
