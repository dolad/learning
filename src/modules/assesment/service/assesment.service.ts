import { Injectable } from '@nestjs/common';
import { CreateAssesmentDto } from '../dto/create-assesment.dto';
import { UpdateAssesmentDto } from '../dto/update-assesment.dto';
import { Model } from 'mongoose';
import { ASSESSMENT } from 'src/common';
import { IAssesments } from '../interface/assessment.schema';
import { isEmpty } from 'lodash';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AssesmentService {
  constructor(
    @InjectModel(ASSESSMENT)
    private readonly assessmentModel: Model<IAssesments>,
  ) {}
  async createAssessment(
    createAssesmentDto: CreateAssesmentDto,
  ): Promise<IAssesments> {
    const check = await this.assessmentModel.findOne({
      name: createAssesmentDto.name,
    });
    if (isEmpty(check)) {
      return await this.assessmentModel.create(createAssesmentDto);
    } else {
      throw new Error(`Assessment  [${createAssesmentDto.name}] already exist`);
    }
  }

  async findAll(): Promise<IAssesments[]> {
    return await this.assessmentModel.find();
  }

  async findOne(id: string): Promise<IAssesments> {
    return await this.assessmentModel.findById(id);
  }

  async update(
    id: string,
    assesment: UpdateAssesmentDto,
  ): Promise<IAssesments> {
    const payload = await this.assessmentModel.findOneAndUpdate(
      { _id: id },
      { $set: assesment },
      { upsert: true, new: true },
    );
    return payload;
  }

  async remove(id: string): Promise<IAssesments> {
    return await this.assessmentModel.findByIdAndDelete(id);
  }
  async updateQuestion(filter: any, update: any): Promise<any> {
    const option = { upsert: true, new: true };
    return await this.assessmentModel
      .findOneAndUpdate(filter, update, option)
      .populate('questions');
  }
}
