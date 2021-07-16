import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LECTURES } from 'src/common';
import { CreateLectureDto } from '../dto/createLectureDto';
import { isEmpty } from 'lodash';
import { ILecture } from '../interface/lecture.interface';
import { SyllabusService } from 'src/modules/syllabus/service/syllabus.service';
import { CloudinaryService } from './cloudinery.service';
@Injectable()
export class LectureService {
  constructor(
    @InjectModel(LECTURES)
    private readonly lectureModel: Model<ILecture>,
    private readonly syllabusService: SyllabusService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  public async createLectures(
    module_id: string,
    file,
    lectureDto: CreateLectureDto,
  ): Promise<ILecture> {
    // should be able to upload doc of type of pdf,docx, ppt
    // deactivate assesment
    // author module
    // progress of the lecture
    // user course progress
    // list of user enrolled

    const checkModule = await this.syllabusService.getSyllabusById(module_id);
    if (isEmpty(checkModule))
      throw new Error(`Module with id [${module_id}] doesn't already exist`);
    const checkLectures = await this.lectureModel.findOne({
      title: lectureDto.title,
    });

    // for uploading
    if (!lectureDto.video_url && file) {
      const response = await this.cloudinaryService.uploadImage(file);
      lectureDto.video_url = response.secure_url;
      if (response.secure_url) {
        if (!isEmpty(checkLectures)) {
          throw new Error(`Lecture [${lectureDto.title}] already exist`);
        }
        return await this.createHelper(lectureDto, module_id);
      }
    }
    // for youtube link
    if (lectureDto.video_url) {
      if (!isEmpty(checkLectures)) {
        throw new Error(`Lecture [${lectureDto.title}] already exist`);
      }
      return await this.createHelper(lectureDto, module_id);
    }
  }

  private async createHelper(payload: any, module_id): Promise<ILecture> {
    const lecture = await this.lectureModel.create(payload);
    const update = {
      $push: { lectures: lecture._id },
    };
    const filter = { _id: module_id };
    const updatedCourseModule = await this.syllabusService.updateLecture(
      filter,
      update,
    );
    return updatedCourseModule;
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
