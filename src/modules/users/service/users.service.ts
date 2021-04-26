import { Injectable } from '@nestjs/common';
import { Model, Query } from 'mongoose';
import { USER } from 'src/common';
import { isEmpty } from 'lodash';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from '../interfaces/user.interfaces';
import { QueryOptions } from '../../../common/query';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER)
    private readonly userModel: Model<IUser>,
  ) {}
  async findAll(query?: any): Promise<IUser[]> {
    console.log('queryuser', query);
    const queryUser = !query
      ? await this.userModel.find()
      : await this.userModel.find({ ...query });
    return queryUser;
  }
  async findOne(id: string): Promise<IUser> {
    return await this.userModel.findById(id);
  }
  async findArrayOfSelecteduser(ids: Array<string>): Promise<IUser[]> {
    return await this.userModel.find({ _id: { $in: ids } });
  }
  async updateSelectedUsersWithAssesment(
    update: any,
    ids: Array<string>,
  ): Promise<any> {
    const option = { upsert: true };
    console.log('ids', ids);
    const updatedUsers = await this.userModel.updateMany(
      { _id: { $in: ids } },
      update,
      option,
    );
    return updatedUsers;
  }
  async findAndFilterWithAssesment(
    id: string,
    option: QueryOptions,
  ): Promise<any> {
    const user = await this.userModel.findById(id).populate({
      path: 'assesments',
      match: { ...option },
    });
    return {
      user,
      user_assesment_count: user.assesments.length,
    };
  }
  async remove(id: string): Promise<any> {
    return await this.userModel.findByIdAndDelete(id);
  }
  async updateAllUserDocument(update: any): Promise<any> {
    const option = { upsert: true };
    const updatedUsers = await this.userModel.updateMany({}, update, option);
    return updatedUsers;
  }
  async updateWithFilter(filter: any, update: any): Promise<IUser> {
    const option = { upsert: true, new: true };
    return await this.userModel.findOneAndUpdate(filter, update, option);
  }
  async makeAdmin(email): Promise<IUser> {
    const filter = { email: email };
    const update = {
      $set: {
        user_roles: 'admin',
      },
    };
    return await this.updateWithFilter(filter, update);
  }
}
