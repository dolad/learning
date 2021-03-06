import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { COURSE } from 'src/common';
import { ResponseService } from 'src/shared/response.service';
import { AuthModule } from '../auth/auth.module';
import { CourseCategoryModules } from '../course_category/course_category.module';
import { UsersModule } from '../users/users.module';
import { CourseController } from './controller/course.controller';
import { CourseSchema } from './schema/course.schema';
import { CourseService } from './service/course.service';
import { CourseCategoryService } from '../course_category/service/course_category.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: COURSE,
        schema: CourseSchema,
      },
    ]),
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
    forwardRef(() => CourseCategoryModules),
  ],
  controllers: [CourseController],
  providers: [CourseService, ResponseService],
  exports: [CourseService],
})
export class CourseModule {}
