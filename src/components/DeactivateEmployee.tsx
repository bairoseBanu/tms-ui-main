import { Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import FormikWrapper from "components/FormikWrapper";
import MDButton from "./MDButton";
import MDTypography from "./MDTypography";
import MDBox from "./MDBox";
import TMSDropdown from "./TMSDropdown";
import TMSLoader from "./TMSLoader";
import { useAppData } from "hooks/useAppData";
import { useFormikContext } from "formik";
import { formatEmployeeOptions } from "lib/formatDropdownOptions";
import MDDatePicker from "./MDDatePicker";
import { DeactivateEmployee as DEmpVals } from "types/deactivate-employee-values";
import { employeeDeactivateValidationSchema } from "validations/employee-deactivate-validation";
import { deActivateEmployee } from "apis/employee.api";

const initialValues: DEmpVals = {
  employeeId: "",
  endingDate: new Date().toISOString().split("T")[0],
};

const Form = () => {
  const {
    appData: { employees },
    isAppDataLoading,
  } = useAppData();

  const { setFieldValue } = useFormikContext();
  const handleDropdownChange = (name: string, value: string) => {
    setFieldValue(name, value);
    // Adding Current Branch for now by default
  };
  if (isAppDataLoading) {
    return <TMSLoader />;
  }
  const employeeOptions = formatEmployeeOptions(employees);

  const handleEndingDate = (date: Date[]) => {
    setFieldValue("endingDate", new Date(date[0]).toISOString().split("T")[0]);
  };

  return (
    <MDBox p={3} pt={0} bgcolor={"info"}>
      <Box mx={2} mt={-3} mb={1} textAlign={"center"}>
        <MDTypography my={1.5} variant={"h4"}>
          De Activate Employee
        </MDTypography>
      </Box>
      <TMSDropdown
        options={employeeOptions}
        label="Employee"
        name="employeeId"
        width="100%"
        onInputChange={handleDropdownChange}
      />

      <MDDatePicker
        onChange={handleEndingDate}
        input={{
          id: "endingDate",
          label: "Ending Date",
          name: "endingDate",
          variant: "outlined",
          fullWidth: true,
          InputLabelProps: {
            shrink: true,
          },
          //   value: `${profileInfoField.value}`,
          // backgroundColor: colors.background.default,
        }}
      />

      <Box mt={4} mb={1}>
        <MDButton
          variant="contained"
          fullWidth
          endIcon={<SendIcon />}
          color="info"
          type="submit"
        >
          De Activate Employee
        </MDButton>
      </Box>
    </MDBox>
  );
};

const DeactivateEmployee = () => {
  const onSubmit = async (values: DEmpVals) => {
    try {
      const response = await deActivateEmployee(values);
      if (response.status === 201) {
        console.log({ message: "successfully deactivate the employee" });
      } else {
        console.log("Error in new branch", response.data);
      }
    } catch (error: unknown) {
      console.log("Error in new branch", error);
    }
  };
  return (
    <>
      <FormikWrapper
        initialValues={initialValues}
        validationSchema={employeeDeactivateValidationSchema}
        onSubmit={onSubmit}
        children={<Form />}
      />
    </>
  );
};

export default DeactivateEmployee;
