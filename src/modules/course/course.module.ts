import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { COURSE, USER } from 'src/common';
import { ResponseService } from 'src/shared/response.service';
import { AuthModule } from '../auth/auth.module';
import { UserSchema } from '../users/schema/user.schema';
import { UsersModule } from '../users/users.module';
import { CourseController } from './controller/course.controller';
import { CourseSchema } from './schema/course.schema';
import { CourseService } from './service/course.service';

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
    ]),
    UsersModule,
    AuthModule,
  ],
  controllers: [CourseController],
  providers: [CourseService, ResponseService],
  exports: [CourseService],
})
export class CourseModule {}
