import { Department } from './department';

export class Employee {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  dob: Date;
  email: string;
  mobile: string;
  department: Department;
}
