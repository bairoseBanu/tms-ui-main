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
import { PaygradeDoc } from "types/api-response";
import { FC, useState } from "react";
import MDInput from "./MDInput";
import { PaygradeDuration, PaygradeValues } from "types/paygrade-values";
import { getPaygradeDurationOptions } from "lib/getPaygradeDurationOptions";
import { paygradeValidationSchema } from "validations/paygrade-validation";

const initialValues = {
  paygradeId: "",
  name: "",
  duration: "year" as PaygradeDuration,
  minimumRange: 0,
  maximumRange: 0,
  isActive: true,
  branchId: "",
};

interface FormProps {
  paygrades: PaygradeDoc[];
  branchId: string;
}
const Form: FC<FormProps> = ({ paygrades, branchId }) => {
  const [selectedPaygrade, setSelectedPaygrade] = useState<{
    paygrade: PaygradeDoc;
    option: { id: string; label: string; value: string };
    paygradeDurationOption: { id: string; label: string; value: string };
  }>();
  const [name, setName] = useState<string>("");
  const [minimumRange, setMinimumRange] = useState<number>(0);
  const [maximumRange, setMaximumRange] = useState<number>(0);

  const paygradeDurationOptions = getPaygradeDurationOptions();
  const paygradeOptions = paygrades.map((grade) => ({
    id: grade.id,
    label: grade.name.toUpperCase(),
    value: grade.id,
  }));
  const { setFieldValue } = useFormikContext<PaygradeValues>();
  const handlePaygradeIdChange = (name: string, value: string, id: string) => {
    setFieldValue(name, value);
    const paygradeOption = paygradeOptions.find((option) => option.id === id);
    const paygrade = paygrades.find((grade) => {
      console.log({ gradeId: grade.id, id });
      return grade.id === id;
    });
    const paygradeDurationOption = paygradeDurationOptions.find(
      (opt) => opt.value === paygrade.duration
    );
    console.log({ paygradeOption, paygrade, paygradeDurationOption });

    setSelectedPaygrade({
      paygrade,
      option: paygradeOption,
      paygradeDurationOption,
    });
    setName(paygrade.name);
    setMinimumRange(paygrade.minimumRange);
    setMaximumRange(paygrade.maximumRange);
    setFieldValue("name", paygrade.name);
    setFieldValue("minimumRange", paygrade.minimumRange);
    setFieldValue("maximumRange", paygrade.maximumRange);
    setFieldValue("branchId", paygrade.branchId);
    setFieldValue("paygradeId", paygrade.id);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setFieldValue("name", event.target.value);
  };
  const handleMinimumRangeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMinimumRange(event.target.value as unknown as number);
    setFieldValue("minimumRange", event.target.value);
  };
  const handleMaximumRangeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMaximumRange(event.target.value as unknown as number);
    setFieldValue("maximumRange", event.target.value);
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
          Edit an existing Grade
        </MDTypography>
      </Box>
      <TMSDropdown
        options={paygradeOptions}
        label="Paygrade Name"
        name="paygradeId"
        width="100%"
        onInputChange={handlePaygradeIdChange}
      />

      {selectedPaygrade && (
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
              label={"Paygrade New Name"}
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              sx={{
                backgroundColor: colors.background.default,
                borderRadius: "5px",
              }}
              variant="outlined"
              value={minimumRange}
              onChange={handleMinimumRangeChange}
              fullWidth
              label={"Payrange Minimum"}
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              sx={{
                backgroundColor: colors.background.default,
                borderRadius: "5px",
              }}
              variant="outlined"
              value={maximumRange}
              onChange={handleMaximumRangeChange}
              fullWidth
              label={"Pay Range Maximum"}
            />
          </MDBox>
          <TMSDropdown
            options={paygradeDurationOptions}
            label="Paygrade Duration"
            name="duration"
            width="100%"
            onInputChange={handleDropdownChange}
            defaultValue={selectedPaygrade.paygradeDurationOption}
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
  onSubmitForm: (values: PaygradeValues) => void;
}
const EditPaygrade: FC<Props> = ({ onSubmitForm }) => {
  const {
    appData: { currentBranch, paygrades },
    isAppDataLoading,
  } = useAppData();
  const [error, setError] = useState("");

  const handleSubmit = async (values: PaygradeValues) => {
    if (values.minimumRange > values.maximumRange) {
      setError("* Minimum Range must be lower than Maximum");
      return;
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
        validationSchema={paygradeValidationSchema}
        onSubmit={handleSubmit}
        children={<Form paygrades={paygrades} branchId={currentBranch.id} />}
      />
      {error && (
        <MDTypography color="error" fontSize="1rem">
          {error}
        </MDTypography>
      )}
    </MDBox>
  );
};

export default EditPaygrade;
