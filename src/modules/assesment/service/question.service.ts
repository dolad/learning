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

  // async createUser(createUserDto: CreateUserDto): Promise<User> {
  //   const session = await this.userModel.db.startSession();
  //   session.startTransaction();

  //   try {
  //     const {
  //       email,
  //       phoneNumber,
  //       businessName,
  //       name,
  //       userType,
  //       password,
  //       inviteToken,
  //     } = createUserDto;
  //     const user = new this.userModel({ email, password, name, userType });

  //     user.$session(session);

  //     const savedUser = await user.save();

  //     if (userType === UserTypes.business) {
  //       const business = await this.businessService.createBusiness(
  //         user._id,
  //         {
  //           email,
  //           phoneNumber,
  //           name: businessName,
  //         },
  //         session,
  //       );
  //       await this.kycService.createForEntity(business._id, UserTypes.business);
  //     } else {
  //       const employee = await this.employeeService.createEmployee(
  //         user._id,
  //         { phoneNumber, inviteToken },
  //         session,
  //       );
  //       await this.kycService.createForEntity(employee._id, UserTypes.employee);
  //     }

  //     await session.commitTransaction();
  //     return savedUser;
  //   } catch (e) {
  //     if (e.code === 11000) {
  //       throw new ConflictException(
  //         `A user with this ${camelCaseToWords(
  //           Object.keys(e.keyPattern)[0],
  //         ).toLowerCase()} already exists`,
  //       );
  //     }

  //     if (e && e.code !== 11000) {
  //       throw new InternalServerErrorException(e.message);
  //     }
  //     await session.abortTransaction();
  //   } finally {
  //     session.endSession();
  //   }
  // }
}
