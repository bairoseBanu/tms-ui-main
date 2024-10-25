import { FC, useCallback, useState } from "react";
import TMSInput from "./TMSInput";
import TMSFileUpload from "./TMSFileUpload";
import MDBox from "./MDBox";
import MDTypography from "./MDTypography";
import TMSDropdown from "./TMSDropdown";
import MDButton from "./MDButton";
import SendIcon from "@mui/icons-material/Send";
import { useFormikContext } from "formik";
import { ProofFormDocName, ProofFormValues } from "types/proof-form-values";
import { useAppData } from "hooks/useAppData";
import { formatEmployeeOptions } from "lib/formatDropdownOptions";
import { extractPayload } from "lib/auth";

type ProofType = "ni" | "brp" | "address" | "passport" | "other";
interface ProofFormProps {
  userOnly?: boolean;
}
const ProofForm: FC<ProofFormProps> = ({ userOnly }) => {
  const { employees, user } = useAppData().appData;
  const { role } = extractPayload();
  const { setFieldValue, values } = useFormikContext<ProofFormValues>();
  const [proofType, setProofType] = useState<ProofType>();

  const handleFileUpload = useCallback(
    (name: string, value: File[]) => {
      const Name = name as ProofFormDocName;
      const prevValue = values[Name];
      let newValue: File[] = [];
      if (prevValue && prevValue.length > 0) {
        newValue = [...prevValue];
      }
      newValue = [...newValue, ...value];
      setFieldValue(name, newValue);
      const noOfDocs = values.noOfDocs;
      setFieldValue("noOfDocs", noOfDocs + 1);
    },
    [setFieldValue, values]
  );

  const handleFileRemove = useCallback(
    (name: string, file: File) => {
      const Name = name as ProofFormDocName;
      const prevValue = values[Name];
      let newValue: File[] = [];
      if (prevValue && prevValue.length > 0) {
        newValue = prevValue.filter((val) => val !== file);
      }
      setFieldValue(name, newValue);
      const noOfDocs = values.noOfDocs;
      setFieldValue("noOfDocs", noOfDocs - 1);
    },
    [setFieldValue, values]
  );

  const renderFields = () => {
    if (proofType === "ni") {
      return (
        <>
          <TMSInput
            id="niNumber"
            label="NI number"
            name="niNumber"
            variant="outlined"
            fullWidth
          />
        </>
      );
    }

    if (proofType === "brp") {
      return (
        <>
          <TMSFileUpload
            id="brpDoc"
            name="brpDoc"
            variant="outlined"
            fullWidth
            onUpload={handleFileUpload}
            onFileRemove={handleFileRemove}
          />

          <TMSInput
            id="brpNumber"
            label="BRP number"
            name="brpNumber"
            variant="outlined"
            fullWidth
          />

          <TMSInput
            id="brpExpiry"
            type="date"
            label="BRP Expiry"
            name="brpExpiry"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </>
      );
    }
    if (proofType === "address") {
      return (
        <>
          <TMSFileUpload
            id="addressDoc"
            name="addressDoc"
            variant="outlined"
            fullWidth
            onUpload={handleFileUpload}
            onFileRemove={handleFileRemove}
          />
          <TMSInput
            id="addressNumber"
            label="Address Proof Number"
            name="addressNumber"
            variant="outlined"
            fullWidth
          />
          <TMSInput
            id="addressLineOne"
            label="Address Line 1"
            name="addressLineOne"
            variant="outlined"
            fullWidth
          />
          <TMSInput
            id="addressLineTwo"
            label="Address Line 2"
            name="addressLineTwo"
            variant="outlined"
            fullWidth
          />
          <TMSInput
            id="postCode"
            label="Post Code"
            name="postCode"
            variant="outlined"
            fullWidth
          />
        </>
      );
    }

    if (proofType === "passport") {
      return (
        <>
          <TMSFileUpload
            id="passportDoc"
            name="passportDoc"
            variant="outlined"
            fullWidth
            onUpload={handleFileUpload}
            onFileRemove={handleFileRemove}
          />

          <TMSInput
            id="passport-number"
            label="Passport Number"
            name="passportNumber"
            variant="outlined"
            fullWidth
          />
          <TMSInput
            id="passport-expiry-date"
            type="date"
            label="Passport Expiry Date"
            name="passportExpiry"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </>
      );
    }

    if (proofType === "other") {
      return (
        <>
          <TMSFileUpload
            id="otherProofDoc"
            name="otherProofDoc"
            variant="outlined"
            fullWidth
            onUpload={handleFileUpload}
            onFileRemove={handleFileRemove}
          />
          <TMSInput
            id="other-proof-number"
            label="Other Proof Number"
            name="otherProofNumber"
            variant="outlined"
            fullWidth
          />
          <TMSInput
            id="other-proof-expiry"
            type="date"
            label="Other Proof Expiry"
            name="otherProofExpiry"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </>
      );
    }
  };
  const employeeOptions =
    (role === "Admin" || role === "RootAdmin") && !userOnly
      ? formatEmployeeOptions(employees)
      : formatEmployeeOptions([user]);

  const handleEmployeeChange = useCallback(
    (name: string, value: string) => {
      setFieldValue(name, value);
    },
    [setFieldValue]
  );

  const handleDocTypeChange = useCallback(
    (name: string, value: string) => {
      setFieldValue(name, value);
      setProofType(value as ProofType);
      console.log({ value });
    },
    [setFieldValue]
  );

  return (
    <MDBox p={3} pt={0} bgcolor={"info"}>
      <MDBox mx={2} mt={-3} mb={1} textAlign={"center"}>
        <MDTypography my={1.5} variant={"h4"}>
          Create Employee Proof
        </MDTypography>
      </MDBox>

      <TMSDropdown
        options={employeeOptions}
        label="Employee"
        name="employeeId"
        onInputChange={handleEmployeeChange}
      />
      <TMSDropdown
        options={[
          { id: "0", label: "NI", value: "ni" },
          { id: "1", label: "BRP", value: "brp" },
          { id: "2", label: "Address", value: "address" },
          { id: "3", label: "Passport", value: "passport" },
          { id: "4", label: "Other", value: "other" },
        ]}
        label="Proof Type"
        name="docType"
        onInputChange={handleDocTypeChange}
      />
      {proofType && renderFields()}

      <MDBox display="flex" justifyContent="flex-end">
        <MDButton
          mt={3}
          variant="gradient"
          color="info"
          size="medium"
          endIcon={<SendIcon />}
          type="submit"
        >
          Submit
        </MDButton>
      </MDBox>
    </MDBox>
  );
};

export default ProofForm;
