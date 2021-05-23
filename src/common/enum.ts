export enum UserRoles {
  SuperAdmin = 'super-admin',
  Admin = 'admin',
  User = 'user',
}

export enum UserTypes {
  Employee = 'employee',
  Admin = 'admin',
}

export enum AssesmentStatus {
  Active = 'active',
  Completed = 'completed',
  Missed = 'missed',
  Inactive = 'inactive',
}

export enum CourseStatus {
  Active = 'active',
  Completed = 'completed',
  Inactive = 'inactive',
}

export enum CourseType {
  Enrolled = 'enrolled',
  Assigned = 'assigned',
}

export enum AssesmentType {
  General = 'general',
  Selected = 'selected',
}

export const UserRolesEnums = Object.values(UserRoles);
export const UserTypesEnums = Object.values(UserTypes);
export const AssesmentStatusEnum = Object.values(AssesmentStatus);
export const AssesmentTypeEnums = Object.values(AssesmentType);
export const CourseTypeEnum = Object.values(CourseType);
export const CourseStatusEnum = Object.values(CourseStatus);
