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
import { DesignationDoc } from "types/api-response";
import { FC, useState } from "react";
import MDInput from "./MDInput";
import { DesignationValues } from "types/designation-values";
import { designationValidationSchema } from "validations/designation-validation";

const initialValues = {
  designationId: "",
  name: "",
  description: "",
  isActive: true,
  branchId: "",
};

interface FormProps {
  designations: DesignationDoc[];
  branchId: string;
}
const Form: FC<FormProps> = ({ designations, branchId }) => {
  const [selectedDesignation, setSelectedDesignation] = useState<{
    designation: DesignationDoc;
    option: { id: string; label: string; value: string };
  }>();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const designationOptions = designations.map((design) => ({
    id: design.id,
    label: design.name.toUpperCase(),
    value: design.id,
  }));
  const { setFieldValue } = useFormikContext<DesignationValues>();
  const handleDesignationIdChange = (
    name: string,
    value: string,
    id: string
  ) => {
    setFieldValue(name, value);
    const designationOption = designationOptions.find(
      (option) => option.id === id
    );
    const designation = designations.find((desi) => {
      return desi.id === id;
    });
    setSelectedDesignation({
      designation,
      option: designationOption,
    });
    setName(designation.name);
    setDescription(designation.description);
    setFieldValue("name", designation.name);
    setFieldValue("description", designation.description);
    setFieldValue("branchId", branchId);
    setFieldValue("designationId", designation.id);
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

  return (
    <MDBox p={3} pt={0} bgcolor={"info"}>
      <Box mx={2} mt={-3} mb={1} textAlign={"center"}>
        <MDTypography my={1.5} variant={"h4"}>
          Edit an existing Designation
        </MDTypography>
      </Box>
      <TMSDropdown
        options={designationOptions}
        label="designation Name"
        name="designationId"
        width="100%"
        onInputChange={handleDesignationIdChange}
      />

      {selectedDesignation && (
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
              label={"Designation New Name"}
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
              label={"Designation Description"}
            />
          </MDBox>
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
          Edit Designation
        </MDButton>
      </Box>
    </MDBox>
  );
};

interface Props {
  onSubmitForm: (values: DesignationValues) => void;
}
const EditDesignation: FC<Props> = ({ onSubmitForm }) => {
  const {
    appData: { currentBranch, designationsDocs },
    isAppDataLoading,
  } = useAppData();
  //   const [error, setError] = useState("");
  console.log({ designationsDocs });

  const handleSubmit = async (values: DesignationValues) => {
    onSubmitForm(values);
  };
  if (isAppDataLoading) {
    return <TMSLoader />;
  }
  return (
    <MDBox>
      <FormikWrapper
        initialValues={initialValues}
        validationSchema={designationValidationSchema}
        onSubmit={handleSubmit}
        children={
          <Form designations={designationsDocs} branchId={currentBranch.id} />
        }
      />
      {/* {error && (
        <MDTypography color="error" fontSize="1rem">
          {error}
        </MDTypography>
      )} */}
    </MDBox>
  );
};

export default EditDesignation;
