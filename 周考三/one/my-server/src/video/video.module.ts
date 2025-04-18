import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { VideoModule as VidelList} from '../database/models/video.model';

@Module({
  imports: [VidelList],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
