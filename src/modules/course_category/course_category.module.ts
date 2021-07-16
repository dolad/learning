import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { COURSE_CATEGORY } from 'src/common';
import { ResponseService } from 'src/shared/response.service';
import { CourseModule } from '../course/course.module';
import { UsersModule } from '../users/users.module';
import { CourseCategoryController } from './controller/course_category.controller';
import { CourseCategorySchema } from './schema/course_category.schema';
import { CourseCategoryService } from './service/course_category.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: COURSE_CATEGORY,
        schema: CourseCategorySchema,
      },
    ]),
    forwardRef(() => CourseModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [CourseCategoryController],
  providers: [CourseCategoryService, ResponseService],
  exports: [CourseCategoryService],
})
export class CourseCategoryModules {}
