import { Address } from './address';
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
  designation: string;
  primarySkill: string;
  address: Address;
  createdAt: Date;
  updatedAt: Date;
}
