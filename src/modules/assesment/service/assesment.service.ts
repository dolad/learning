import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreateAssesmentDto } from '../dto/create-assesment.dto';
import { SubmittingAssesment } from '../dto/update-assesment.dto';
import { Model } from 'mongoose';
import { AssesmentStatus, ASSESSMENT, QUESTION } from 'src/common';
import { IAssesments } from '../interface/assessment.schema';
import { isEmpty } from 'lodash';
import { InjectModel } from '@nestjs/mongoose';
import { readBuffer, convertToSave } from 'src/shared/files/readExcel';
import { IQuestion } from '../interface/question.schema';
import { UserService } from '../../users/service/users.service';
import { QuestionService } from './question.service';
import { UserAssesmentService } from 'src/modules/users/service/user_assesment.service';

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
    @Inject(forwardRef(() => UserAssesmentService))
    private readonly userAssesmentService: UserAssesmentService,
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
          ? await this.createAssesmentTest(createAssesmentDto)
          : await this.createAssesmentForSelectedUser(createAssesmentDto);
      return createAssesment;
    } else {
      throw new Error(`Assessment  [${createAssesmentDto.name}] already exist`);
    }
  }

  private async createAssesmentTest(createAssesmentDto): Promise<any> {
    const session = await this.assessmentModel.db.startSession();
    try {
      await session.withTransaction(async () => {
        const assesment: IAssesments = new this.assessmentModel(
          createAssesmentDto,
        );
        assesment.$session(session);
        const allUser = await this.userServices.findAll();
        const userAssesmentTable = allUser.map((user) => {
          return { assesments_id: assesment._id, user_id: user._id };
        });
        const userAss = await this.userAssesmentService.createWithSession(
          userAssesmentTable,
          session,
        );
        const transformedArray = createAssesmentDto.question.map((item) => {
          const newObj = { ...item };
          newObj.assesment_id = assesment._id;
          return newObj;
        });
        await this.questionServices.createQuestionWithSession(
          assesment._id,
          transformedArray,
          session,
        );
        return userAss;
      });
    } catch (error) {
      throw new Error(
        `Assessment  [${createAssesmentDto.name}] cant be created`,
      );
    } finally {
      await session.endSession();
    }
  }

  private async createAssesmentForSelectedUser(
    createAssesmentDto,
  ): Promise<any> {
    const session = await this.assessmentModel.db.startSession();
    if (!createAssesmentDto.users) {
      throw new Error(` you have not selecteed any user`);
    }
    try {
      await session.withTransaction(async () => {
        const assesment: IAssesments = new this.assessmentModel(
          createAssesmentDto,
        );
        assesment.$session(session);
        const allUser = await this.userServices.findArrayOfSelecteduser(
          createAssesmentDto.users,
        );
        const userAssesmentTable = allUser.map((user) => {
          return { assesments_id: assesment._id, user_id: user._id };
        });
        const userAss = await this.userAssesmentService.createWithSession(
          userAssesmentTable,
          session,
        );
        const transformedArray = createAssesmentDto.question.map((item) => {
          const newObj = { ...item };
          newObj.assesment_id = assesment._id;
          return newObj;
        });
        await this.questionServices.createQuestionWithSession(
          assesment._id,
          transformedArray,
          session,
        );
        return userAss;
      });
    } catch (error) {
      throw new Error(
        `Assessment  [${createAssesmentDto.name}] cant be created`,
      );
    } finally {
      await session.endSession();
    }
  }

  async findAll(): Promise<IAssesments[]> {
    return await this.assessmentModel.find();
  }
  async findOne(id: string): Promise<IAssesments> {
    return await this.assessmentModel.findById(id);
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
    assess_id: string,
    auth_id,
    assesment: SubmittingAssesment,
  ): Promise<any> {
    return await this.userAssesmentService.submitAssesment(
      assess_id,
      auth_id,
      assesment,
    );
  }
}
