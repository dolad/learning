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
import { OptionService } from '../service/option.service';
import { CreateOptionDto } from '../dto/option.dto';

@ApiBearerAuth()
@Controller('option')
@ApiTags('Option')
export class OptionController {
  constructor(
    private responseService: ResponseService,
    private readonly optionService: OptionService,
  ) {}

  @ApiResponse({ status: 201, description: 'Successfully Created' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @Post(':question_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard)
  public async createCourse(
    @Param('question_id') question_id: string,
    @Body() optionDto: CreateOptionDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const option = await this.optionService.createOption(
        question_id,
        optionDto,
      );
      return this.responseService.json(
        res,
        201,
        'Option created Successfully',
        option,
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
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getSingleModules(@Param('id') id: string, @Res() res: Response) {
    try {
      const response = await this.optionService.getOptionById(id);
      if (!response) {
        throw new HttpException(
          `No Option with id ${id}`,
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
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      const response = await this.optionService.deleteOption(id);
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
