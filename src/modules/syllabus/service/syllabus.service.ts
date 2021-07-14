import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SYLLABUS } from 'src/common';
import { createSyllabusDto } from '../dto/create-syllabus.dto';
import { ISyllabus } from '../interface/syllabus.interface';
import { isEmpty } from 'lodash';
import { CourseService } from 'src/modules/course/service/course.service';

@Injectable()
export class SyllabusService {
  constructor(
    @InjectModel(SYLLABUS)
    private readonly syllabusModel: Model<ISyllabus>,
    private readonly courseService: CourseService,
  ) {}
  public async createSyllabus(
    course_id: any,
    courseDto: createSyllabusDto,
  ): Promise<ISyllabus> {
    const checkCourse = await this.courseService.getCourseById(course_id);
    if (isEmpty(checkCourse))
      throw new Error(`Course with id [${course_id}] doesn't already exist`);
    const check = await this.syllabusModel.findOne({ title: courseDto.title });
    if (isEmpty(check)) {
      const syllabus = await new this.syllabusModel(courseDto);
      syllabus.course = course_id;
      const update = {
        $push: { syllabus: syllabus._id },
      };
      const filter = { _id: course_id };
      const updatedCourseModule = await this.courseService.updateCourseModule(
        filter,
        update,
      );
      await syllabus.save();
      return updatedCourseModule;
    } else {
      throw new Error(`Syllabus [${courseDto.title}] already exist`);
    }
  }
  async updateSyllabus(
    id: string,
    course: createSyllabusDto,
  ): Promise<ISyllabus> {
    const payload = await this.syllabusModel.findOneAndUpdate(
      { _id: id },
      { $set: course },
      { upsert: true, new: true },
    );
    return payload;
  }
  async deleteSyllabus(id: string): Promise<ISyllabus> {
    return await this.syllabusModel.findByIdAndUpdate(id, {
      is_deleted: true,
      deleted_at: new Date(),
    });
  }
  async getAllSyllabus(): Promise<ISyllabus[]> {
    return await this.syllabusModel
      .find({ is_deleted: false })
      .populate('lectures');
  }
  async getSyllabusById(course_id: string): Promise<ISyllabus> {
    return await this.syllabusModel.findById(course_id);
  }
  async getSyllabusByTitle(title: string): Promise<ISyllabus> {
    return await this.syllabusModel.findOne({ title: title });
  }
  async updateLecture(filter: any, update: any): Promise<any> {
    const option = { upsert: true, new: true };
    return await this.syllabusModel
      .findOneAndUpdate(filter, update, option)
      .populate('lectures');
  }
}
