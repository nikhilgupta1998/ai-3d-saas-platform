import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class JobsService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    @InjectQueue('ai-jobs') private jobQueue: Queue
  ) {}

  async createJob(userId: string, type: string, input: any, projectId?: string) {
    // Calculate credits needed
    const creditsNeeded = this.getCreditsForJobType(type);
    
    // Check if user has enough credits
    const user = await this.usersService.findOne(userId);
    if (!user || user.credits < creditsNeeded) {
      throw new Error('Insufficient credits');
    }

    // Create job in database
    const job = await this.prisma.job.create({
      data: {
        userId,
        projectId,
        type: type as any,
        status: 'PENDING',
        progress: 0,
        input,
        creditsUsed: creditsNeeded,
      },
    });

    // Deduct credits
    await this.usersService.deductCredits(userId, creditsNeeded);

    // Add job to queue
    await this.jobQueue.add(type, {
      jobId: job.id,
      userId,
      type,
      input,
    });

    return job;
  }

  async getJob(id: string) {
    return this.prisma.job.findUnique({
      where: { id },
    });
  }

  async listJobs(userId: string, page = 1, pageSize = 20) {
    const skip = (page - 1) * pageSize;
    
    const [jobs, total] = await Promise.all([
      this.prisma.job.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize,
      }),
      this.prisma.job.count({ where: { userId } }),
    ]);

    return {
      items: jobs,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async updateJobProgress(jobId: string, progress: number) {
    return this.prisma.job.update({
      where: { id: jobId },
      data: {
        progress,
        status: 'PROCESSING',
      },
    });
  }

  async completeJob(jobId: string, output: any) {
    return this.prisma.job.update({
      where: { id: jobId },
      data: {
        status: 'COMPLETED',
        progress: 100,
        output,
        completedAt: new Date(),
      },
    });
  }

  async failJob(jobId: string, error: string) {
    return this.prisma.job.update({
      where: { id: jobId },
      data: {
        status: 'FAILED',
        error,
        completedAt: new Date(),
      },
    });
  }

  private getCreditsForJobType(type: string): number {
    const creditMap: Record<string, number> = {
      TEXT_TO_AVATAR: 10,
      IMAGE_TO_3D: 20,
      VIDEO_TO_ANIMATION: 30,
      PROMPT_TO_ANIMATION: 15,
      EXPORT_BLENDER: 5,
    };
    return creditMap[type] || 10;
  }
}
