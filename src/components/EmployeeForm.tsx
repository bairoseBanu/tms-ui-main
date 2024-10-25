import FormikWrapper from "./FormikWrapper";
import MDBox from "./MDBox";
import MDButton from "./MDButton";
import MDTypography from "./MDTypography";
import TMSInput from "./TMSInput";
import SendIcon from "@mui/icons-material/Send";
import { EmployeeValues } from "types/employee-values";
import TMSDropdown from "./TMSDropdown";
import { employeeValidationSchema } from "validations/employee-validation";
import { AlertProps } from "@mui/material";
import { useFormikContext } from "formik";
import { FC, useEffect, useState } from "react";
import { newEmployee } from "apis/employee.api";
import { useNavigate } from "react-router-dom";
import {
  formatDeptOptions,
  formatDesignationDocOptions,
  formatEmployeeOptions,
  formatPaygradeOptions,
} from "lib/formatDropdownOptions";
import { useAppData } from "hooks/useAppData";
import MDDatePicker from "./MDDatePicker";
import TMSSnackbar from "./TMSSnackbar";
import TMSCheckBox from "./TMSCheckbox";

const initialValues: EmployeeValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  deptId: "",
  designation: "",
  employeeCode: "",
  manager: "",
  hr: "",
  workingHours: "",
  noOfHolidays: "",
  isManager: false,
  joiningDate: new Date().toISOString(),
  grade: "",
  dob: new Date().toISOString(),
  //   team: "",
};
type Options = {
  id: string;
  label: string;
  value: string;
};
interface FormProps {
  designationOptions: Options[];
  employeeOptions: Options[];
  departmentOptions: Options[];
  gradeOptions: Options[];
}

const Form: FC<FormProps> = ({
  departmentOptions,
  designationOptions,
  employeeOptions,
  gradeOptions,
}) => {
  const { setFieldValue } = useFormikContext<EmployeeValues>();
  const [isManagerChecked, setIsManagerChecked] = useState<boolean>(false);
  // const [joiningDate, setJoiningDate] = useState(new Date().toISOString());
  const handleIsManager = (_event: unknown, checked: boolean) => {
    setIsManagerChecked(checked);
    setFieldValue("isManager", checked);
  };
  const handleJoiningDate = (date: Date[]) => {
    setFieldValue("joiningDate", new Date(date[0]).toISOString().split("T")[0]);
  };
  const handleDob = (date: Date[]) => {
    setFieldValue("dob", new Date(date[0]).toISOString().split("T")[0]);
  };
  const handleDropdownChange = (name: string, value: string) => {
    setFieldValue(name, value);
  };
  // const handleGradeChange = (name: string, value: string) => {
  //   setFieldValue(name, value);
  // };
  return (
    <MDBox p={5} pt={0} bgcolor={"info"}>
      <MDBox mx={2} mt={-3} mb={1} textAlign={"center"}>
        <MDTypography my={1.5} variant={"h4"}>
          Create Employee
        </MDTypography>
      </MDBox>
      <MDBox display={"flex"} justifyContent={"space-between"} gap={2}>
        <TMSInput
          id="first-name"
          label="First Name"
          name="firstName"
          variant="outlined"
          fullWidth
        />
        <TMSInput
          id="last-name"
          label="Last Name"
          name="lastName"
          variant="outlined"
          fullWidth
        />
      </MDBox>

      <TMSInput
        id="phone"
        label="Phone"
        name="phone"
        variant="outlined"
        fullWidth
      />
      <MDBox display={"flex"} justifyContent={"space-between"} gap={2}>
        <TMSInput
          id="employeeCode"
          label="Employee Code"
          name="employeeCode"
          variant="outlined"
          fullWidth
          width="50%"
        />
        <TMSInput
          id="email"
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          width="50%"
        />
      </MDBox>

      <MDBox display={"flex"} justifyContent={"space-between"} gap={2}>
        <TMSDropdown
          options={departmentOptions}
          label="Department"
          name="deptId"
          width="50%"
          onInputChange={handleDropdownChange}
        />
        <TMSDropdown
          options={designationOptions}
          label="Designation"
          name="designation"
          width="50%"
          onInputChange={handleDropdownChange}
        />
      </MDBox>
      <MDBox display={"flex"} justifyContent={"space-between"} gap={2}>
        <TMSDropdown
          options={employeeOptions}
          label="Manager"
          name="manager"
          width="50%"
          onInputChange={handleDropdownChange}
        />
        <TMSDropdown
          options={employeeOptions}
          label="HR"
          name="hr"
          width="50%"
          onInputChange={handleDropdownChange}
        />
      </MDBox>

      <MDBox display={"flex"} justifyContent={"space-between"} gap={2}>
        <TMSInput
          id="working-hours"
          label="Working Hours"
          name="workingHours"
          variant="outlined"
          fullWidth
        />
        <MDDatePicker
          onChange={handleJoiningDate}
          input={{
            id: "joining-date",
            label: "Date of Joining",
            name: "joiningDate",
            variant: "outlined",
            fullWidth: true,
            InputLabelProps: {
              shrink: true,
            },
            // backgroundColor: colors.background.default,
          }}
        />
      </MDBox>
      <MDBox display={"flex"} justifyContent={"space-between"} gap={2}>
        <TMSInput
          id="no-of-holidays"
          label="No of Holidays"
          name="noOfHolidays"
          variant="outlined"
          fullWidth
          width="50%"
        />
        <TMSDropdown
          options={gradeOptions}
          label="Grade"
          name="grade"
          width="50%"
          onInputChange={handleDropdownChange}
        />
      </MDBox>
      <MDBox>
        <MDDatePicker
          onChange={handleDob}
          input={{
            id: "date-of-birth",
            label: "Date of Birth",
            name: "dob",
            variant: "outlined",
            fullWidth: true,
            InputLabelProps: {
              shrink: true,
            },
            // backgroundColor: colors.background.default,
          }}
        />
      </MDBox>

      <MDBox
        pl={0.5}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <MDBox height={"100%"}>
          {/* <FormControlLabel
            onChange={handleIsManager}
            control={<BpCheckbox checkBoxProps={{ disableRipple: true }} />}
            checked={isManagerChecked}
            // label={
            //   <MDTypography fontWeight="normal" variant="subtitle2">
            //     Manager
            //   </MDTypography>
            // }
          /> */}
          <TMSCheckBox
            checkBoxProps={{ disableRipple: true }}
            label="Manager"
            id="isManager"
            onChange={handleIsManager}
            checked={isManagerChecked}
          />
        </MDBox>
      </MDBox>

      <MDBox
        sx={{
          // display: isManagerChecked ? "block" : "none",
          transitionDuration: "0.5s",
        }}
      >
        <TMSInput
          id="Teams"
          label="Team"
          name="team"
          variant="outlined"
          fullWidth
        />
      </MDBox>

      <MDBox mt={4} mb={1}>
        <MDButton
          variant="contained"
          fullWidth
          endIcon={<SendIcon />}
          color="info"
          type="submit"
        >
          Create Employee
        </MDButton>
      </MDBox>
    </MDBox>
  );
};

interface EmployeeFormProps {
  style?: { [key: string]: unknown };
}
const EmployeeForm: FC<EmployeeFormProps> = ({ style = {} }) => {
  const navigate = useNavigate();
  // const { designations, employees, departments } = useUser();
  const { appData } = useAppData();

  const {
    designations,
    employees,
    departments,
    currentBranch,
    grades,
    designationsDocs,
    paygrades,
  } = appData;

  const [designationOptions, setDesignationOptions] = useState<Options[]>([]);
  const [employeeOptions, setEmployeeOptions] = useState<Options[]>([]);
  const [departmentOptions, setDepartmentOptions] = useState<Options[]>([]);
  const [gradeOptions, setGradeOptions] = useState<Options[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertProps["severity"]>("success");
  const [snackMsg, setSnackMsg] = useState("");
  useEffect(() => {
    if (Object.keys(appData).length !== 0) {
      setDesignationOptions(formatDesignationDocOptions(designationsDocs));
      setEmployeeOptions(formatEmployeeOptions(employees));
      setDepartmentOptions(formatDeptOptions(departments));
      setGradeOptions(formatPaygradeOptions(paygrades));
    }
  }, [
    appData,
    departments,
    designations,
    designationsDocs,
    employees,
    grades,
    paygrades,
  ]);
  const onSubmit = async (values: EmployeeValues) => {
    try {
      const response = await newEmployee(values, currentBranch.id);
      if (response.status === 201) {
        setSnackbarOpen(true);
        setSnackMsg("Employee Created successfully");
        navigate("/");
      }
    } catch (e) {
      setSnackbarOpen(true);
      setSeverity("error");
      setSnackMsg("Error in Creating Employee");
      console.log("Error in new Employee", e);
    }
  };
  return (
    <MDBox sx={{ ...style }}>
      <FormikWrapper
        initialValues={initialValues}
        validationSchema={employeeValidationSchema}
        onSubmit={onSubmit}
        children={
          <Form
            departmentOptions={departmentOptions}
            designationOptions={designationOptions}
            employeeOptions={employeeOptions}
            gradeOptions={gradeOptions}
          />
        }
      />
      <TMSSnackbar
        open={snackbarOpen}
        handleClose={() => setSnackbarOpen(false)}
        message={snackMsg}
        severity={severity}
      />
    </MDBox>
  );
  // }
};

export default EmployeeForm;
