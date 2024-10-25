import * as Yup from "yup";

export const employeeValidationSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  email: Yup.string().email("Email Must be valid").required("Required"),
  employeeCode: Yup.string().required("Required"),
  deptId: Yup.string().required("Required"),
  designation: Yup.string().required("Required"),
  manager: Yup.string().required("Required"),
  hr: Yup.string().required("Required"),
  workingHours: Yup.string().required("Required"),
  noOfHolidays: Yup.string().required("Required"),
  isManager: Yup.boolean(),
  joiningDate: Yup.date().required("required"),
  dob: Yup.date().required("required"),
  grade: Yup.string().required("Required"),
  // team: Yup.string()
});
