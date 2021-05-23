import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { USER_COURSE } from 'src/common';
import { UserCourseDocument } from '../schema/user_course.schema';
import { UserService } from './users.service';
import { CourseService } from 'src/modules/course/service/course.service';
import { isEmpty } from 'lodash';

@Injectable()
export class UserCourseService {
  constructor(
    @InjectModel(USER_COURSE)
    private readonly userCourseModel: Model<UserCourseDocument>,
    private readonly userService: UserService,
    private readonly courseService: CourseService,
  ) {}

  async enrolled(user_id, course_id: any): Promise<UserCourseDocument> {
    //   check if user has record of this collection
    const check = await this.userCourseModel.findOne({
      user_id: user_id,
      course_id: course_id,
    });
    if (isEmpty(check)) {
      return await this.userCourseModel.create({
        user_id: user_id,
        course_id: course_id,
      });
    } else {
      throw new Error(`already enrolled  already`);
    }
    return;
  }
}
