import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { JobsService } from './jobs.service';
import { Logger } from '@nestjs/common';
import axios from 'axios';

@Processor('ai-jobs')
export class JobProcessor {
  private readonly logger = new Logger(JobProcessor.name);

  constructor(private jobsService: JobsService) {}

  @Process('TEXT_TO_AVATAR')
  async processTextToAvatar(job: Job) {
    this.logger.log(`Processing TEXT_TO_AVATAR job ${job.data.jobId}`);
    
    try {
      await this.jobsService.updateJobProgress(job.data.jobId, 10);

      // Call AI worker service
      const aiWorkerUrl = process.env.AI_WORKER_URL || 'http://localhost:8000';
      const response = await axios.post(`${aiWorkerUrl}/generate/avatar`, {
        jobId: job.data.jobId,
        prompt: job.data.input.prompt,
        config: job.data.input.config,
      });

      await this.jobsService.completeJob(job.data.jobId, response.data);
      this.logger.log(`Completed TEXT_TO_AVATAR job ${job.data.jobId}`);
    } catch (error) {
      this.logger.error(`Failed TEXT_TO_AVATAR job ${job.data.jobId}`, error);
      await this.jobsService.failJob(job.data.jobId, error.message);
      throw error;
    }
  }

  @Process('IMAGE_TO_3D')
  async processImageTo3D(job: Job) {
    this.logger.log(`Processing IMAGE_TO_3D job ${job.data.jobId}`);
    
    try {
      await this.jobsService.updateJobProgress(job.data.jobId, 10);

      const aiWorkerUrl = process.env.AI_WORKER_URL || 'http://localhost:8000';
      const response = await axios.post(`${aiWorkerUrl}/generate/image-to-3d`, {
        jobId: job.data.jobId,
        imageUrl: job.data.input.imageUrl,
      });

      await this.jobsService.completeJob(job.data.jobId, response.data);
      this.logger.log(`Completed IMAGE_TO_3D job ${job.data.jobId}`);
    } catch (error) {
      this.logger.error(`Failed IMAGE_TO_3D job ${job.data.jobId}`, error);
      await this.jobsService.failJob(job.data.jobId, error.message);
      throw error;
    }
  }

  @Process('VIDEO_TO_ANIMATION')
  async processVideoToAnimation(job: Job) {
    this.logger.log(`Processing VIDEO_TO_ANIMATION job ${job.data.jobId}`);
    
    try {
      await this.jobsService.updateJobProgress(job.data.jobId, 10);

      const aiWorkerUrl = process.env.AI_WORKER_URL || 'http://localhost:8000';
      const response = await axios.post(`${aiWorkerUrl}/generate/video-to-animation`, {
        jobId: job.data.jobId,
        videoUrl: job.data.input.videoUrl,
      });

      await this.jobsService.completeJob(job.data.jobId, response.data);
      this.logger.log(`Completed VIDEO_TO_ANIMATION job ${job.data.jobId}`);
    } catch (error) {
      this.logger.error(`Failed VIDEO_TO_ANIMATION job ${job.data.jobId}`, error);
      await this.jobsService.failJob(job.data.jobId, error.message);
      throw error;
    }
  }

  @Process('EXPORT_BLENDER')
  async processExportBlender(job: Job) {
    this.logger.log(`Processing EXPORT_BLENDER job ${job.data.jobId}`);
    
    try {
      await this.jobsService.updateJobProgress(job.data.jobId, 10);

      const blenderWorkerUrl = process.env.BLENDER_WORKER_URL || 'http://localhost:8001';
      const response = await axios.post(`${blenderWorkerUrl}/export`, {
        jobId: job.data.jobId,
        modelUrl: job.data.input.modelUrl,
        format: job.data.input.format,
        options: job.data.input.options,
      });

      await this.jobsService.completeJob(job.data.jobId, response.data);
      this.logger.log(`Completed EXPORT_BLENDER job ${job.data.jobId}`);
    } catch (error) {
      this.logger.error(`Failed EXPORT_BLENDER job ${job.data.jobId}`, error);
      await this.jobsService.failJob(job.data.jobId, error.message);
      throw error;
    }
  }
}
