import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controller/users.controller';
import { UserService } from './service/users.service';
import { UserSchema } from './schema/user.schema';
import { ResponseService } from '../../shared/response.service';
import {
  BRANCH,
  DEPARTMENT,
  USER,
  USER_ASSESMENT,
  USER_COURSE,
} from 'src/common/index';
import { AssesmentModule } from '../assesment/assesment.module';
import { UserAssesmentService } from './service/user_assesment.service';
import { UserAssessmentSchema } from './schema/user_assesment.schema';
import { BranchSchema } from './schema/branch.schema';
import { DepartmentSchema } from './schema/department.schema';
import { CourseModule } from '../course/course.module';
import { UserCourseService } from './service/user_course.service';
import { UserCourseSchema } from './schema/user_course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: USER,
        schema: UserSchema,
      },
      {
        name: USER_ASSESMENT,
        schema: UserAssessmentSchema,
      },
      {
        name: USER_COURSE,
        schema: UserCourseSchema,
      },
      {
        name: BRANCH,
        schema: BranchSchema,
      },
      {
        name: DEPARTMENT,
        schema: DepartmentSchema,
      },
    ]),
    CourseModule,
    forwardRef(() => AssesmentModule),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    ResponseService,
    UserAssesmentService,
    UserCourseService,
  ],
  exports: [UserService, UserAssesmentService, UserCourseService],
})
export class UsersModule {}
