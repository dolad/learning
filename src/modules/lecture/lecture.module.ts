import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { USER, SYLLABUS, LECTURES, COURSE } from 'src/common';
import { ResponseService } from 'src/shared/response.service';
import { SyllabusModule } from '../syllabus/syllabus';
import { SyllabusSchema } from '../syllabus/schema/syllabus.schema';
import { SyllabusService } from '../syllabus/service/syllabus.service';
import { CourseModule } from '../course/course.module';
import { CourseSchema } from '../course/schema/course.schema';
import { CourseService } from '../course/service/course.service';
import { UserSchema } from '../users/schema/user.schema';
import { UsersModule } from '../users/users.module';
import { LectureController } from './controller/lecture.controller';
import { LectureSchema } from './schema/lecture.schema';
import { CloudinaryService } from './service/cloudinery.service';
import { LectureService } from './service/lecture.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SYLLABUS,
        schema: SyllabusSchema,
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
    SyllabusModule,
    UsersModule,
    forwardRef(() => CourseModule),
  ],
  controllers: [LectureController],
  providers: [LectureService, ResponseService, CloudinaryService],
  exports: [LectureService],
})
export class LectureModule {}
