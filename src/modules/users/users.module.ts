import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controller/users.controller';
import { UserService } from './service/users.service';
import { UserSchema } from './schema/user.schema';
import { ResponseService } from '../../shared/response.service';
import { USER, USER_ASSESMENT } from 'src/common/index';
import { AssesmentModule } from '../assesment/assesment.module';
import { UserAssesmentService } from './service/user_assesment.service';
import { UserAssessmentSchema } from './schema/user_assesment.schema';

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
    ]),
    forwardRef(() => AssesmentModule),
  ],
  controllers: [UserController],
  providers: [UserService, ResponseService, UserAssesmentService],
  exports: [UserService, UserAssesmentService],
})
export class UsersModule {}
