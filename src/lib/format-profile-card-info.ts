import { Employee, RtwDoc } from "types/api-response";
import { ProfileInfoField } from "types/profile-info-field";
import { profileOneValidationSchema } from "validations/profile-one-validation";
import { profileThreeValidationSchema } from "validations/profile-three-validation";
import { profileTwoValidationSchema } from "validations/profile-two-validation";
interface Props {
  employee?: Employee;
  deptName?: string;
  manager?: string;
  hr?: string;
  profileType: number;
  rtw?: RtwDoc;
  paygradeName?: string;
  designationName?: string;
}
export const formatBasicInfo = ({
  employee,
  deptName = "",
  manager = "",
  hr = "",
  profileType,
  rtw,
  paygradeName = "",
  designationName = "",
}: Props) => {
  console.log({ rtw });

  let profileInfoFields: ProfileInfoField[] = [];
  let validationSchema;

  if (profileType === 1 && employee) {
    validationSchema = profileOneValidationSchema;
    profileInfoFields = [
      {
        id: employee?.firstName,
        label: "First Name",
        key: "firstName",
        value: employee?.firstName,
      },
      {
        id: employee?.lastName,
        label: "Last Name",
        key: "lastName",
        value: employee?.lastName,
      },
      {
        id: employee?.phone,
        label: "Mobile No",
        key: "phone",
        value: employee?.phone,
        // optionsType: "designation",
      },
      {
        id: employee?.dob,
        label: "Date of Birth",
        key: "dob",
        value:
          employee?.dob?.split("T")[0] ||
          new Date().toISOString().split("T")[0],
        optionsType: "dob",
      },
      // {
      //   id: "Ni",
      //   label: "NI number",
      //   key: "ni",
      //   value: "ni",
      //   // optionsType: "department",
      // },
      // {
      //   id: "passport",
      //   label: "Passport No",
      //   key: "passportNumber",
      //   value: "XXXXX",
      //   // optionsType: "department",
      // },
      {
        id: employee?.email,
        label: "Email",
        key: "email",
        value: employee?.email,
        // optionsType: "department",
      },
      {
        id: employee?.joiningDate,
        label: "Joining Date",
        key: "joiningDate",
        value: employee?.joiningDate.split("T")[0],
        optionsType: "joiningDate",
      },
    ];
    if (employee.isActive === false && employee.endingDate) {
      profileInfoFields.push({
        id: employee?.endingDate,
        label: "Ending Date",
        key: "endingDate",
        value: employee?.endingDate.split("T")[0],
        optionsType: "endingDate",
      });
    }
  }
  if (profileType === 2 && employee) {
    validationSchema = profileTwoValidationSchema;
    profileInfoFields = [
      {
        id: employee?.grade,
        label: "Grade",
        key: "grade",
        value: paygradeName,
        optionsType: "grade",
      },
      {
        id: employee?.designation,
        label: "Designation",
        key: "designation",
        value: designationName,
        optionsType: "designation",
      },
      {
        id: employee?.deptId,
        label: "Department",
        key: "deptId",
        value: deptName,
        optionsType: "department",
      },
      {
        id: employee?.manager,
        label: "Reporting to",
        key: "manager",
        value: manager,
        optionsType: "employee",
      },
      {
        id: employee?.hr,
        label: "HR",
        key: "hr",
        value: hr,
        optionsType: "employee",
      },
      {
        id: employee?.workingHours,
        label: "Working Hours",
        key: "workingHours",
        value: employee?.workingHours,
      },
      {
        id: employee?.noOfHolidays,
        label: "No of Holidays",
        key: "noOfHolidays",
        value: employee?.noOfHolidays,
        // optionsType: "joiningDate",
      },
    ];
  }
  if (profileType === 3 && rtw) {
    validationSchema = profileThreeValidationSchema;
    profileInfoFields = [
      {
        id: rtw?.niNumber,
        label: "NI Number",
        key: "niNumber",
        value: rtw?.niNumber || "XXXX",
      },
      {
        id: rtw?.passportNumber,
        label: "Passport Number",
        key: "passportNumber",
        value: rtw?.passportNumber || "XXXX",
      },
      {
        id: rtw?.passportExpiry,
        label: "Passport Expiry",
        key: "passportExpiry",
        value: rtw?.passportExpiry?.split("T")[0] || "XXXX",
      },
      {
        id: rtw?.brpNumber,
        label: "Brp Number",
        key: "brpNumber",
        value: rtw?.brpNumber || "XXXX",
      },
      {
        id: rtw?.brpExpiry,
        label: "Brp Expiry",
        key: "brpExpiry",
        value: rtw?.brpExpiry?.split("T")[0] || "XXXX",
      },
      {
        id: rtw?.addressLineOne,
        label: "Address Line One",
        key: "addressLineOne",
        value: rtw?.addressLineOne || "XXXX",
      },
      {
        id: rtw?.addressLineTwo,
        label: "Address Line Two",
        key: "addressLineTwo",
        value: rtw?.addressLineTwo || "XXXX",
      },
      {
        id: rtw?.postCode,
        label: "Post Code",
        key: "postCode",
        value: rtw?.postCode || "XXXX",
      },
    ];
  }

  return { profileInfoFields, validationSchema };
};
