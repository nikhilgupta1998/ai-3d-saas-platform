// File validation utilities
export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

export const validateFileSize = (file: File, maxSize: number): boolean => {
  return file.size <= maxSize;
};

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const validateImage = (file: File, maxSize: number): void => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  
  if (!validateFileType(file, allowedTypes)) {
    throw new ValidationError(
      `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`
    );
  }

  if (!validateFileSize(file, maxSize)) {
    throw new ValidationError(
      `File size exceeds maximum allowed size of ${maxSize / (1024 * 1024)}MB`
    );
  }
};

export const validateVideo = (file: File, maxSize: number): void => {
  const allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
  
  if (!validateFileType(file, allowedTypes)) {
    throw new ValidationError(
      `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`
    );
  }

  if (!validateFileSize(file, maxSize)) {
    throw new ValidationError(
      `File size exceeds maximum allowed size of ${maxSize / (1024 * 1024)}MB`
    );
  }
};

export const validate3DModel = (file: File, maxSize: number): void => {
  const allowedTypes = ['model/gltf-binary', 'application/octet-stream'];
  
  if (!validateFileType(file, allowedTypes)) {
    throw new ValidationError(
      `Invalid file type. Allowed types: GLB, FBX, BLEND`
    );
  }

  if (!validateFileSize(file, maxSize)) {
    throw new ValidationError(
      `File size exceeds maximum allowed size of ${maxSize / (1024 * 1024)}MB`
    );
  }
};
