import { 
  Controller, 
  Get, 
  Post, 
  Delete, 
  Param, 
  UseGuards, 
  UseInterceptors,
  UploadedFile,
  Request,
  BadRequestException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AssetsService } from './assets.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('assets')
@UseGuards(JwtAuthGuard)
export class AssetsController {
  constructor(private assetsService: AssetsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Request() req,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // In production, upload to S3 or similar
    // For now, store metadata
    const asset = await this.assetsService.create({
      projectId: req.body.projectId,
      userId: req.user.userId,
      type: req.body.type,
      name: file.originalname,
      url: `/uploads/${file.filename}`,
      size: file.size,
      metadata: {
        mimetype: file.mimetype,
      },
    });

    return asset;
  }

  @Get('project/:projectId')
  async getProjectAssets(@Param('projectId') projectId: string) {
    return this.assetsService.findByProject(projectId);
  }

  @Get(':id')
  async getAsset(@Param('id') id: string) {
    return this.assetsService.findOne(id);
  }

  @Get(':id/signed-url')
  async getSignedUrl(@Param('id') id: string) {
    const url = await this.assetsService.generateSignedUrl(id);
    return { url };
  }

  @Delete(':id')
  async deleteAsset(@Param('id') id: string) {
    return this.assetsService.delete(id);
  }
}
