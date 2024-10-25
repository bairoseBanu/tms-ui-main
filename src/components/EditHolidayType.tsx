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
import colors from "assets/theme/base/colors";
import { HolidayTypeDoc } from "types/api-response";
import { FC, useState } from "react";
import MDInput from "./MDInput";
import { HolidayTypeValues } from "types/holidaytype-values";
import TMSCheckBox from "./TMSCheckbox";
import { holidayTypeValidationSchema } from "validations/holidaytype-validation";

const initialValues = {
  holidayTypeId: "",
  name: "",
  description: "",
  isPaidLeave: false,
  maxAllowedDaysPerYear: 0,
  carryOverAllowed: false,
  carryOverLimit: 0,
  isActive: true,
  branchId: "",
};

interface FormProps {
  holidayTypes: HolidayTypeDoc[];
  branchId: string;
}
const Form: FC<FormProps> = ({ holidayTypes, branchId }) => {
  const [selectedHolidayType, setSelectedHolidayType] = useState<{
    holidayType: HolidayTypeDoc;
    option: { id: string; label: string; value: string };
  }>();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isPaidLeave, setIsPaidLeave] = useState<boolean>(false);
  const [maxAllowedDaysPerYear, setMaxAllowedDaysPerYear] = useState<number>(0);
  const [carryOverAllowed, setCarryOverAllowed] = useState<boolean>(false);
  const [carryOverLimit, setCarryOverLimit] = useState<number>(0);

  const holidayTypeOptions = holidayTypes.map((ht) => ({
    id: ht.id,
    label: ht.name.toUpperCase(),
    value: ht.id,
  }));
  const { setFieldValue } = useFormikContext<HolidayTypeValues>();
  const handleHTIdChange = (name: string, value: string, id: string) => {
    setFieldValue(name, value);
    const holidayTypeOption = holidayTypeOptions.find(
      (option) => option.id === id
    );
    const holidayType = holidayTypes.find((ht) => {
      return ht.id === id;
    });
    setSelectedHolidayType({
      holidayType,
      option: holidayTypeOption,
    });

    // Need to optimize this
    setName(holidayType.name);
    setDescription(holidayType.description);
    setIsPaidLeave(holidayType.isPaidLeave);
    setMaxAllowedDaysPerYear(holidayType.maxAllowedDaysPerYear);
    setCarryOverAllowed(holidayType.carryOverAllowed);
    setCarryOverLimit(holidayType.carryOverLimit);
    setFieldValue("name", holidayType.name);
    setFieldValue("description", holidayType.description);
    setFieldValue("description", holidayType.description);
    setFieldValue("isPaidLeave", holidayType.isPaidLeave);
    setFieldValue("maxAllowedDaysPerYear", holidayType.maxAllowedDaysPerYear);
    setFieldValue("carryOverAllowed", holidayType.carryOverAllowed);
    setFieldValue("carryOverLimit", holidayType.carryOverLimit);
    setFieldValue("branchId", branchId);
    setFieldValue("holidayTypeId", holidayType.id);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setFieldValue("name", event.target.value);
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
    setFieldValue("description", event.target.value);
  };
  const handleCarryOverLimitChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCarryOverLimit(event.target.value as unknown as number);
    setFieldValue("carryOverLimit", event.target.value);
  };
  const handleMaxAllowedDaysPerYearChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMaxAllowedDaysPerYear(event.target.value as unknown as number);
    setFieldValue("maxAllowedDaysPerYear", event.target.value);
  };

  const handlePaidLeaveChange = (name: string, isChecked: boolean) => {
    setIsPaidLeave(isChecked);
    setFieldValue(name, isChecked);
  };
  const handleCarryOverAllowed = (name: string, isChecked: boolean) => {
    setCarryOverAllowed(isChecked);
    setFieldValue(name, isChecked);
  };

  return (
    <MDBox p={3} pt={0} bgcolor={"info"}>
      <Box mx={2} mt={-3} mb={1} textAlign={"center"}>
        <MDTypography my={1.5} variant={"h4"}>
          Edit an existing Holiday Type
        </MDTypography>
      </Box>
      <TMSDropdown
        options={holidayTypeOptions}
        label="Holiday Type Name"
        name="holidayTypeId"
        width="100%"
        onInputChange={handleHTIdChange}
      />

      {selectedHolidayType && (
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
              label={"Holiday Type New Name"}
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              sx={{
                backgroundColor: colors.background.default,
                borderRadius: "5px",
              }}
              variant="outlined"
              value={description}
              onChange={handleDescriptionChange}
              fullWidth
              label={"Holiday Type Description"}
            />
          </MDBox>
          <TMSCheckBox
            id="isPaidLeave"
            label="Paid Leave"
            checked={isPaidLeave}
            onChange={handlePaidLeaveChange}
          />
          <MDBox mb={2}>
            <MDInput
              sx={{
                backgroundColor: colors.background.default,
                borderRadius: "5px",
              }}
              variant="outlined"
              value={maxAllowedDaysPerYear}
              onChange={handleMaxAllowedDaysPerYearChange}
              fullWidth
              label={"maximum Allowed Days / Year"}
            />
          </MDBox>
          <TMSCheckBox
            id="carryOverAllowed"
            label="Allow Carryover"
            checked={carryOverAllowed}
            onChange={handleCarryOverAllowed}
          />
          {carryOverAllowed && (
            <MDBox mb={2}>
              <MDInput
                sx={{
                  backgroundColor: colors.background.default,
                  borderRadius: "5px",
                }}
                variant="outlined"
                value={carryOverLimit}
                onChange={handleCarryOverLimitChange}
                fullWidth
                label={"No of Holidays to carry over"}
              />
            </MDBox>
          )}
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
          Edit Holiday Type
        </MDButton>
      </Box>
    </MDBox>
  );
};

interface Props {
  onSubmitForm: (values: HolidayTypeValues) => void;
}
const EditHolidayType: FC<Props> = ({ onSubmitForm }) => {
  const {
    appData: { currentBranch, holidayTypes },
    isAppDataLoading,
  } = useAppData();
  const [error, setError] = useState("");

  const handleSubmit = async (values: HolidayTypeValues) => {
    if (values.carryOverAllowed) {
      if (values.carryOverLimit > values.maxAllowedDaysPerYear) {
        setError(
          "Carryover Days Must not be more than maximum allowed Holidays "
        );
        return;
      }
    }
    onSubmitForm(values);
  };
  if (isAppDataLoading) {
    return <TMSLoader />;
  }
  return (
    <MDBox>
      <FormikWrapper
        initialValues={initialValues}
        validationSchema={holidayTypeValidationSchema}
        onSubmit={handleSubmit}
        children={
          <Form holidayTypes={holidayTypes} branchId={currentBranch.id} />
        }
      />
      {error && (
        <MDTypography color="error" fontSize="1rem">
          {error}
        </MDTypography>
      )}
    </MDBox>
  );
};

export default EditHolidayType;
