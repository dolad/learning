import {
  Body,
  Res,
  Req,
  Param,
  Controller,
  UseGuards,
  Post,
  Delete,
  Get,
  Patch,
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
import { ChangePassword, MakeAdmin, UpdateUserDTO } from '../dto/user.dto';
import { UserAssesmentService } from '../service/user_assesment.service';
import { UserCourseService } from '../service/user_course.service';
@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userAssesmentService: UserAssesmentService,
    private readonly responseService: ResponseService,
    private readonly userCourseService: UserCourseService,
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

  @Patch('reset-Password')
  async resetPassword(
    @Body() changePasswordDto: ChangePassword,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const user = await this.userService.resetPassword(changePasswordDto);
      if (!user) {
        throw new HttpException(
          `password reset was not succesful for this ${changePasswordDto.email}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return this.responseService.json(
        res,
        200,
        'User password updated successfully',
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
      const user = await this.userAssesmentService.findWithUserID(
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
      const users = await this.userService.findAllPaginate(req.query);
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

  @Post('enroll')
  @ApiResponse({
    status: 200,
    description: 'Users Successfully enrolled',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard)
  async enrolledForCourse(
    @AuthUserDecorator() authUser: any,
    @Body() course_id: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const user = await this.userCourseService.enroll(
        authUser.userId,
        course_id,
      );
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

  @Delete('unassignCourse/:course_id/:user_id')
  @ApiResponse({
    status: 200,
    description: 'Users Successfully unenrolled',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard)
  async unAssignedCourse(
    @Param() course_id: string,
    @Param() user_id: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const user = await this.userCourseService.unassignedCourse(
        user_id,
        course_id,
      );
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

  @Patch('update-profile')
  @ApiResponse({
    status: 200,
    description: 'Users Successfully updated',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @AuthUserDecorator() authUser: any,
    @Body() updateUser: UpdateUserDTO,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const user = await this.userService.updateUserProfile(
        authUser.userId,
        updateUser,
      );
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

  @Get('all/departments')
  @ApiResponse({
    status: 200,
    description: 'Departments Successfully retrieved',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getAllDepartment(@Res() res: Response): Promise<any> {
    try {
      const department = await this.userService.getDepartment();
      if (!department) {
        throw new HttpException('No department found', HttpStatus.NOT_FOUND);
      }
      return this.responseService.json(
        res,
        200,
        'department retrieved successfully',
        department,
      );
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }

  @Get('/completed-assesment/:assesment_id')
  @ApiResponse({
    status: 200,
    description: 'UserList Successfully retrieved',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async completedAssesmentUser(
    @Res() res: Response,
    @Param() assesment_id: any,
  ): Promise<any> {
    try {
      console.log(assesment_id.assesment_id);
      const users = await this.userAssesmentService.completedAssesment(
        assesment_id.assesment_id,
      );
      if (!users) {
        throw new HttpException(
          'No user has completed this assesment',
          HttpStatus.NOT_FOUND,
        );
      }
      return this.responseService.json(
        res,
        200,
        'List retrieved successfully',
        users,
      );
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }

  @Get('/uncompleted-assesment/:assesment_id')
  @ApiResponse({
    status: 200,
    description: 'Branches Successfully retrieved',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async notCompletedAssesmentUser(
    @Res() res: Response,
    @Param() assesment_id: string,
  ): Promise<any> {
    try {
      const users = await this.userAssesmentService.notAttemptedAssesment(
        assesment_id,
      );
      return this.responseService.json(
        res,
        200,
        'List retrieved successfully',
        users,
      );
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }

  @Get('all/branches')
  @ApiResponse({
    status: 200,
    description: 'Branches Successfully retrieved',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getAllBranches(@Res() res: Response): Promise<any> {
    try {
      const branches = await this.userService.getBranch();
      if (!branches) {
        throw new HttpException('No branches found', HttpStatus.NOT_FOUND);
      }
      return this.responseService.json(
        res,
        200,
        'branches retrieved successfully',
        branches,
      );
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }
}
