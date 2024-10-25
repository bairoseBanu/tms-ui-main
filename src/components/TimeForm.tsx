import { FC, useState } from "react";
import FormikWrapper from "./FormikWrapper";
import MDBox from "./MDBox";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/material";
import MDTypography from "./MDTypography";
import TMSInput from "./TMSInput";
import MDButton from "./MDButton";
import { TimeSheetFormValues } from "types/timesheet-form-values";
import { TimeSheetValidation } from "validations/timesheet-validation";
import { FormikProps, useFormikContext } from "formik";
import TMSCheckBox from "./TMSCheckbox";

const Form = () => {
  const [isTimeSplit, setTimeSplit] = useState(false);
  const { setFieldValue } = useFormikContext<TimeSheetFormValues>();

  const handleIsTimeSplit = (_id: string, checked: boolean) => {
    setTimeSplit(checked);
    setFieldValue("isTimeSplit", checked);
  };
  return (
    <MDBox p={3} pt={0} bgcolor={"info"}>
      <Box mx={2} mt={-3} mb={1} textAlign={"center"}>
        <MDTypography my={1.5} variant={"h4"}>
          Create TimeSheet
        </MDTypography>
      </Box>

      <TMSInput
        id="timesheet-date"
        label="Date"
        name="date"
        variant="outlined"
        type="date"
        fullWidth
      />

      <TMSInput
        id="timesheet-workedWith"
        label="Worked With"
        name="workedWith"
        variant="outlined"
        fullWidth
      />
      <MDBox display={"flex"} gap={1}>
        <TMSInput
          id="timesheet-fromOne"
          label="From"
          name="fromOne"
          variant="outlined"
          type="time"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
        />
        <TMSInput
          id="timesheet-toOne"
          label="To"
          name="toOne"
          variant="outlined"
          type="time"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
        />
      </MDBox>
      {isTimeSplit && (
        <MDBox display={"flex"} gap={1}>
          <TMSInput
            id="timesheet-fromTwo"
            label="From"
            name="fromTwo"
            variant="outlined"
            type="time"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <TMSInput
            id="timesheet-toTwo"
            label="To"
            name="toTwo"
            variant="outlined"
            type="time"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </MDBox>
      )}
      <TMSCheckBox
        id="timesplit"
        label="UnPaid Break"
        checked={isTimeSplit}
        onChange={handleIsTimeSplit}
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
  onSubmitForm?: (values: TimeSheetFormValues) => void;
  date?: string;
  formValues: TimeSheetFormValues;
}
const TimeSheet: FC<Props> = ({ onSubmitForm, formValues }) => {
  const handleFormikProps = (props: FormikProps<TimeSheetFormValues>) => {
    if (props.values.date !== formValues.date) {
      props.setValues({
        date: formValues.date,
        fromOne: "",
        toOne: "",
        isTimeSplit: false,
        fromTwo: "",
        toTwo: "",
        workedWith: "",
      });
    }
  };
  const handleSubmit = (values: TimeSheetFormValues) => {
    console.log({ values });

    onSubmitForm(values);
  };
  return (
    <>
      {formValues && (
        <FormikWrapper
          initialValues={formValues}
          validationSchema={TimeSheetValidation}
          onSubmit={handleSubmit}
          children={<Form />}
          onFormikProps={handleFormikProps}
        />
      )}
    </>
  );
};

export default TimeSheet;
