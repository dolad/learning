import { Injectable } from '@nestjs/common';
import { Model, Query } from 'mongoose';
import { USER } from 'src/common';
import { isEmpty } from 'lodash';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from '../interfaces/user.interfaces';
import { QueryOptions } from 'src/common/query';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER)
    private readonly userModel: Model<IUser>,
  ) {}
  async findAll(): Promise<IUser[]> {
    return await this.userModel.find();
  }
  async findOne(id: string): Promise<IUser> {
    return await this.userModel.findById(id);
  }
  async findAndFilter(id: string, option: QueryOptions): Promise<any> {
    console.log(option);
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
    const option = { upsert: true };
    return await this.userModel.findOneAndUpdate(filter, update, option);
  }
}
