import { Document } from 'mongoose';

export interface IUser extends Document {
  id: string;
  branch: string;
  first_name?: string;
  last_name?: string;
  username: string;
  password: string;
  email: string;
  gender?: string;
  phone_no: string;
  date_of_birth?: string;
  joining_date?: string;
  department_id: string;
  role: string;
  allowed_leaves?: string;
  confirm_status?: string;
  is_admin?: boolean;
}
