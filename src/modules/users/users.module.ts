import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controller/users.controller';
import { UserService } from './service/users.service';
import { UserSchema } from './schema/user.schema';
import { ResponseService } from '../../shared/response.service';
import { USER } from 'src/common/index';
import { AssesmentModule } from '../assesment/assesment.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: USER, schema: UserSchema }]),
    forwardRef(() => AssesmentModule),
  ],
  controllers: [UserController],
  providers: [UserService, ResponseService],
  exports: [UserService],
})
export class UsersModule {}
