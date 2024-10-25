import { useFormikContext } from "formik";
import MDBox from "./MDBox";
import { Box } from "@mui/material";
import MDTypography from "./MDTypography";
import TMSInput from "./TMSInput";
import MDButton from "./MDButton";
import SendIcon from "@mui/icons-material/Send";
import FormikWrapper from "./FormikWrapper";
import TMSDropdown from "./TMSDropdown";
import { useAppData } from "hooks/useAppData";
import TMSLoader from "./TMSLoader";
import { formatEmployeeOptions } from "lib/formatDropdownOptions";
import { deptValidationSchema } from "validations/department-validation";
import { DepartmentValues } from "types/api-response";
import { FC } from "react";

const initialValues = {
  name: "",
  code: "",
  manager: "",
  branchId: "",
};

const Form = () => {
  const {
    appData: { employees, currentBranch },
    isAppDataLoading,
  } = useAppData();

  const { setFieldValue } = useFormikContext();
  const handleDropdownChange = (name: string, value: string) => {
    setFieldValue(name, value);
    // Adding Current Branch for now by default
    setFieldValue("branchId", currentBranch.id);
  };
  if (isAppDataLoading) {
    return <TMSLoader />;
  }
  const employeeOptions = formatEmployeeOptions(employees);
  return (
    <MDBox p={3} pt={0} bgcolor={"info"}>
      <Box mx={2} mt={-3} mb={1} textAlign={"center"}>
        <MDTypography my={1.5} variant={"h4"}>
          Create a new Department
        </MDTypography>
      </Box>

      <TMSInput
        id="dept-name"
        label="Department Name"
        name="name"
        variant="outlined"
        fullWidth
      />
      <TMSInput
        id="dept-code"
        label="Department Code"
        name="code"
        variant="outlined"
        fullWidth
      />

      <TMSDropdown
        options={employeeOptions}
        label="Manager"
        name="manager"
        width="100%"
        onInputChange={handleDropdownChange}
      />

      <Box mt={4} mb={1}>
        <MDButton
          variant="contained"
          fullWidth
          endIcon={<SendIcon />}
          color="info"
          type="submit"
        >
          Create Department
        </MDButton>
      </Box>
    </MDBox>
  );
};

interface Props {
  onSubmitForm: (values: DepartmentValues) => void;
}
const AddDepartment: FC<Props> = ({ onSubmitForm }) => {
  const handleSubmit = async (values: DepartmentValues) => {
    onSubmitForm(values);
  };
  return (
    <>
      <FormikWrapper
        initialValues={initialValues}
        validationSchema={deptValidationSchema}
        onSubmit={handleSubmit}
        children={<Form />}
      />
    </>
  );
};

export default AddDepartment;
