import {
  Body,
  Res,
  Req,
  Param,
  Controller,
  UseGuards,
  Post,
  Get,
  Patch,
  Delete,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';
import { ResponseService } from 'src/shared/response.service';
import { UserService } from '../service/users.service';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { AuthUserDecorator } from '../decorator/user.decorator';
import { UserRoles } from 'src/common';
import { Roles } from '../decorator/roles.decorator';
import { RolesGuard } from '../roles.guard';
import { MakeAdmin } from '../dto/user.dto';
@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly responseService: ResponseService,
  ) {}

  @Post('make-admin')
  @Roles(UserRoles.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async makeAdmin(
    @Body() email: MakeAdmin,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const user = await this.userService.makeAdmin(email.email);
      if (!user) {
        throw new HttpException(
          `No assesment with id ${email.email}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return this.responseService.json(
        res,
        200,
        'User profile updated successfully',
        user,
      );
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }

  @Get('assesment')
  @ApiResponse({
    status: 200,
    description: 'Users Assesment retreived',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard)
  async authUserAssesment(
    @AuthUserDecorator() authUser: any,
    @Req() req,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const user = await this.userService.findAndFilterWithAssesment(
        authUser.userId,
        req.query,
      );
      if (!user) {
        throw new HttpException(`No user with id`, HttpStatus.NOT_FOUND);
      }
      return this.responseService.json(
        res,
        200,
        'user retrieved successfully',
        user,
      );
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }

  @Get('me')
  @ApiResponse({
    status: 200,
    description: 'Users Successfully retreived',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard)
  async authUser(
    @AuthUserDecorator() authUser: any,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const user = await this.userService.findOne(authUser.userId);
      if (!user) {
        throw new HttpException(`No user with id`, HttpStatus.NOT_FOUND);
      }
      return this.responseService.json(
        res,
        200,
        'user retrieved successfully',
        user,
      );
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }

  @Get('')
  @ApiResponse({ status: 200, description: 'Successfully tested' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @UseGuards(JwtAuthGuard)
  async getAllUsers(@Res() res: Response, @Req() req): Promise<any> {
    try {
      const users = await this.userService.findAll(req.query);
      return this.responseService.json(
        res,
        201,
        'User retrived Successfully',
        users,
      );
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Users Successfully retreived',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<any> {
    try {
      const user = await this.userService.findOne(id);
      if (!user) {
        throw new HttpException(`No user with id ${id}`, HttpStatus.NOT_FOUND);
      }
      return this.responseService.json(
        res,
        200,
        'user retrieved successfully',
        user,
      );
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }
}
