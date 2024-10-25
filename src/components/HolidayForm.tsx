import { FC, useState } from "react";
import FormikWrapper from "./FormikWrapper";
import MDBox from "./MDBox";
import SendIcon from "@mui/icons-material/Send";
import { Box, Typography } from "@mui/material";
import MDTypography from "./MDTypography";
import TMSInput from "./TMSInput";
import MDButton from "./MDButton";
import { TimeSheetFormValues } from "types/timesheet-form-values";
import { FormikProps, useFormikContext } from "formik";
import { HolidayFormValues } from "types/holiday-form-values";
import { HolidayValidation } from "validations/holiday-validation";

import TMSDropdown from "./TMSDropdown";
import { TMSRadioButton } from "./TMSRadioButton";
import { useAppData } from "hooks/useAppData";
import { formatHolidayTypeOptions } from "lib/formatDropdownOptions";

type FormProps = {
  isMultipleDate: boolean;
  setIsMultipleDate: (value: boolean) => void;
};

const Form: FC<FormProps> = ({ isMultipleDate, setIsMultipleDate }) => {
  const { appData } = useAppData();
  const ht = appData.holidayTypes;
  const holidayTypeDropDownOptions = formatHolidayTypeOptions(ht);

  const { setFieldValue } = useFormikContext<TimeSheetFormValues>();

  const handleDropdownOrRadioChange = (name: string, value: string) => {
    console.log({ name, value });

    setFieldValue(name, value);
  };
  const handleMultipleDate = () => {
    setIsMultipleDate(!isMultipleDate);
  };
  return (
    <MDBox p={3} pt={0} bgColor={"white"}>
      <Box mx={2} mt={-3} mb={1} textAlign={"center"}>
        <MDTypography my={1.5} variant={"h4"}>
          Create Holiday
        </MDTypography>
      </Box>

      <MDBox display={"flex"} flexDirection={"column"} mb={2}>
        <TMSInput
          id="holiday-fromDate"
          label="Start Date"
          name="fromDate"
          variant="outlined"
          type="date"
          fullWidth
          sx={{ marginBottom: 0 }}
        />
        <MDBox>
          <TMSRadioButton
            name="fromDateDuration"
            options={[
              { id: "0", label: "full", value: "full" },
              { id: "1", label: "am", value: "am" },
              { id: "2", label: "pm", value: "pm" },
            ]}
            onInputChange={handleDropdownOrRadioChange}
            sx={{
              display: "flex",
              justifyContent: "space-around",
              // bgcolor: "#dee25f",
            }}
          />
        </MDBox>
      </MDBox>
      {isMultipleDate && (
        <MDBox display={"flex"} flexDirection={"column"} mb={2}>
          <TMSInput
            id="holiday-toDate"
            label="End Date"
            name="toDate"
            variant="outlined"
            type="date"
            fullWidth
            sx={{ marginBottom: 0 }}
          />
          <MDBox>
            <TMSRadioButton
              name="toDateDuration"
              options={[
                { id: "0", label: "full", value: "full" },
                { id: "1", label: "am", value: "am" },
                { id: "2", label: "pm", value: "pm" },
              ]}
              onInputChange={handleDropdownOrRadioChange}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                // bgcolor: "#dee25f",
              }}
            />
          </MDBox>
        </MDBox>
      )}

      <TMSDropdown
        options={holidayTypeDropDownOptions}
        label="Holiday Type"
        name="holidayType"
        width="100%"
        onInputChange={handleDropdownOrRadioChange}
      />

      <MDBox display={"flex"}>
        <input
          name="multipleDate"
          type="checkbox"
          checked={isMultipleDate}
          onChange={handleMultipleDate}
          aria-label="multipleDate"
        />
        <Typography ml={1} aria-labelledby="multipleDate">
          Multiple Dates
        </Typography>
      </MDBox>

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
  onSubmitForm?: (values: HolidayFormValues) => void;
  date?: string;
  formValues: HolidayFormValues;
}

const HolidayForm: FC<Props> = ({ onSubmitForm, formValues }) => {
  const [isMultipleDate, setIsMultipleDate] = useState(false);
  const handleFormikProps = (props: FormikProps<HolidayFormValues>) => {
    console.log({ v: props, fromDate: formValues.fromDate });
  };
  const handleSubmit = (values: HolidayFormValues) => {
    console.log({ isMultipleDate });

    if (!isMultipleDate) {
      values.toDate = undefined;
      values.toDateDuration = undefined;
    }
    onSubmitForm(values);
  };
  return (
    <>
      {formValues && (
        <FormikWrapper
          initialValues={formValues}
          validationSchema={HolidayValidation}
          onSubmit={handleSubmit}
          children={
            <Form
              setIsMultipleDate={(value: boolean) => setIsMultipleDate(value)}
              isMultipleDate={isMultipleDate}
            />
          }
          onFormikProps={handleFormikProps}
        />
      )}
    </>
  );
};

export default HolidayForm;
