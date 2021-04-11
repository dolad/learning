import { Module } from '@nestjs/common';
import { CourseService } from './service/course.service';

@Module({
  providers: [CourseService],
})
export class CourseModule {}
