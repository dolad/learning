import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER } from 'src/modules/users/common';
import { User } from 'src/modules/users/interfaces/user.interfaces';
import { ErpClass } from './ErpService';
import { ApiRequest } from './fetchEmployee.services';
import { isEmpty } from 'lodash';
import { comparePassword } from 'src/util/comparePassword';
import { replaceEmail } from 'src/util/filter';
@Injectable()
export class AuthService {
  constructor(
    private readonly erpService: ErpClass,
    @InjectModel(USER)
    private readonly userModel: Model<User>,
  ) {}

  async insertEmployee(): Promise<any> {
    const employee = await this.erpService.fetchEmployee();
    let newUser: any;
    try {
      newUser = this.userModel.insertMany(employee.data);
    } catch (error) {
      console.log(error);
    }

    return newUser;
  }

  async login(employeeLogin): Promise<any> {
    const convertedEmail = replaceEmail(employeeLogin.email);
    console.log('newEmail', convertedEmail);
    const employee = await this.userModel.findOne({
      email: convertedEmail,
    });
    if (isEmpty(employee)) {
      throw new Error('Employee not registered');
    }
    const result = await comparePassword(
      employeeLogin.password,
      employee.password,
    );
    if (result === true) {
      return employee;
    } else {
      throw new Error('Invalid Password');
    }
  }
}
