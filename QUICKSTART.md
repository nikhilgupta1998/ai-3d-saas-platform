# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites Check
```bash
node --version  # Should be >= 18.0.0
npm --version   # Should be >= 9.0.0
python --version # Should be >= 3.9
docker --version # Optional but recommended
```

### Option 1: Docker Compose (Recommended)

```bash
# 1. Clone and navigate
git clone https://github.com/nikhilgupta1998/ai-3d-saas-platform.git
cd ai-3d-saas-platform

# 2. Start everything
docker-compose up -d

# 3. Setup database
docker-compose exec api npx prisma migrate dev

# 4. Open browser
# Web:  http://localhost:3000
# API:  http://localhost:3001/api
```

### Option 2: Manual Setup

```bash
# 1. Clone repository
git clone https://github.com/nikhilgupta1998/ai-3d-saas-platform.git
cd ai-3d-saas-platform

# 2. Install dependencies
npm install
cd apps/api && npm install && cd ../..
cd apps/web && npm install && cd ../..

# 3. Setup environment files
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
cp services/ai-worker/.env.example services/ai-worker/.env
cp services/blender-worker/.env.example services/blender-worker/.env

# 4. Start PostgreSQL and Redis
# Use Docker or install locally

# 5. Setup database
cd apps/api
npx prisma generate
npx prisma migrate dev

# 6. Start services (in separate terminals)
# Terminal 1: API
cd apps/api && npm run start:dev

# Terminal 2: Web
cd apps/web && npm run dev

# Terminal 3: AI Worker
cd services/ai-worker
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000

# Terminal 4: Blender Worker
cd services/blender-worker
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8001
```

## 📍 Service URLs

| Service | URL | Description |
|---------|-----|-------------|
| Web App | http://localhost:3000 | Next.js frontend |
| API | http://localhost:3001/api | NestJS backend |
| AI Worker | http://localhost:8000 | Python AI service |
| Blender Worker | http://localhost:8001 | Python Blender service |
| MinIO Console | http://localhost:9001 | S3 storage UI |
| PostgreSQL | localhost:5432 | Database |
| Redis | localhost:6379 | Cache/Queue |

## 🎮 First Steps

### 1. Create an Account
- Go to http://localhost:3000/auth/register
- Enter your details
- You'll get 100 free credits

### 2. Explore the Dashboard
- View your projects
- Check your credits
- Explore quick actions

### 3. Create a Project
- Click "New Project"
- Give it a name
- Open the 3D editor

### 4. Try the 3D Viewer
- Use mouse to rotate camera
- Scroll to zoom
- Right-click to pan

## 🧪 Test the API

### Register a User
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

### Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Projects (requires token)
```bash
curl -X GET http://localhost:3001/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🛠️ Common Commands

### Development
```bash
# Start all services
npm run dev

# Start specific service
npm run web:dev
npm run api:dev

# Build all
npm run build

# Lint all
npm run lint
```

### Database
```bash
cd apps/api

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Open Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset
```

### Docker
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild services
docker-compose build

# Restart a service
docker-compose restart api
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :3000  # or 3001, 8000, etc.

# Kill process
kill -9 <PID>
```

### Database Connection Error
```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# Restart PostgreSQL
docker-compose restart postgres

# Check connection
psql -h localhost -U postgres -d ai3d
```

### Redis Connection Error
```bash
# Check if Redis is running
docker-compose ps redis

# Test Redis
redis-cli ping  # Should return PONG
```

### Python Dependencies Error
```bash
# Upgrade pip
pip install --upgrade pip

# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

## 📖 Next Steps

1. Read [README.md](./README.md) for project overview
2. Check [SETUP.md](./SETUP.md) for detailed setup
3. Explore [API.md](./API.md) for API documentation
4. Review [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
5. See [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) for complete overview

## 💡 Tips

- Use `Ctrl+C` to stop running services
- Check Docker logs for detailed error messages
- Keep `.env` files secure and never commit them
- Use `npx prisma studio` to view database visually
- Check service health endpoints: `/health` or `/`

## 🆘 Getting Help

- Check the [SETUP.md](./SETUP.md) troubleshooting section
- Review logs in `docker-compose logs -f`
- Open an issue on GitHub
- Read the [CONTRIBUTING.md](./CONTRIBUTING.md) guide

## ✅ Verification Checklist

- [ ] All services running (3000, 3001, 8000, 8001)
- [ ] Can register a new user
- [ ] Can login successfully
- [ ] Dashboard loads
- [ ] Can create a project
- [ ] 3D viewer renders
- [ ] Can access MinIO console (9001)

---

**You're all set! Start building amazing 3D content with AI! 🎉**
