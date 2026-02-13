// User & Authentication Types
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  credits: number;
  subscriptionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// Subscription & Billing Types
export enum SubscriptionTier {
  FREE = 'FREE',
  STARTER = 'STARTER',
  PRO = 'PRO',
  ENTERPRISE = 'ENTERPRISE',
}

export interface Subscription {
  id: string;
  userId: string;
  tier: SubscriptionTier;
  status: 'active' | 'cancelled' | 'expired';
  creditsPerMonth: number;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  currentPeriodEnd: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Project & Asset Types
export enum AssetType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  MODEL_3D = 'MODEL_3D',
  ANIMATION = 'ANIMATION',
  AVATAR = 'AVATAR',
}

export enum ModelFormat {
  GLB = 'GLB',
  FBX = 'FBX',
  BLEND = 'BLEND',
  OBJ = 'OBJ',
  GLTF = 'GLTF',
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  description?: string;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Asset {
  id: string;
  projectId: string;
  userId: string;
  type: AssetType;
  name: string;
  url: string;
  signedUrl?: string;
  format?: ModelFormat;
  size: number;
  metadata?: Record<string, any>;
  createdAt: Date;
}

// Job & Processing Types
export enum JobType {
  TEXT_TO_AVATAR = 'TEXT_TO_AVATAR',
  IMAGE_TO_3D = 'IMAGE_TO_3D',
  VIDEO_TO_ANIMATION = 'VIDEO_TO_ANIMATION',
  PROMPT_TO_ANIMATION = 'PROMPT_TO_ANIMATION',
  EXPORT_BLENDER = 'EXPORT_BLENDER',
}

export enum JobStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export interface Job {
  id: string;
  userId: string;
  projectId?: string;
  type: JobType;
  status: JobStatus;
  progress: number;
  input: Record<string, any>;
  output?: Record<string, any>;
  error?: string;
  creditsUsed: number;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

// 3D Model & Animation Types
export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface Quaternion {
  x: number;
  y: number;
  z: number;
  w: number;
}

export interface Transform {
  position: Vector3;
  rotation: Quaternion;
  scale: Vector3;
}

export interface Bone {
  name: string;
  transform: Transform;
  parent?: string;
}

export interface Skeleton {
  bones: Bone[];
  rootBone: string;
}

export interface AnimationKeyframe {
  time: number;
  transform: Transform;
}

export interface AnimationTrack {
  boneName: string;
  keyframes: AnimationKeyframe[];
}

export interface Animation {
  id: string;
  name: string;
  duration: number;
  tracks: AnimationTrack[];
  fps: number;
}

export interface Model3D {
  id: string;
  assetId: string;
  vertices: number;
  faces: number;
  materials: number;
  hasSkeleton: boolean;
  skeleton?: Skeleton;
  animations?: Animation[];
  boundingBox: {
    min: Vector3;
    max: Vector3;
  };
}

// Avatar Types
export interface AvatarConfig {
  prompt: string;
  style?: 'realistic' | 'stylized' | 'anime' | 'cartoon';
  gender?: 'male' | 'female' | 'neutral';
  bodyType?: 'slim' | 'average' | 'athletic' | 'heavy';
}

export interface Avatar {
  id: string;
  userId: string;
  projectId?: string;
  name: string;
  modelId: string;
  config: AvatarConfig;
  thumbnail?: string;
  isRigged: boolean;
  createdAt: Date;
}

// Motion Capture Types
export interface PoseLandmark {
  x: number;
  y: number;
  z: number;
  visibility: number;
}

export interface PoseFrame {
  timestamp: number;
  landmarks: PoseLandmark[];
}

export interface MotionCaptureData {
  frames: PoseFrame[];
  fps: number;
  duration: number;
}

// Export Types
export interface ExportOptions {
  format: ModelFormat;
  includeAnimations: boolean;
  includeTextures: boolean;
  optimize: boolean;
  targetEngine?: 'blender' | 'unity' | 'unreal' | 'web';
}

export interface ExportResult {
  url: string;
  format: ModelFormat;
  size: number;
  downloadUrl: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// WebSocket Events
export enum WebSocketEvent {
  JOB_PROGRESS = 'job:progress',
  JOB_COMPLETED = 'job:completed',
  JOB_FAILED = 'job:failed',
  POSE_DATA = 'pose:data',
}

export interface WebSocketMessage<T = any> {
  event: WebSocketEvent;
  data: T;
}
