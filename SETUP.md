# Setup Guide

## Prerequisites

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0
- **Python**: >= 3.9
- **PostgreSQL**: >= 16
- **Redis**: >= 7
- **Docker**: (optional, for containerized development)

## Local Development Setup

### 1. Clone Repository

```bash
git clone https://github.com/nikhilgupta1998/ai-3d-saas-platform.git
cd ai-3d-saas-platform
```

### 2. Install Root Dependencies

```bash
npm install
```

This installs Turbo and other monorepo tools.

### 3. Setup Backend (NestJS API)

```bash
cd apps/api
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
# Make sure DATABASE_URL, REDIS_HOST, JWT secrets are set
```

#### Initialize Database

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed database
npx prisma db seed
```

### 4. Setup Frontend (Next.js)

```bash
cd apps/web
npm install

# Copy environment file
cp .env.example .env

# Edit .env
# Set NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 5. Setup AI Services (Python)

#### AI Worker

```bash
cd services/ai-worker

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env
```

#### Blender Worker

```bash
cd services/blender-worker

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env
```

### 6. Start Services

#### Using Docker Compose (Recommended)

```bash
# Start all infrastructure services
docker-compose up -d postgres redis minio

# Start application services individually or all together
docker-compose up -d
```

#### Manual Start

**Terminal 1 - API:**
```bash
cd apps/api
npm run start:dev
```

**Terminal 2 - Web:**
```bash
cd apps/web
npm run dev
```

**Terminal 3 - AI Worker:**
```bash
cd services/ai-worker
source venv/bin/activate
python -m uvicorn app.main:app --reload --port 8000
```

**Terminal 4 - Blender Worker:**
```bash
cd services/blender-worker
source venv/bin/activate
python -m uvicorn app.main:app --reload --port 8001
```

### 7. Verify Setup

- **Web App**: http://localhost:3000
- **API**: http://localhost:3001/api
- **AI Worker**: http://localhost:8000
- **Blender Worker**: http://localhost:8001
- **MinIO Console**: http://localhost:9001 (minioadmin/minioadmin)

## Environment Variables

### API (.env)

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/ai3d"
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_ACCESS_SECRET=your-super-secret-access-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
AI_WORKER_URL=http://localhost:8000
BLENDER_WORKER_URL=http://localhost:8001
PORT=3001
```

### Web (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_WS_URL=ws://localhost:3001
```

### AI Worker (.env)

```env
PORT=8000
API_URL=http://localhost:3001/api
STORAGE_PATH=/tmp/ai-worker-storage
```

### Blender Worker (.env)

```env
PORT=8001
API_URL=http://localhost:3001/api
STORAGE_PATH=/tmp/blender-worker-storage
```

## Database Migrations

```bash
cd apps/api

# Create a new migration
npx prisma migrate dev --name your_migration_name

# Apply migrations
npx prisma migrate deploy

# Reset database (⚠️ DANGER - deletes all data)
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio
```

## Troubleshooting

### Port Already in Use

If ports 3000, 3001, 5432, 6379, 8000, or 8001 are in use:
- Stop the conflicting service
- Or change the port in the respective .env file

### PostgreSQL Connection Issues

- Ensure PostgreSQL is running
- Check DATABASE_URL format: `postgresql://user:password@host:port/database`
- Verify credentials

### Redis Connection Issues

- Ensure Redis is running
- Check REDIS_HOST and REDIS_PORT
- Test connection: `redis-cli ping` (should return PONG)

### Python Dependencies Issues

- Use Python 3.9 or higher
- Try upgrading pip: `pip install --upgrade pip`
- On Windows, some packages may need Visual C++ Build Tools

### Docker Issues

- Ensure Docker daemon is running
- Check Docker Compose version: `docker-compose version`
- View logs: `docker-compose logs -f [service-name]`
- Restart services: `docker-compose restart`

## Next Steps

1. Create a test user by registering at http://localhost:3000/auth/register
2. Explore the dashboard
3. Create a project
4. Test the 3D viewer
5. Try AI features (note: currently placeholders)

## Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment guide.
