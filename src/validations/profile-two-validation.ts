import * as Yup from "yup";
export const profileTwoValidationSchema = Yup.object({
  grade: Yup.string().nullable(),
  designation: Yup.string().nullable(),
  deapartment: Yup.string().nullable(),
  manager: Yup.string().nullable(),
  hr: Yup.string().nullable(),
  workingHours: Yup.string().nullable(),
  noOfHolidays: Yup.string().nullable(),
});
