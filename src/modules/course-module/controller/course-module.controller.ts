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
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { ResponseService } from 'src/shared/response.service';
import { Response } from 'express';
import { CourseModuleService } from '../service/course-module.service';
import { CreateCourseModuleDto } from '../dto/create-module.dto';
import { isEmpty } from 'lodash';

@ApiBearerAuth()
@Controller('course-module')
@ApiTags('Course-Module')
export class CourseModuleController {
  constructor(
    private responseService: ResponseService,
    private readonly courseModuleService: CourseModuleService,
  ) {}

  @Post('/:course_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 201, description: 'Successfully Created' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @UseGuards(JwtAuthGuard)
  public async createCourse(
    @Param('course_id') course_id: string,
    @Body() createModule: CreateCourseModuleDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const modules = await this.courseModuleService.createModules(
        course_id,
        createModule,
      );
      return this.responseService.json(
        res,
        201,
        'Course Modules created Successfully',
        modules,
      );
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }

  @ApiResponse({ status: 200, description: 'Modules Successfully retreived' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard)
  @Get('')
  async getAllCourse(@Res() res: Response) {
    try {
      const course = await this.courseModuleService.getAllCourseModule();
      if (isEmpty(course)) {
        return this.responseService.json(res, 404, 'No modules found');
      }
      return this.responseService.json(
        res,
        200,
        'Modules retrieved successfully',
        course,
      );
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }

  @ApiResponse({ status: 200, description: 'Modules Retrieved Successfully' })
  @ApiResponse({
    status: 404,
    description: "Couldn'nt retrieve course with id",
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getSingleModules(@Param('id') id: string, @Res() res: Response) {
    try {
      const response = await this.courseModuleService.getCourseModuleById(id);
      if (!response) {
        throw new HttpException(
          `No modules with id ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return this.responseService.json(
        res,
        201,
        'Course module retrieved successfully',
        response,
      );
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }

  @Patch('/:id')
  @ApiResponse({ status: 200, description: 'Successfully Processed' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @UseGuards(JwtAuthGuard)
  async updateModules(
    @Body() course: CreateCourseModuleDto,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    try {
      const response = await this.courseModuleService.updateCourseModules(
        id,
        course,
      );

      if (!response) {
        throw new HttpException(
          `No course model with id ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return this.responseService.json(
        res,
        201,
        'Course module updated successfully',
        response,
      );
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }

  @ApiResponse({ status: 200, description: 'Successfully Processed' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteCourseModule(@Param('id') id: string, @Res() res: Response) {
    try {
      const response = await this.courseModuleService.deleteCourseModule(id);
      if (!response) {
        throw new HttpException(
          `No Course Module with id ${id}`,
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
  async getCourseModuleByName(
    @Param('title') title: string,
    @Res() res: Response,
  ) {
    try {
      const response = await this.courseModuleService.getCourseModuleByTitle(
        title,
      );

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
