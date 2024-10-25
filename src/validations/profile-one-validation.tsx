import * as Yup from "yup";
export const profileOneValidationSchema = Yup.object({
  firstName: Yup.string().nullable(),
  lastName: Yup.string().nullable(),
  phone: Yup.string().nullable(),
  dob: Yup.string().nullable(),
  email: Yup.string().nullable(),
  joiningDate: Yup.string().nullable(),
  endingDate: Yup.string().nullable(),
});
