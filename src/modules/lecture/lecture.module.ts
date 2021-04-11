import { Module } from '@nestjs/common';
import { LectureController } from './controller/lecture.controller';
import { LectureService } from './service/lecture.service';

@Module({
  controllers: [LectureController],
  providers: [LectureService],
})
export class LectureModule {}
