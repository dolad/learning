import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { COURSE, COURSEMODULES } from 'src/common';
import { ResponseService } from 'src/shared/response.service';
import { CourseModule } from '../course/course.module';
import { CourseSchema } from '../course/schema/course.schema';
import { CourseService } from '../course/service/course.service';
import { UsersModule } from '../users/users.module';
import { CourseModuleController } from './controller/course-module.controller';
import { CourseModuleSchema } from './schema/course-module.schema';
import { CourseModuleService } from './service/course-module.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: COURSE,
        schema: CourseSchema,
      },
      {
        name: COURSEMODULES,
        schema: CourseModuleSchema,
      },
    ]),
    CourseModule,
    UsersModule,
  ],
  controllers: [CourseModuleController],
  providers: [CourseModuleService, ResponseService, CourseService],
  exports: [CourseModuleService],
})
export class CourseModuleModule {}
