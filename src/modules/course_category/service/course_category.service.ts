import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { COURSE_CATEGORY } from 'src/common';
import { isEmpty } from 'lodash';
import { CreateCourseCategory } from '../dto/create_course_category.dto';
import { CourseCategoryDocument } from '../schema/course_category.schema';

@Injectable()
export class CourseCategoryService {
  constructor(
    @InjectModel(COURSE_CATEGORY)
    private readonly courseCategory: Model<CourseCategoryDocument>,
  ) {}
  public async createCourseCategory(
    courseDto: CreateCourseCategory,
  ): Promise<CourseCategoryDocument> {
    const check = await this.courseCategory.findOne({ name: courseDto.name });
    if (isEmpty(check)) {
      return await this.courseCategory.create(courseDto);
    } else {
      throw new Error(`Course [${courseDto.name}] already exist`);
    }
  }
  async updateCourseCategory(
    id: string,
    course: CourseCategoryDocument,
  ): Promise<CourseCategoryDocument> {
    const payload = await this.courseCategory.findOneAndUpdate(
      { _id: id },
      { $set: course },
      { upsert: true, new: true },
    );
    return payload;
  }

  async deleteCourseCategory(id: string): Promise<CourseCategoryDocument> {
    return await this.courseCategory.findByIdAndUpdate(id, {
      is_deleted: true,
      deleted_at: new Date(),
    });
  }
  async getAllCourseCategory(): Promise<CourseCategoryDocument[]> {
    return await this.courseCategory.find({ is_deleted: false });
  }
  async getCourseCategoryById(id: string): Promise<CourseCategoryDocument> {
    return await this.courseCategory.findById(id);
  }
  async getCourseByTitle(name: string): Promise<CourseCategoryDocument> {
    return await this.courseCategory.findOne({ name: name });
  }
}
