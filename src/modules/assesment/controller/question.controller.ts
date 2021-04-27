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
import { QuestionService } from '../service/question.service';
import { CreateQuestionDto, UpdateQuestionDto } from '../dto/question.dto';
import { isEmpty } from 'lodash';
import { Roles } from 'src/modules/users/decorator/roles.decorator';
import { RolesGuard } from 'src/modules/users/roles.guard';
import { UserRoles } from 'src/common';

@ApiBearerAuth()
@Controller('question')
@ApiTags('Question')
export class QuestionController {
  constructor(
    private responseService: ResponseService,
    private readonly questionService: QuestionService,
  ) {}

  // @Post('admin/:assessment_id')
  // @UsePipes(new ValidationPipe({ transform: true }))
  // @ApiResponse({ status: 201, description: 'Successfully Created' })
  // @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRoles.Admin)
  // public async createCourse(
  //   @Param('assessment_id') assessment_id: string,
  //   @Body() questionDto: CreateQuestionDto,
  //   @Res() res: Response,
  // ): Promise<any> {
  //   try {
  //     const question = await this.questionService.createQuestion(
  //       assessment_id,
  //       questionDto,
  //     );
  //     return this.responseService.json(
  //       res,
  //       201,
  //       'Question created Successfully',
  //       question,
  //     );
  //   } catch (error) {
  //     return this.responseService.json(res, error);
  //   }
  // }

  @ApiResponse({ status: 200, description: 'Question Successfully retreived' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard)
  @Get('')
  async findAll(@Res() res: Response) {
    try {
      const course = await this.questionService.getAllQuestion();
      if (isEmpty(course)) {
        return this.responseService.json(res, 404, 'No question found');
      }
      return this.responseService.json(
        res,
        200,
        'Question retrieved successfully',
        course,
      );
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }

  @ApiResponse({ status: 200, description: 'Question Retrieved Successfully' })
  @ApiResponse({
    status: 404,
    description: "Couldn'nt retrieve question with id",
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getSingleModules(@Param('id') id: string, @Res() res: Response) {
    try {
      const response = await this.questionService.getQuestionById(id);
      if (!response) {
        throw new HttpException(
          `No Question with id ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return this.responseService.json(
        res,
        201,
        'Question retrieved successfully',
        response,
      );
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }

  @Patch('admin/:id')
  @ApiResponse({ status: 200, description: 'Successfully Processed' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.Admin)
  async updateModules(
    @Body() course: UpdateQuestionDto,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    try {
      const response = await this.questionService.updateQuestion(id, course);
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

  @Get('assesment/:assesment_id')
  @ApiResponse({ status: 200, description: 'Successfully Retrieved' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @UseGuards(JwtAuthGuard)
  async getQuestionsByAssesment(
    @Param('assesment_id') id: string,
    @Res() res: Response,
  ) {
    try {
      const response = await this.questionService.getWithAssessmentID(id);
      if (!response) {
        throw new HttpException(
          `No assessment for this id ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return this.responseService.json(
        res,
        201,
        'Question retrieved successfully',
        response,
      );
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }

  @ApiResponse({ status: 200, description: 'Successfully Processed' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.Admin)
  @Delete('admin/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      const response = await this.questionService.deleteQuestion(id);
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
}
