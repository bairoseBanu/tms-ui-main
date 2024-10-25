import * as Yup from "yup";

export const EmployeeProofValidationSchema = Yup.object({
  employeeId: Yup.string().required("Required"),
  docType: Yup.string().required("Required"),
  noOfDocs: Yup.number().required("required"),
  niNumber: Yup.string().optional(),
  brpDoc: Yup.mixed().optional(),
  brpNumber: Yup.string().optional(),
  brpExpiry: Yup.date().optional(),
  addressDoc: Yup.mixed().optional(),
  addressLineOne: Yup.string().optional(),
  addressLineTwo: Yup.string().optional(),
  postCode: Yup.string().optional(),
  passportDoc: Yup.mixed().optional(),
  passportNumber: Yup.string().optional(),
  passportExpiry: Yup.date().optional(),
  otherProofDoc: Yup.mixed().optional(),
  otherProofExpiry: Yup.date().optional(),
  otherProofNumber: Yup.string().optional(),
});
