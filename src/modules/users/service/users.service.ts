import { Injectable } from '@nestjs/common';
import { Model, Query } from 'mongoose';
import { BRANCH, DEPARTMENT, USER, USER_ASSESMENT } from 'src/common';
import { isEmpty } from 'lodash';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from '../interfaces/user.interfaces';
import { QueryOptions } from '../../../common/query';
import { IBranch, IDepartment } from '../interfaces/department.interface';
import { ErpClass } from 'src/modules/auth/service/ErpService';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER)
    private readonly userModel: Model<IUser>,
    @InjectModel(DEPARTMENT)
    private readonly departmentModel: Model<IDepartment>,
    @InjectModel(BRANCH)
    private readonly branchModel: Model<IBranch>,
  ) {}
  async findAll(query?: any): Promise<IUser[]> {
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
  async getDepartment(): Promise<any> {
    try {
      return await this.departmentModel.find();
    } catch (error) {
      console.log(error);
    }
  }
  async saveDepartment(): Promise<any> {
    const erpService = new ErpClass();
    const department = await erpService.fetchDepartment();
    let newDepartment: any;
    try {
      newDepartment = await this.departmentModel.insertMany(department.data);
    } catch (error) {
      console.log(error);
    }
    return newDepartment;
  }
  async saveBranches(): Promise<any> {
    const erpService = new ErpClass();
    const branches = await erpService.fetchBranch();
    let newBranch: any;
    try {
      newBranch = await this.branchModel.insertMany(branches.data);
    } catch (error) {
      console.log(error);
    }
    return newBranch;
  }
}
