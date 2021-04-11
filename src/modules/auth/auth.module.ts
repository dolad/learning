import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResponseService } from 'src/shared/response.service';
import { DEPARTMENT, USER } from '../users/common';
import { DepartmentSchema } from '../users/schema/department.schema';
import { UserSchema } from '../users/schema/user.schema';
import { UsersModule } from '../users/users.module';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { ErpClass } from './service/ErpService';
import { ApiRequest } from './service/fetchEmployee.services';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constant';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: USER, schema: UserSchema },
      { name: DEPARTMENT, schema: DepartmentSchema },
    ]),
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: jwtConstants.signOptions,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    ResponseService,
    ErpClass,
    ApiRequest,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
