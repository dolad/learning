import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { USER, COURSEMODULES, LECTURES, COURSE } from 'src/common';
import { ResponseService } from 'src/shared/response.service';
import { CourseModuleSchema } from '../course-module/schema/course-module.schema';
import { CourseModuleService } from '../course-module/service/course-module.service';
import { CourseSchema } from '../course/schema/course.schema';
import { CourseService } from '../course/service/course.service';
import { UserSchema } from '../users/schema/user.schema';
import { LectureController } from './controller/lecture.controller';
import { LectureSchema } from './schema/lecture.schema';
import { LectureService } from './service/lecture.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: COURSEMODULES,
        schema: CourseModuleSchema,
      },
      {
        name: USER,
        schema: UserSchema,
      },
      {
        name: LECTURES,
        schema: LectureSchema,
      },
      {
        name: COURSE,
        schema: CourseSchema,
      },
    ]),
  ],
  controllers: [LectureController],
  providers: [
    LectureService,
    ResponseService,
    CourseService,
    CourseModuleService,
  ],
  exports: [LectureService],
})
export class LectureModule {}
