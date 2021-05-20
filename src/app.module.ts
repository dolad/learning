import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import configuration from './config/app.config';
import {
  UsersModule,
  AuthModule,
  CourseModule,
  CourseModuleModule,
  LectureModule,
  AssesmentModule,
} from './modules/index';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(configuration().database.test, {
      connectionFactory: (connection) => {
        connection.plugin(mongoosePaginate);
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        connection.plugin(require('mongoose-autopopulate'));
        return connection;
      },
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    UsersModule,
    AuthModule,
    CourseModule,
    CourseModuleModule,
    LectureModule,
    AssesmentModule,
  ],
})
export class AppModule {}
