import { Department, Designation, Employee, Grade } from "./api-response";

export interface ProfileInfoField {
  id: string;
  label: string;
  key: string;
  value: string;
  options?: Department[] | Employee[] | Grade | Designation;
  optionsType?:
    | "department"
    | "employee"
    | "grade"
    | "designation"
    | "joiningDate"
    | "dob"
    | "endingDate";
}
