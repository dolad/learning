import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OPTION } from 'src/common';
import { isEmpty } from 'lodash';
import { QuestionService } from './question.service';
import { IOptions } from '../interface/options.interface';
import { CreateOptionDto } from '../dto/option.dto';
@Injectable()
export class OptionService {
  constructor(
    @InjectModel(OPTION)
    private readonly optionModel: Model<IOptions>,
    private readonly questionService: QuestionService,
  ) {}
  public async createOption(
    question_id: string,
    optionDto: CreateOptionDto,
  ): Promise<IOptions> {
    const checkModule = await this.questionService.getQuestionById(question_id);
    if (isEmpty(checkModule))
      throw new Error(
        `Question with id [${question_id}] doesn't already exist`,
      );
    const option = await this.optionModel.create(optionDto);
    const update = {
      $push: { options: option._id },
    };
    const filter = { _id: question_id };
    const updateQuestion = await this.questionService.updateOption(
      filter,
      update,
    );
    return updateQuestion;
  }

  async deleteOption(id: string): Promise<IOptions> {
    return await this.optionModel.findByIdAndDelete(id);
  }
  async getOptionById(course_id: string): Promise<IOptions> {
    return await this.optionModel.findById(course_id);
  }
}
