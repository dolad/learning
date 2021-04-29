import { Module, forwardRef } from '@nestjs/common';
import { AssesmentService } from './service/assesment.service';
import { AssesmentController } from './controller/assesment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ASSESSMENT, QUESTION } from 'src/common';
import { AssessmentSchema } from './schema/assesment.schema';
import { QuestionSchema } from './schema/question.schema';
import { ResponseService } from '../../shared/response.service';
import { QuestionService } from './service/question.service';
import { QuestionController } from './controller/question.controller';
import { UsersModule } from '../users/users.module';
import { UserAssesmentService } from '../users/service/user_assesment.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ASSESSMENT,
        schema: AssessmentSchema,
      },
      {
        name: QUESTION,
        schema: QuestionSchema,
      },
    ]),
    forwardRef(() => UsersModule),
  ],
  controllers: [AssesmentController, QuestionController],
  providers: [AssesmentService, ResponseService, QuestionService],
  exports: [AssesmentService, QuestionService],
})
export class AssesmentModule {}
