import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SYLLABUS } from 'src/common';
import { ResponseService } from 'src/shared/response.service';
import { CourseModule } from '../course/course.module';
import { UsersModule } from '../users/users.module';
import { SyllabusController } from './controller/syllabus.controller';
import { SyllabusSchema } from './schema/syllabus.schema';
import { SyllabusService } from './service/syllabus.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SYLLABUS,
        schema: SyllabusSchema,
      },
    ]),
    CourseModule,
    UsersModule,
  ],
  controllers: [SyllabusController],
  providers: [SyllabusService, ResponseService],
  exports: [SyllabusService],
})
export class SyllabusModule {}
