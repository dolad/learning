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
import { AssesmentService } from '../service/assesment.service';
import { CreateAssesmentDto } from '../dto/create-assesment.dto';
import { UpdateAssesmentDto } from '../dto/update-assesment.dto';
import { ResponseService } from 'src/shared/response.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { Response } from 'express';

@ApiBearerAuth()
@Controller('assesment')
@ApiTags('Assessment')
export class AssesmentController {
  constructor(
    private readonly assesmentService: AssesmentService,
    private readonly responseService: ResponseService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 201, description: 'Successfully Processed' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createAssesmentDto: CreateAssesmentDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const assessment = await this.assesmentService.createAssessment(
        createAssesmentDto,
      );
      return this.responseService.json(
        res,
        201,
        'Assessment created Successfully',
        assessment,
      );
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Assessment Successfully retreived',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Res() res: Response) {
    try {
      const ass = await this.assesmentService.findAll();
      return this.responseService.json(
        res,
        200,
        'Assessments retrieved successfully',
        ass,
      );
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<any> {
    try {
      const ass = await this.assesmentService.findOne(id);
      if (!ass) {
        throw new HttpException(
          `No assesment with id ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return this.responseService.json(
        res,
        200,
        'Assesment retrieved successfully',
        ass,
      );
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAssesmentDto: UpdateAssesmentDto,
    @Res() res: Response,
  ) {
    try {
      const ass = await this.assesmentService.update(id, updateAssesmentDto);
      if (!ass) {
        throw new HttpException(
          `No assesment with id ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return this.responseService.json(
        res,
        200,
        'Assesment updated successfully',
        ass,
      );
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response): Promise<any> {
    try {
      const ass = await this.assesmentService.remove(id);

      if (!ass) {
        throw new HttpException(
          `No Course with id ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }

      return this.responseService.json(res, 201, 'Deleted successfully', ass);
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }
}
