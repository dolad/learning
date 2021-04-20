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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { AssesmentService } from '../service/assesment.service';
import { CreateAssesmentDto } from '../dto/create-assesment.dto';
import {
  SubmittingAssesment,
  UpdateAssesmentDto,
} from '../dto/update-assesment.dto';
import { ResponseService } from 'src/shared/response.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @ApiResponse({
    status: 200,
    description: 'Assessment Successfully retreived',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard)
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
  @ApiResponse({
    status: 200,
    description: 'Assessment Successfully Processed',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard)
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

  @Patch('activate-assesment/:id')
  @ApiResponse({
    status: 200,
    description: 'Assessment Successfully Activated',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard)
  async activateAssetment(@Param('id') id: string, @Res() res: Response) {
    try {
      const ass = await this.assesmentService.activateAssesment(id);
      if (!ass) {
        throw new HttpException(
          `No assesment with id ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return this.responseService.json(
        res,
        200,
        'Assesment activated successfully',
        ass,
      );
    } catch (error) {
      return this.responseService.json(res, error);
    }
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Assessment Successfully Processed',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard)
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

  @Post('/uploads')
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponse({ status: 201, description: 'Successfully Processed' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @UseGuards(JwtAuthGuard)
  async createViaUploads(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const assessment = await this.assesmentService.createViaExcel(file);
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

  @Patch('submit-assesment/:id')
  async submitAssesment(
    @Param('id') id: string,
    @Body() updateAssesmentDto: SubmittingAssesment,
    @Res() res: Response,
  ) {
    try {
      const ass = await this.assesmentService.submitAssesment(
        id,
        updateAssesmentDto,
      );
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
}
