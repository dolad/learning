import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreateAssesmentDto } from '../dto/create-assesment.dto';
import {
  UpdateAssesmentDto,
  SubmittingAssesment,
} from '../dto/update-assesment.dto';
import { Model } from 'mongoose';
import { AssesmentStatus, ASSESSMENT, QUESTION } from 'src/common';
import { IAssesments } from '../interface/assessment.schema';
import { isEmpty } from 'lodash';
import { InjectModel } from '@nestjs/mongoose';
import { readBuffer, convertToSave } from 'src/shared/files/readExcel';
import { calculatePercentage } from 'src/util/compareAnswer';
import { IQuestion } from '../interface/question.schema';
import { UserService } from '../../users/service/users.service';
import { QuestionService } from './question.service';

@Injectable()
export class AssesmentService {
  constructor(
    @InjectModel(ASSESSMENT)
    private readonly assessmentModel: Model<IAssesments>,
    @InjectModel(QUESTION)
    private readonly questionModel: Model<IQuestion>,
    @Inject(forwardRef(() => QuestionService))
    private readonly questionServices: QuestionService,
    private readonly userServices: UserService,
  ) {}
  async createAssessment(
    createAssesmentDto: CreateAssesmentDto,
  ): Promise<IAssesments> {
    const check = await this.assessmentModel.findOne({
      name: createAssesmentDto.name,
    });
    if (isEmpty(check)) {
      const createAssesment =
        createAssesmentDto.assesment_type === 'general'
          ? await this.createAssesmentForAllUser(createAssesmentDto)
          : await this.createAssesmentForSelectedUser(createAssesmentDto);
      return createAssesment;
    } else {
      throw new Error(`Assessment  [${createAssesmentDto.name}] already exist`);
    }
  }

  private async createAssesmentForAllUser(createAssesmentDto): Promise<any> {
    const assesment: IAssesments = new this.assessmentModel(createAssesmentDto);
    const update = {
      $push: { assesments: assesment.id },
    };
    await this.userServices.updateAllUserDocument(update);
    const allUser = await this.userServices.findAll();
    const userIds = allUser.map((user) => user.id);
    assesment.users = userIds;
    const asses = await assesment.save();
    console.log('question', createAssesmentDto.question);
    const question = await this.questionServices.createQuestion(
      asses._id,
      createAssesmentDto.question,
    );
    // create question
    return question;
  }

  private async createAssesmentForSelectedUser(
    createAssesmentDto,
  ): Promise<any> {
    const assesment: IAssesments = new this.assessmentModel(createAssesmentDto);
    const update = {
      $push: { assesments: assesment.id },
    };
    if (!createAssesmentDto.users) {
      throw new Error(` you have not selecteed any user`);
    }
    const allUser = await this.userServices.findArrayOfSelecteduser(
      createAssesmentDto.users,
    );
    const userIds = allUser.map((user) => user.id);
    await this.userServices.updateSelectedUsersWithAssesment(update, userIds);
    assesment.users = userIds;
    const ass = await assesment.save();
    const question = await this.questionServices.createQuestion(
      ass._id,
      createAssesmentDto.questions,
    );
    console.log('question', question);
    // create question
    return question;
  }

  async findAll(): Promise<IAssesments[]> {
    return await this.assessmentModel.find();
  }
  async findOne(id: string): Promise<IAssesments> {
    return await this.assessmentModel.findById(id);
  }

  // async update(
  //   id: string,
  //   assesment: UpdateAssesmentDto,
  // ): Promise<IAssesments> {
  //   const payload = await this.assessmentModel.findOneAndUpdate(
  //     { _id: id },
  //     { $set: assesment },
  //     { upsert: true, new: true },
  //   );
  //   return payload;
  // }
  async remove(id: string): Promise<IAssesments> {
    return await this.assessmentModel.findByIdAndDelete(id);
  }
  async updateQuestion(filter: any, update: any): Promise<any> {
    const option = { upsert: true, new: true };
    return await this.assessmentModel
      .findOneAndUpdate(filter, update, option)
      .populate('questions');
  }
  async createViaExcel(file): Promise<any> {
    const result = readBuffer(file);
    const name = convertToSave(result);
    return name;
  }

  async updateWithFilter(filter: any, update: any): Promise<any> {
    const option = { upsert: true, returnNewDocument: true };
    return await this.assessmentModel.findOneAndUpdate(filter, update, option);
  }

  async activateAssesment(id: string): Promise<IAssesments> {
    const update = {
      $set: {
        status: AssesmentStatus.Active,
        is_enabled: true,
      },
    };
    const filter = { _id: id };
    return await this.updateWithFilter(filter, update);
  }

  async submitAssesment(
    id: string,
    assesment: SubmittingAssesment,
  ): Promise<any> {
    const getAssesment = await this.findOne(id);
    if (!isEmpty(getAssesment.questions)) {
      const answer2: Array<any> = assesment.data;
      const allQuestion = await this.questionModel.find({ assesment_id: id });
      const correctAnswer = allQuestion.filter((o1) =>
        answer2.some((o2) => o1.id === o2.question && o1.answer === o2.answer),
      );
      const result = correctAnswer ? correctAnswer.length : 0;
      const totalQuestion = allQuestion ? allQuestion.length : 0;
      const percentage = calculatePercentage(result, totalQuestion);
      const filter = { _id: id };
      const update = {
        $set: {
          score: `${percentage}%`,
          completed_at: Date.now(),
          status: AssesmentStatus.Completed,
          is_enabled: false,
        },
      };
      return await this.updateWithFilter(filter, update);
    } else {
      throw new Error(
        `Assesment with this [${id}] does not have any question yet please populate`,
      );
    }
  }
}
