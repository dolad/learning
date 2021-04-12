import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { COURSEMODULES } from 'src/common';
import { CreateCourseModuleDto } from '../dto/create-module.dto';
import { ICourseModule } from '../interface/course_module.interface';
import { isEmpty } from 'lodash';
import { CourseService } from 'src/modules/course/service/course.service';
import { AnyARecord } from 'node:dns';

@Injectable()
export class CourseModuleService {
  constructor(
    @InjectModel(COURSEMODULES)
    private readonly courseModel: Model<ICourseModule>,
    private readonly courseService: CourseService,
  ) {}
  public async createModules(
    course_id: string,
    courseDto: CreateCourseModuleDto,
  ): Promise<ICourseModule> {
    const checkCourse = await this.courseService.getCourseById(course_id);
    if (isEmpty(checkCourse))
      throw new Error(`Course with id [${course_id}] doesn't already exist`);
    const check = await this.courseModel.findOne({ title: courseDto.title });
    if (isEmpty(check)) {
      const module = await this.courseModel.create(courseDto);
      const update = {
        $push: { course_modules: module._id },
      };
      const filter = { _id: course_id };
      const updatedCourseModule = await this.courseService.updateCourseModule(
        filter,
        update,
      );
      return updatedCourseModule;
    } else {
      throw new Error(`Course [${courseDto.title}] already exist`);
    }
  }
  async updateCourseModules(
    id: string,
    course: CreateCourseModuleDto,
  ): Promise<ICourseModule> {
    const payload = await this.courseModel.findOneAndUpdate(
      { _id: id },
      { $set: course },
      { upsert: true, new: true },
    );
    return payload;
  }
  async deleteCourseModule(id: string): Promise<ICourseModule> {
    return await this.courseModel.findByIdAndUpdate(id, {
      is_deleted: true,
      deleted_at: new Date(),
    });
  }
  async getAllCourseModule(): Promise<ICourseModule[]> {
    return await this.courseModel.find({ is_deleted: false });
  }
  async getCourseModuleById(course_id: string): Promise<ICourseModule> {
    return await this.courseModel.findById(course_id);
  }
  async getCourseModuleByTitle(title: string): Promise<ICourseModule> {
    return await this.courseModel.findOne({ title: title });
  }
}
