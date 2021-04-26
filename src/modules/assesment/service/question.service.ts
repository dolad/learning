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
  ): Promise<IQuestion> {
    const check = await this.questionModel.findOne({
      question: questionDto.question,
    });
    if (isEmpty(check)) {
      const question = await new this.questionModel(questionDto);
      question.assesment_id = id;
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
    return await this.questionModel.find().populate('assesment_id');
  }
  async getWithAssessmentID(id): Promise<IQuestion[]> {
    return await this.questionModel
      .find({ assesment_id: id })
      .populate('assesment_id');
  }
  async getQuestionById(quesion_id: string): Promise<IQuestion> {
    return await this.questionModel
      .findById(quesion_id)
      .populate('assesment_id', 'durations');
  }
  async updateOption(filter: any, update: any): Promise<any> {
    const option = { upsert: true, new: true };
    return await this.questionModel
      .findOneAndUpdate(filter, update, option)
      .populate('options');
  }
}
