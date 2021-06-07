import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER } from 'src/common';
import { IUser } from 'src/modules/users/interfaces/user.interfaces';
import { ErpClass } from './ErpService';
import { JwtService } from '@nestjs/jwt';
import { isEmpty } from 'lodash';
import { comparePassword } from 'src/util/comparePassword';
import {
  registerEmployeeDto,
  resetEmployeePasswordDto,
} from '../dto/employee.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly erpService: ErpClass,
    private readonly jwtService: JwtService,
    @InjectModel(USER)
    private readonly userModel: Model<IUser>,
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
    const employee = await this.userModel.findOne({
      email: employeeLogin.email,
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

  async register(employeeRegister: registerEmployeeDto): Promise<any> {
    const employee = await this.userModel.findOne({
      email: employeeRegister.email,
    });
    if (!isEmpty(employee)) {
      throw new Error('Employee already registered');
    }
    const hash = bcrypt.hashSync(employeeRegister.password, 10);
    const newEmployee = await this.userModel.create({
      email: employeeRegister.email,
      last_name: employeeRegister.last_name,
      first_name: employeeRegister.first_name,
      password: hash,
      department_id: employeeRegister.department,
      branch_id: employeeRegister.branch,
    });

    return newEmployee;
  }

  async resetPassword(employeeInput: resetEmployeePasswordDto): Promise<any> {
    const employee = await this.userModel.findOne({
      email: employeeInput.email,
    });
    if (isEmpty(employee)) {
      throw new Error('employee not register on this platforms');
    }
    const hash = bcrypt.hashSync(employeeInput.password, 10);
    const filter = { email: employeeInput.email };
    const update = {
      $set: {
        password: hash,
      },
    };
    const option = { upsert: true, new: true };
    await this.userModel.findOneAndUpdate(filter, update, option);
    return 'password has been updated succesfully';
  }
}
