import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { BullModule } from '@nestjs/bull';
import { JobProcessor } from './jobs.processor';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'ai-jobs',
    }),
    UsersModule,
  ],
  providers: [JobsService, JobProcessor],
  controllers: [JobsController],
  exports: [JobsService],
})
export class JobsModule {}
