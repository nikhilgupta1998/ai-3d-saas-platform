import { Controller, Get, Post, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IsString, IsObject, IsOptional, IsEnum } from 'class-validator';

enum JobType {
  TEXT_TO_AVATAR = 'TEXT_TO_AVATAR',
  IMAGE_TO_3D = 'IMAGE_TO_3D',
  VIDEO_TO_ANIMATION = 'VIDEO_TO_ANIMATION',
  PROMPT_TO_ANIMATION = 'PROMPT_TO_ANIMATION',
  EXPORT_BLENDER = 'EXPORT_BLENDER',
}

class CreateJobDto {
  @IsEnum(JobType)
  type: JobType;

  @IsObject()
  input: Record<string, any>;

  @IsOptional()
  @IsString()
  projectId?: string;
}

@Controller('jobs')
@UseGuards(JwtAuthGuard)
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Post()
  async createJob(@Request() req, @Body() createJobDto: CreateJobDto) {
    return this.jobsService.createJob(
      req.user.userId,
      createJobDto.type,
      createJobDto.input,
      createJobDto.projectId
    );
  }

  @Get()
  async listJobs(
    @Request() req,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string
  ) {
    return this.jobsService.listJobs(
      req.user.userId,
      page ? parseInt(page, 10) : 1,
      pageSize ? parseInt(pageSize, 10) : 20
    );
  }

  @Get(':id')
  async getJob(@Param('id') id: string) {
    return this.jobsService.getJob(id);
  }
}
