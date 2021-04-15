import { Module } from '@nestjs/common';
import { AssesmentService } from './service/assesment.service';
import { AssesmentController } from './controller/assesment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ASSESSMENT, OPTION, QUESTION } from 'src/common';
import { AssessmentSchema } from './schema/assesment.schema';
import { OptionSchema } from './schema/option.schema';
import { QuestionSchema } from './schema/question.schema';
import { ResponseService } from 'src/shared/response.service';
import { QuestionService } from './service/question.service';
import { OptionService } from './service/option.service';
import { QuestionController } from './controller/question.controller';
import { OptionController } from './controller/optionController';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ASSESSMENT,
        schema: AssessmentSchema,
      },
      {
        name: OPTION,
        schema: OptionSchema,
      },
      {
        name: QUESTION,
        schema: QuestionSchema,
      },
    ]),
  ],
  controllers: [AssesmentController, QuestionController, OptionController],
  providers: [
    AssesmentService,
    ResponseService,
    QuestionService,
    OptionService,
  ],
  exports: [AssesmentService, QuestionService, OptionService],
})
export class AssesmentModule {}
