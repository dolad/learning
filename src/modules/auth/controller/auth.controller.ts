import { Controller, Post, Get, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';
import { ResponseService } from 'src/shared/response.service';
import { loginEmployeeDto, registerEmployeeDto } from '../dto/employee.dto';
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly responseService: ResponseService,
  ) {}
  @ApiResponse({
    status: 200,
    description: 'Fetch successfully',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get('user/fetchErp')
  async userRegister(@Res() res: Response): Promise<any> {
    try {
      const response = await this.authService.insertEmployee();
      return this.responseService.json(
        res,
        200,
        'Fetch Successfully',
        response,
      );
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }
  @ApiResponse({
    status: 200,
    description: 'Registration successfully',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post('register')
  async registerEmployee(
    @Res() res: Response,
    @Body() login: registerEmployeeDto,
  ): Promise<any> {
    try {
      const response = await this.authService.register(login);
      return this.responseService.json(
        res,
        200,
        'Registration Successfully',
        response,
      );
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Login successfully',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post('login')
  async loginEmployee(
    @Res() res: Response,
    @Body() login: loginEmployeeDto,
  ): Promise<any> {
    try {
      const response = await this.authService.login(login);
      return this.responseService.json(
        res,
        200,
        'Fetch Successfully',
        response,
      );
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Passwrord Reset successfully',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post('resetPassword')
  async resetPassword(
    @Res() res: Response,
    @Body() login: loginEmployeeDto,
  ): Promise<any> {
    try {
      const response = await this.authService.resetPassword(login);
      return this.responseService.json(
        res,
        200,
        'Password Reset Successfully',
        response,
      );
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }
}
