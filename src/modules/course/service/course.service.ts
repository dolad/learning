import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { COURSE } from 'src/common';
import { CreateCourseDto } from '../dto/course.dto';
import { ICourse } from '../interface/course.interface';
import { isEmpty } from 'lodash';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(COURSE)
    private readonly courseModel: Model<ICourse>,
  ) {}
  public async createCourse(courseDto: CreateCourseDto): Promise<ICourse> {
    const check = await this.courseModel.findOne({ title: courseDto.title });
    if (isEmpty(check)) {
      return await this.courseModel.create(courseDto);
    } else {
      throw new Error(`Course [${courseDto.title}] already exist`);
    }
  }
  async updateCourse(id: string, course: CreateCourseDto): Promise<ICourse> {
    const payload = await this.courseModel.findOneAndUpdate(
      { _id: id },
      { $set: course },
      { upsert: true, new: true },
    );
    return payload;
  }

  async deleteCourse(id: string): Promise<ICourse> {
    return await this.courseModel.findByIdAndUpdate(id, {
      is_deleted: true,
      deleted_at: new Date(),
    });
  }
  async getAllCourse(): Promise<ICourse[]> {
    return await this.courseModel.find({ is_deleted: false });
  }
  async getCourseById(plan_id: string): Promise<ICourse> {
    return await this.courseModel.findById(plan_id);
  }
  async getCourseByTitle(title: string): Promise<ICourse> {
    return await this.courseModel.findOne({ title: title });
  }
  async updateCourseModule(filter: any, update: any): Promise<any> {
    const option = { upsert: true, new: true };
    return await this.courseModel
      .findOneAndUpdate(filter, update, option)
      .populate('course_modules');
  }
}
