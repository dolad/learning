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
  UploadedFile,
  UseInterceptors,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { ResponseService } from 'src/shared/response.service';
import { Response } from 'express';
import { isEmpty } from 'lodash';
import { LectureService } from '../service/lecture.service';
import { CreateLectureDto } from '../dto/createLectureDto';
import { Express } from 'express';
import { CloudinaryService } from '../service/cloudinery.service';
@ApiBearerAuth()
@Controller('lecture')
@ApiTags('Lectures')
export class LectureController {
  constructor(
    private responseService: ResponseService,
    private readonly lectureService: LectureService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post('test')
  async test(@Body() test: string): Promise<any> {
    return test;
    // try {
    //   const result = await this.cloudinaryService.uploadImage(file);
    //   return this.responseService.json(
    //     res,
    //     201,
    //     'Video successfully uploaded Successfully',
    //     result,
    //   );
    // } catch (error) {
    //   return this.responseService.json(res, error);
    // }
  }

  @Post('/:course_module_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponse({ status: 201, description: 'Successfully Created' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @UseGuards(JwtAuthGuard)
  public async createCourse(
    @Param('course_module_id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() createLecture: CreateLectureDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const modules = await this.lectureService.createLectures(
        id,
        file,
        createLecture,
      );
      return this.responseService.json(
        res,
        201,
        'Lecture created Successfully',
        modules,
      );
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }

  @ApiResponse({ status: 200, description: 'Lectures Successfully retreived' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard)
  @Get('')
  async getAllCourse(@Res() res: Response) {
    try {
      const lectures = await this.lectureService.getAllLectures();
      if (isEmpty(lectures)) {
        return this.responseService.json(res, 404, 'No modules found');
      }
      return this.responseService.json(
        res,
        200,
        'Lectures retrieved successfully',
        lectures,
      );
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }
  @ApiResponse({ status: 200, description: 'Lectures Retrieved Successfully' })
  @ApiResponse({
    status: 404,
    description: "Couldn'nt retrieve lecture with this id",
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getSinglePlan(@Param('id') id: string, @Res() res: Response) {
    try {
      const response = await this.lectureService.getLectureById(id);
      if (!response) {
        throw new HttpException(
          `No Lectures with id ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return this.responseService.json(
        res,
        201,
        'Lectures retrieved successfully',
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
  async updatePlan(
    @Body() course: CreateLectureDto,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    try {
      const response = await this.lectureService.updatelecture(id, course);
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
  async deleteLecture(@Param('id') id: string, @Res() res: Response) {
    try {
      const response = await this.lectureService.deleteLecture(id);
      if (!response) {
        throw new HttpException(
          `No Lecture Module with id ${id}`,
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
      const response = await this.lectureService.getLectureByTitle(title);
      if (!response) {
        throw new HttpException(
          `No Lecture with id ${title}`,
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
