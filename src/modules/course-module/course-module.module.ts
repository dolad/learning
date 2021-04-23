import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { COURSE, COURSEMODULES, USER } from 'src/common';
import { ResponseService } from 'src/shared/response.service';
import { CourseModule } from '../course/course.module';
import { CourseSchema } from '../course/schema/course.schema';
import { CourseService } from '../course/service/course.service';
import { UserSchema } from '../users/schema/user.schema';
import { UserService } from '../users/service/users.service';
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
        name: USER,
        schema: UserSchema,
      },
      {
        name: COURSEMODULES,
        schema: CourseModuleSchema,
      },
    ]),
    CourseModule,
  ],
  controllers: [CourseModuleController],
  providers: [CourseModuleService, ResponseService, CourseService, UserService],
  exports: [CourseModuleService],
})
export class CourseModuleModule {}
