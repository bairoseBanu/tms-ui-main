import { useCallback, FC, useState } from "react";
import FormikWrapper from "./FormikWrapper";
import axios from "axios";
import { uploadfiletoS3 } from "apis/s3.api";
import ProofForm from "./RenderProofForm";
import { EmployeeProofValidationSchema } from "validations/employee-proof-validation";
import { ProofFormValues } from "types/proof-form-values";
import DoneIcon from "@mui/icons-material/Done";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Box, Typography } from "@mui/material";

const initialValues: ProofFormValues = {
  employeeId: "",
  docType: "",
  noOfDocs: 0,
  // niNumber: "",
  // brpDoc: [],
  // brpExpiry: "",
  // brpNumber: "",
  // passportDoc: [],
  // passportNumber: "",
  // passportExpiry: "",
  // addressDoc: [],
  // addressLineOne: "",
  // addressLineTwo: "",
  // postCode: "",
  // otherProofDoc: [],
  // otherProofExpiry: "",
  // otherProofNumber: "",
};

interface Props {
  userOnly?: boolean;
  onSubmitForm: (values: ProofFormValues) => void;
  onError?: (errorMessage: string) => void;
}
interface Message {
  type: "error" | "success";
  value: string;
}

const EmployeeProofForm: FC<Props> = ({ userOnly = false, onSubmitForm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<Message>();

  const makeAPi = useCallback(
    async (values: ProofFormValues, files: File[]) => {
      setIsLoading(true);
      const body = Object.freeze({
        ...values,
        brpDoc: undefined,
        addressDoc: undefined,
        otherProofDoc: undefined,
        passportDoc: undefined,
      });

      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
      try {
        const fullUrl = `${
          import.meta.env.VITE_TMS_EMPLOYEE_BACKEND
        }/newrtwdoc`;
        const response = await axios.post(fullUrl, body, {
          withCredentials: true,
        });
        const uploadUrls = response.data.presignedUrls as string[];
        if (response.data.errors) {
          setMessage({ value: "Submission Failed!!", type: "error" });
        }
        if (uploadUrls && uploadUrls.length > 0) {
          const s3Response = await Promise.all(
            uploadUrls.flatMap((uploadUrl, index) => {
              if (files && files.length > 0 && uploadUrl) {
                console.log("Ima in", { files });

                return uploadfiletoS3(
                  uploadUrl,
                  files[index],
                  files[index].type
                );
              } else {
                return Promise.resolve(null);
              }
            })
          );
          console.log(s3Response);
        }
        setIsLoading(false);
        setMessage({ type: "success", value: "Submitted Successfully" });
        onSubmitForm(values);
      } catch (error) {
        console.log({ error });
        setMessage({ value: "Something went wrong!!!", type: "error" });
      }
    },
    [onSubmitForm]
  );
  const handleSubmit = async (values: ProofFormValues) => {
    const docType = values.docType;
    let files: File[] = [];
    if (docType === "brp") {
      files = values.brpDoc;
    }
    if (docType === "passport") {
      files = values.passportDoc;
    }
    if (docType === "address") {
      files = values.addressDoc;
    }
    if (docType === "other") {
      files = values.otherProofDoc;
    }
    if (docType === "ni") {
      files = [];
    }
    console.log({ filesatSubmission: files });
    await makeAPi(values, files);
  };
  if (isLoading) return <>Loading...</>;

  return (
    <>
      <FormikWrapper
        initialValues={initialValues}
        validationSchema={EmployeeProofValidationSchema}
        onSubmit={handleSubmit}
        children={<ProofForm userOnly={userOnly} />}
      />
      {message && (
        <Box display="flex" gap={1} alignItems={"center"}>
          {message.type === "error" && <CancelOutlinedIcon color={"error"} />}
          {message.type === "success" && <DoneIcon color={"success"} />}
          <Typography
            textAlign={"left"}
            color={message.type === "error" ? "error" : "green"}
            component="span"
          >
            {message.value}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default EmployeeProofForm;
