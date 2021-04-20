import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QUESTION } from 'src/common';
import { CreateQuestionDto, UpdateQuestionDto } from '../dto/question.dto';
import { IQuestion } from '../interface/question.schema';
import { isEmpty } from 'lodash';
import { AssesmentService } from './assesment.service';
import { IAssesments } from '../interface/assessment.schema';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(QUESTION)
    private readonly questionModel: Model<IQuestion>,
    private readonly assesmentService: AssesmentService,
  ) {}
  public async createQuestion(
    id: string,
    questionDto: CreateQuestionDto,
    assesment_id: string,
  ): Promise<IQuestion> {
    const checkAssessment: IAssesments = await this.assesmentService.findOne(
      id,
    );
    if (isEmpty(checkAssessment))
      throw new Error(`Assessment with id [${id}] doesn't already exist`);
    const check = await this.questionModel.findOne({
      question: questionDto.question,
    });
    if (isEmpty(check)) {
      const question = await new this.questionModel(questionDto);
      question.assesment_id = assesment_id;
      await question.save();
      const update = {
        $push: { questions: question._id },
      };
      const filter = { _id: id };
      const updatedCourseModule = await this.assesmentService.updateQuestion(
        filter,
        update,
      );
      return updatedCourseModule;
    } else {
      throw new Error(`Question [${questionDto.question}] already exist`);
    }
  }
  async updateQuestion(
    id: string,
    question: UpdateQuestionDto,
  ): Promise<IQuestion> {
    const payload = await this.questionModel.findOneAndUpdate(
      { _id: id },
      { $set: question },
      { upsert: true, new: true },
    );
    return payload;
  }
  async deleteQuestion(id: string): Promise<IQuestion> {
    return await this.questionModel.findByIdAndUpdate(id, {
      is_deleted: true,
      deleted_at: new Date(),
    });
  }
  async getAllQuestion(): Promise<IQuestion[]> {
    return await this.questionModel.find();
  }
  async getWithAssessmentID(id): Promise<IQuestion[]> {
    return await this.questionModel.find({ assesment_id: id });
  }
  async getQuestionById(quesion_id: string): Promise<IQuestion> {
    return await this.questionModel.findById(quesion_id);
  }
  async updateOption(filter: any, update: any): Promise<any> {
    const option = { upsert: true, new: true };
    return await this.questionModel
      .findOneAndUpdate(filter, update, option)
      .populate('options');
  }
}
