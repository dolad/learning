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

export enum AssesmentType {
  General = 'general',
  Selected = 'selected',
}

export const UserRolesEnums = Object.values(UserRoles);
export const UserTypesEnums = Object.values(UserTypes);
export const AssesmentStatusEnum = Object.values(AssesmentStatus);
export const AssesmentTypeEnums = Object.values(AssesmentType);
