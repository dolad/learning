import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { AssesmentStatus, USER_ASSESMENT } from 'src/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUserAssesment } from '../interfaces/user_assesment.interface';
import { SubmittingAssesment } from 'src/modules/assesment/dto/update-assesment.dto';
import { QuestionService } from 'src/modules/assesment/service/question.service';
import { calculatePercentage } from 'src/util/compareAnswer';
@Injectable()
export class UserAssesmentService {
  constructor(
    @InjectModel(USER_ASSESMENT)
    private readonly userAssesmentModel: Model<IUserAssesment>,
    private readonly questionService: QuestionService,
  ) {}
  async createWithSession(
    assesment: Array<any>,
    session: any,
  ): Promise<IUserAssesment[]> {
    try {
      const userAsses = await this.userAssesmentModel.insertMany(assesment, {
        session,
      });
      return userAsses;
    } catch (error) {
      throw new Error(`Cant user_assesment table`);
    }
  }

  async create(assesment: Array<any>): Promise<IUserAssesment[]> {
    try {
      const userAsses = await this.userAssesmentModel.insertMany(assesment);
      return userAsses;
    } catch (error) {
      throw new Error(`Cant user_assesment table`);
    }
  }

  async findAll(query?: any): Promise<IUserAssesment[]> {
    const queryUser = !query
      ? await this.userAssesmentModel.find({ assesments_id: { $ne: null } })
      : await this.userAssesmentModel.find({
          assesments_id: { $ne: null },
          ...query,
        });
    return queryUser;
  }

  async findWithUserID(userID: string, query?: any): Promise<IUserAssesment[]> {
    const queryUser = !query
      ? await this.userAssesmentModel
          .find({ user_id: userID, status: 'completed' })
          .populate('assesments_id')
      : await this.userAssesmentModel
          .find({ user_id: userID, assesments_id: { $ne: null }, ...query })
          .populate('assesments_id');
    return queryUser;
  }

  async findWithAssesmentID(assesments_id: string): Promise<IUserAssesment[]> {
    return await this.userAssesmentModel
      .find({ assesments_id: assesments_id })
      .populate('user_id');
  }

  async findWithUserIDAndAssID(
    assesments_id: string,
    auth_id: string,
    query?: any,
  ): Promise<IUserAssesment[]> {
    const queryUser = !query
      ? this.userAssesmentModel
          .find({ assesments_id: assesments_id, user_id: auth_id })
          .populate('assesments_id')
      : this.userAssesmentModel
          .find({ assesments_id: assesments_id, user_id: auth_id, ...query })
          .populate('assesments_id');
    return queryUser;
  }

  async submitAssesment(
    assesment_id: string,
    auth_id: string,
    assesment: SubmittingAssesment,
  ): Promise<any> {
    const userAssesment = await this.findWithUserIDAndAssID(
      assesment_id,
      auth_id,
    );
    const getAssesment = userAssesment[0];
    if (getAssesment) {
      const answer2: Array<any> = assesment.data;
      const allQuestion = await this.questionService.getWithAssessmentID(
        assesment_id,
      );
      const correctAnswer = allQuestion.filter((o1) =>
        answer2.some(
          (o2) =>
            o1.id === o2.question &&
            o1.answer.toLowerCase() === o2.answer.toLowerCase(),
        ),
      );
      const result = correctAnswer ? correctAnswer.length : 0;
      const totalQuestion = allQuestion ? allQuestion.length : 0;
      const percentage = calculatePercentage(result, totalQuestion);
      const filter = { user_id: auth_id, assesments_id: assesment_id };
      const update = {
        $set: {
          score: percentage,
          completed_at: Date.now(),
          status: AssesmentStatus.Completed,
        },
      };
      return await this.updateWithFilter(filter, update);
    } else {
      throw new Error(
        `This Assesment does not have any question yet please populate`,
      );
    }
  }

  async userAssesment(payload: any): Promise<any> {
    return await this.userAssesmentModel
      .find({
        user_id: payload.user_id,
        assesments_id: payload.assesment_id,
      })
      .populate('assesments_id')
      .exec();
  }

  async updateWithFilter(filter: any, update: any): Promise<any> {
    const option = { upsert: true, returnNewDocument: true, new: true };
    return await this.userAssesmentModel
      .findOneAndUpdate(filter, update, option)
      .populate('assesments_id')
      .exec();
  }

  async completedAssesment(id: string): Promise<any> {
    return await this.userAssesmentModel
      .find({
        assesments_id: id,
        status: 'completed',
      })
      .populate('user_id')
      .exec();
  }

  async notAttemptedAssesment(id: string): Promise<any> {
    return await this.userAssesmentModel.find({
      assesments_id: id,
      status: 'inactive',
    });
  }

  async delete(auth_id: string, assesments_id: string): Promise<any> {
    const filter = { user_id: auth_id, assesments_id: assesments_id };
    return await this.userAssesmentModel.findOneAndDelete(filter);
  }
}
