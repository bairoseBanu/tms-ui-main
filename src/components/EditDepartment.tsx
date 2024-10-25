import { useFormikContext } from "formik";
import MDBox from "./MDBox";
import { Box } from "@mui/material";
import MDTypography from "./MDTypography";
import MDButton from "./MDButton";
import SendIcon from "@mui/icons-material/Send";
import FormikWrapper from "./FormikWrapper";
import TMSDropdown from "./TMSDropdown";
import { useAppData } from "hooks/useAppData";
import TMSLoader from "./TMSLoader";
import {
  formatDeptOptions,
  formatEmployeeOptions,
} from "lib/formatDropdownOptions";
import colors from "assets/theme/base/colors";
import { deptValidationSchema } from "validations/department-validation";
import { Department, DepartmentValues, Employee } from "types/api-response";
import { FC, useState } from "react";
import MDInput from "./MDInput";

const initialValues = {
  deptId: "",
  name: "",
  code: "",
  manager: "",
  branchId: "",
};

interface FormProps {
  departments: Department[];
  employees: Employee[];
  branchId: string;
}
const Form: FC<FormProps> = ({ departments, employees, branchId }) => {
  const [selectedDept, setSelectedDept] = useState<{
    dept: Department;
    option: { id: string; label: string; value: string };
    employeeOption: { id: string; label: string; value: string };
  }>();
  const [name, setName] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const employeeOptions = formatEmployeeOptions(employees);
  const departmentOptions = formatDeptOptions(departments);
  const { setFieldValue } = useFormikContext<DepartmentValues>();
  const handleDepartmentIdChange = (
    name: string,
    value: string,
    id: string
  ) => {
    setFieldValue(name, value);
    const departmentOption = departmentOptions.find(
      (option) => option.id === id
    );
    const dept = departments.find((dep) => dep.id === id);
    const employeeOption = employeeOptions.find((option) => {
      return option.id === dept.manager;
    });

    setSelectedDept({ dept, option: departmentOption, employeeOption });
    setCode(dept.code);
    setName(dept.name);
    setFieldValue("code", dept.code);
    setFieldValue("name", dept.name);
    setFieldValue("manager", dept.manager);
    setFieldValue("branchId", dept.branchId);
    setFieldValue("deptId", dept.id);
  };

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
    setFieldValue("code", event.target.value);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setFieldValue("name", event.target.value);
  };

  const handleDropdownChange = (name: string, value: string) => {
    setFieldValue(name, value);
    // Adding Current Branch for now by default
    setFieldValue("branchId", branchId);
  };

  return (
    <MDBox p={3} pt={0} bgcolor={"info"}>
      <Box mx={2} mt={-3} mb={1} textAlign={"center"}>
        <MDTypography my={1.5} variant={"h4"}>
          Edit an existing Department
        </MDTypography>
      </Box>
      <TMSDropdown
        options={departmentOptions}
        label="Department Name"
        name="deptId"
        width="100%"
        onInputChange={handleDepartmentIdChange}
      />

      {selectedDept && (
        <>
          <MDBox mb={2}>
            <MDInput
              sx={{
                backgroundColor: colors.background.default,
                borderRadius: "5px",
              }}
              variant="outlined"
              value={name}
              onChange={handleNameChange}
              fullWidth
              label={"Department New Name"}
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              sx={{
                backgroundColor: colors.background.default,
                borderRadius: "5px",
              }}
              variant="outlined"
              value={code}
              onChange={handleCodeChange}
              fullWidth
              label={"Department Code"}
            />
          </MDBox>
          <TMSDropdown
            options={employeeOptions}
            label="Manager"
            name="manager"
            width="100%"
            onInputChange={handleDropdownChange}
            defaultValue={selectedDept.employeeOption}
          />
        </>
      )}
      <Box mt={4} mb={1}>
        <MDButton
          variant="contained"
          fullWidth
          endIcon={<SendIcon />}
          color="info"
          type="submit"
        >
          Edit Department
        </MDButton>
      </Box>
    </MDBox>
  );
};

interface Props {
  onSubmitForm: (values: DepartmentValues) => void;
}
const EditDepartment: FC<Props> = ({ onSubmitForm }) => {
  const {
    appData: { employees, currentBranch, departments },
    isAppDataLoading,
  } = useAppData();
  const handleSubmit = async (values: DepartmentValues) => {
    onSubmitForm(values);
  };

  if (isAppDataLoading) {
    return <TMSLoader />;
  }
  return (
    <>
      <FormikWrapper
        initialValues={initialValues}
        validationSchema={deptValidationSchema}
        onSubmit={handleSubmit}
        children={
          <Form
            employees={employees}
            departments={departments}
            branchId={currentBranch.id}
          />
        }
      />
    </>
  );
};

export default EditDepartment;
