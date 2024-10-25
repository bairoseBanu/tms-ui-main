import { FC, useCallback } from "react";
import FormikWrapper from "./FormikWrapper";
import { PayrollFormValues } from "types/payroll-form-values";
import { PayrollValidationSchema } from "validations/payroll-validation";
import MDButton from "./MDButton";
import { Box } from "@mui/material";
import MDBox from "./MDBox";
import TMSInput from "./TMSInput";
import MDTypography from "./MDTypography";
import { FormikProps, useFormikContext } from "formik";
import SendIcon from "@mui/icons-material/Send";
import TMSFileUpload from "./TMSFileUpload";
import TMSDropdown from "./TMSDropdown";
import { formatEmployeeOptions } from "lib/formatDropdownOptions";
import { useAppData } from "hooks/useAppData";

const initialValues: PayrollFormValues = {
  employeeId: "",
  name: "payslip",
  month: "feb",
  year: "2024",
  doc: undefined,
};
type Options = {
  id: string;
  label: string;
  value: string;
};
interface FormProps {
  employeeOptions: Options[];
}
const Form: FC<FormProps> = ({ employeeOptions }) => {
  const { setFieldValue } = useFormikContext<PayrollFormValues>();

  const handleDropdownChange = (name: string, value: string) => {
    setFieldValue(name, value);
  };
  const handleFileUpload = useCallback(
    (name: string, value: File[]) => {
      setFieldValue(name, value[0]);
    },
    [setFieldValue]
  );

  const handleFileRemove = useCallback(
    (name: string, file: File) => {
      setFieldValue(name, undefined);
      console.log({ file });
    },
    [setFieldValue]
  );

  return (
    <MDBox p={3} pt={0} bgColor={"white"}>
      <Box mx={2} mt={-3} mb={1} textAlign={"center"}>
        <MDTypography my={1.5} variant={"h4"}>
          Create Payroll
        </MDTypography>
      </Box>
      <TMSDropdown
        options={employeeOptions}
        label="Employee"
        name="employeeId"
        onInputChange={handleDropdownChange}
      />
      <TMSInput
        id="name"
        label="Payroll Name"
        name="name"
        variant="outlined"
        fullWidth
      />
      <TMSInput
        id="year"
        label="Year"
        name="year"
        variant="outlined"
        fullWidth
      />
      <TMSInput
        id="month"
        label="month"
        name="month"
        variant="outlined"
        fullWidth
      />
      <TMSFileUpload
        id="doc"
        name="doc"
        variant="outlined"
        fullWidth
        onUpload={handleFileUpload}
        onFileRemove={handleFileRemove}
      />

      <Box mt={4} mb={1}>
        <MDButton
          variant="contained"
          fullWidth
          endIcon={<SendIcon />}
          color="info"
          type="submit"
        >
          Create
        </MDButton>
      </Box>
    </MDBox>
  );
};

interface Props {
  userOnly?: boolean;
  onSubmitForm: (values: PayrollFormValues) => void;
}

const PayrollForm: FC<Props> = ({ onSubmitForm }) => {
  const { employees } = useAppData().appData;

  const handleSubmit = async (values: PayrollFormValues) => {
    console.log({ values });
    onSubmitForm(values);
  };
  const handleFormikProps = (props: FormikProps<PayrollFormValues>) => {
    console.log({ props });
  };

  return (
    <>
      <FormikWrapper
        onFormikProps={handleFormikProps}
        initialValues={initialValues}
        validationSchema={PayrollValidationSchema}
        onSubmit={handleSubmit}
        children={<Form employeeOptions={formatEmployeeOptions(employees)} />}
      />
    </>
  );
};

export default PayrollForm;
