import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AssetsService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    projectId: string;
    userId: string;
    type: string;
    name: string;
    url: string;
    format?: string;
    size: number;
    metadata?: any;
  }) {
    return this.prisma.asset.create({
      data: {
        ...data,
        type: data.type as any,
        format: data.format as any,
      },
    });
  }

  async findByProject(projectId: string) {
    return this.prisma.asset.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.asset.findUnique({
      where: { id },
    });
  }

  async delete(id: string) {
    return this.prisma.asset.delete({
      where: { id },
    });
  }

  async generateSignedUrl(assetId: string): Promise<string> {
    // This would integrate with S3 or similar storage
    // For now, return the URL as-is
    const asset = await this.findOne(assetId);
    return asset?.url || '';
  }
}
