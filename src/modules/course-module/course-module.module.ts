import { Module } from '@nestjs/common';
import { CourseModuleController } from './controller/course-module.controller';
import { CourseModuleService } from './service/course-module.service';

@Module({
  controllers: [CourseModuleController],
  providers: [CourseModuleService],
})
export class CourseModuleModule {}
