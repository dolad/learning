import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { USER } from 'src/common';
import { isEmpty } from 'lodash';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from '../interfaces/user.interfaces';
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
    return await this.userModel.findById(id).populate('assesments');
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
