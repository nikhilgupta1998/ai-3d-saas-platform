# API Documentation

## Base URL

- Development: `http://localhost:3001/api`
- Production: `https://api.yourdomain.com/api`

## Authentication

Most endpoints require authentication using JWT tokens.

### Headers

```
Authorization: Bearer <access_token>
```

## Endpoints

### Authentication

#### POST /auth/register
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER",
    "credits": 100
  }
}
```

#### POST /auth/login
Login existing user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### POST /auth/refresh
Refresh access token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGc..."
}
```

### Users

#### GET /users/me
Get current user profile.

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "USER",
  "credits": 100,
  "subscription": {
    "tier": "FREE",
    "creditsPerMonth": 100
  }
}
```

### Projects

#### GET /projects
List user's projects.

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "My Project",
    "description": "Description",
    "thumbnail": "/thumbnails/project.png",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
]
```

#### POST /projects
Create new project.

**Request Body:**
```json
{
  "name": "New Project",
  "description": "Optional description"
}
```

#### GET /projects/:id
Get project details.

#### PUT /projects/:id
Update project.

**Request Body:**
```json
{
  "name": "Updated Name",
  "description": "Updated description",
  "thumbnail": "/path/to/thumbnail.png"
}
```

#### DELETE /projects/:id
Delete project.

### Jobs

#### GET /jobs
List user's jobs with pagination.

**Query Parameters:**
- `page` (optional): Page number, default 1
- `pageSize` (optional): Items per page, default 20

**Response:**
```json
{
  "items": [...],
  "total": 50,
  "page": 1,
  "pageSize": 20,
  "totalPages": 3
}
```

#### POST /jobs
Create new job.

**Request Body:**
```json
{
  "type": "TEXT_TO_AVATAR",
  "input": {
    "prompt": "A friendly robot avatar",
    "config": {
      "style": "realistic"
    }
  },
  "projectId": "uuid"
}
```

Job Types:
- `TEXT_TO_AVATAR`
- `IMAGE_TO_3D`
- `VIDEO_TO_ANIMATION`
- `PROMPT_TO_ANIMATION`
- `EXPORT_BLENDER`

#### GET /jobs/:id
Get job status and results.

**Response:**
```json
{
  "id": "uuid",
  "type": "TEXT_TO_AVATAR",
  "status": "COMPLETED",
  "progress": 100,
  "output": {
    "modelUrl": "/models/avatar.glb",
    "thumbnailUrl": "/thumbnails/avatar.png"
  },
  "creditsUsed": 10,
  "createdAt": "2024-01-01T00:00:00Z",
  "completedAt": "2024-01-01T00:05:00Z"
}
```

### Assets

#### POST /assets/upload
Upload file.

**Request:**
- Content-Type: multipart/form-data
- Fields:
  - `file`: File to upload
  - `projectId`: Project UUID
  - `type`: Asset type (IMAGE, VIDEO, MODEL_3D, etc.)

#### GET /assets/project/:projectId
Get project assets.

#### GET /assets/:id/signed-url
Get signed URL for asset download.

### Subscriptions

#### GET /subscriptions/current
Get current subscription.

#### POST /subscriptions/upgrade
Upgrade subscription tier.

**Request Body:**
```json
{
  "tier": "PRO"
}
```

## Error Responses

All errors follow this format:

```json
{
  "statusCode": 400,
  "message": "Error message",
  "error": "Bad Request"
}
```

Common Status Codes:
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error
