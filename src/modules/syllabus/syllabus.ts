import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { COURSE, SYLLABUS } from 'src/common';
import { ResponseService } from 'src/shared/response.service';
import { CourseModule } from '../course/course.module';
import { CourseSchema } from '../course/schema/course.schema';
import { CourseService } from '../course/service/course.service';
import { UsersModule } from '../users/users.module';
import { SyllabusController } from './controller/course-module.controller';
import { SyllabusSchema } from './schema/syllabus.schema';
import { SyllabusService } from './service/syllabus.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: COURSE,
        schema: CourseSchema,
      },
      {
        name: SYLLABUS,
        schema: SyllabusSchema,
      },
    ]),
    CourseModule,
    UsersModule,
  ],
  controllers: [SyllabusController],
  providers: [SyllabusService, ResponseService, CourseService],
  exports: [SyllabusService],
})
export class SyllabusModule {}
