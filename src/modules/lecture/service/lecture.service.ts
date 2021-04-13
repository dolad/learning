import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LECTURES } from 'src/common';
import { CreateLectureDto } from '../dto/createLectureDto';
import { isEmpty } from 'lodash';
import { ILecture } from '../interface/lecture.interface';
import { CourseModuleService } from 'src/modules/course-module/service/course-module.service';
import { CloudinaryService } from './cloudinery.service';
@Injectable()
export class LectureService {
  constructor(
    @InjectModel(LECTURES)
    private readonly lectureModel: Model<ILecture>,
    private readonly courseModuleService: CourseModuleService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  public async createLectures(
    module_id: string,
    file,
    lectureDto: CreateLectureDto,
  ): Promise<ILecture> {
    const checkModule = await this.courseModuleService.getCourseModuleById(
      module_id,
    );

    if (isEmpty(checkModule))
      throw new Error(`Module with id [${module_id}] doesn't already exist`);
    const checkLectures = await this.lectureModel.findOne({
      title: lectureDto.title,
    });
    const response = await this.cloudinaryService.uploadImage(file);
    lectureDto.video_url = response.secure_url;
    if (response.secure_url) {
      if (isEmpty(checkLectures)) {
        const lecture = await this.lectureModel.create(lectureDto);
        const update = {
          $push: { lectures: lecture._id },
        };
        const filter = { _id: module_id };
        const updatedCourseModule = await this.courseModuleService.updateLecture(
          filter,
          update,
        );
        return updatedCourseModule;
      } else {
        throw new Error(`Lecture [${lectureDto.title}] already exist`);
      }
    }
  }
  async updatelecture(
    id: string,
    lecture: CreateLectureDto,
  ): Promise<ILecture> {
    const payload = await this.lectureModel.findOneAndUpdate(
      { _id: id },
      { $set: lecture },
      { upsert: true, new: true },
    );
    return payload;
  }
  async deleteLecture(id: string): Promise<ILecture> {
    return await this.lectureModel.findByIdAndUpdate(id, {
      is_deleted: true,
      deleted_at: new Date(),
    });
  }

  async getAllLectures(): Promise<ILecture[]> {
    return await this.lectureModel.find({ is_deleted: false });
  }

  async getLectureById(course_id: string): Promise<ILecture> {
    return await this.lectureModel.findById(course_id);
  }

  async getLectureByTitle(title: string): Promise<ILecture> {
    return await this.lectureModel.findOne({ title: title });
  }
}
