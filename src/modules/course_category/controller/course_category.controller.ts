import {
  Body,
  Res,
  Param,
  Controller,
  UseGuards,
  Post,
  UsePipes,
  Get,
  Patch,
  Delete,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { ResponseService } from 'src/shared/response.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Response } from 'express';
import { CourseCategoryService } from '../service/course_category.service';
import { isEmpty } from 'lodash';
import { RolesGuard } from 'src/modules/users/roles.guard';
import { Roles } from 'src/modules/users/decorator/roles.decorator';
import { UserRoles } from 'src/common';
import { CreateCourseCategory } from '../dto/create_course_category.dto';
import { CourseCategoryDocument } from '../schema/course_category.schema';

@ApiBearerAuth()
@Controller('course-category')
@ApiTags('Course_Category')
export class CourseCategoryController {
  constructor(
    private readonly courseService: CourseCategoryService,
    private responseService: ResponseService,
  ) {}

  @Post('')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 201, description: 'Successfully Processed' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @Roles(UserRoles.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  public async createCourseCategory(
    @Body() createCourse: CreateCourseCategory,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const course = await this.courseService.createCourseCategory(
        createCourse,
      );
      return this.responseService.json(
        res,
        201,
        'Course created Successfully',
        course,
      );
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }

  @ApiResponse({ status: 200, description: 'Course Successfully retreived' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard)
  @Get('')
  async getAllCourse(@Res() res: Response) {
    try {
      const course = await this.courseService.getAllCourseCategory();
      if (isEmpty(course)) {
        return this.responseService.json(res, 404, 'No course found');
      }
      return this.responseService.json(
        res,
        200,
        'Course retrieved successfully',
        course,
      );
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }

  @ApiResponse({ status: 200, description: 'Course Retrieved Successfully' })
  @ApiResponse({
    status: 404,
    description: "Couldn'nt retrieve course with id",
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getSinglePlan(@Param('id') id: string, @Res() res: Response) {
    try {
      const response = await this.courseService.getCourseCategoryById(id);
      if (!response) {
        throw new HttpException(
          `No course with id ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }

      return this.responseService.json(
        res,
        201,
        'Course retrieved successfully',
        response,
      );
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }

  @Patch('admin/:id')
  @ApiResponse({ status: 200, description: 'Successfully Processed' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @Roles(UserRoles.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updatePlan(
    @Body() course: CourseCategoryDocument,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    try {
      const response = await this.courseService.updateCourseCategory(
        id,
        course,
      );

      if (!response) {
        throw new HttpException(
          `No course with id ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return this.responseService.json(
        res,
        201,
        'Course updated successfully',
        response,
      );
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }

  @ApiResponse({ status: 200, description: 'Successfully Processed' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Roles(UserRoles.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('admin/:id')
  async deleteCourse(@Param('id') id: string, @Res() res: Response) {
    try {
      const response = await this.courseService.deleteCourseCategory(id);

      if (!response) {
        throw new HttpException(
          `No Course with id ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }

      return this.responseService.json(
        res,
        201,
        'Deleted successfully',
        response,
      );
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }

  @ApiResponse({ status: 200, description: 'Successfully Processed' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard)
  @Get('/:title')
  async getCourseByName(@Param('title') title: string, @Res() res: Response) {
    try {
      const response = await this.courseService.getCourseByTitle(title);

      if (!response) {
        throw new HttpException(
          `No Course with id ${title}`,
          HttpStatus.NOT_FOUND,
        );
      }

      return this.responseService.json(
        res,
        201,
        'retrieved successfully',
        response,
      );
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }
}
