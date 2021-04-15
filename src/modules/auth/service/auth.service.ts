import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER } from 'src/common';
import { User } from 'src/modules/users/interfaces/user.interfaces';
import { ErpClass } from './ErpService';
import { JwtService } from '@nestjs/jwt';
import { isEmpty } from 'lodash';
import { comparePassword } from 'src/util/comparePassword';
import { replaceEmail } from 'src/util/filter';
@Injectable()
export class AuthService {
  constructor(
    private readonly erpService: ErpClass,
    private readonly jwtService: JwtService,
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

  async validatedUser(employeeLogin): Promise<any> {
    const convertedEmail = replaceEmail(employeeLogin.email);
    const employee = await this.userModel.findOne({
      email: convertedEmail,
    });
    if (isEmpty(employee)) {
      throw new Error('Employee not registered');
    }
    const isValidated = await comparePassword(
      employeeLogin.password,
      employee.password,
    );
    return isValidated ? employee : false;
  }

  async login(employeeLogin): Promise<any> {
    const employee = await this.validatedUser(employeeLogin);
    if (employee !== false) {
      console.log(employee);
      const access_token = this.jwtService.sign({
        username: employee.email,
        sub: employee._id,
      });
      return {
        access_token,
        employee,
      };
    } else {
      throw new Error('Invalid login details');
    }
  }
}
