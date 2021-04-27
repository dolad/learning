import { Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QUESTION } from 'src/common';
import { CreateQuestionDto, UpdateQuestionDto } from '../dto/question.dto';
import { IQuestion } from '../interface/question.schema';
import { isEmpty } from 'lodash';
import { AssesmentService } from './assesment.service';
import { Inject } from '@nestjs/common';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(QUESTION)
    private readonly questionModel: Model<IQuestion>,
    @Inject(forwardRef(() => AssesmentService))
    private readonly assesmentService: AssesmentService,
  ) {}
  public async createQuestion(id: string, questionDto: any): Promise<any> {
    const question: any = await this.questionModel.insertMany(questionDto);
    const question_ids = question.map((ques) => ques.id);
    const update = {
      $push: { questions: question_ids },
    };
    const filter = { _id: id };
    const updatedCourseModule = await this.assesmentService.updateQuestion(
      filter,
      update,
    );
    return updatedCourseModule;
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
