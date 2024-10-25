import { IconButton, Modal, Tooltip } from "@mui/material";
import MDBox from "components/MDBox";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import PoliciesList from "components/PoliciesList";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import TMSLoader from "components/TMSLoader";
import { Message } from "types/message";
import TMSSnackbar from "components/TMSSnackbar";
import { deletePolicy, newPolicy, updatePolicy } from "apis/policy.api";
import { PolicyValues } from "types/policy-values";
import { uploadfiletoS3 } from "apis/s3.api";
import useApiCall from "hooks/useApiCall";
import { PolicyAttrs, PolicyDoc } from "types/api-response";
import PolicyForm from "components/PolicyForm";
import { PolicyFormValues } from "types/policy-form-values";

const Policy = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<Message>({
    message: "",
    severity: "success",
  });
  const { data: policies, isLoading: isPolicyLoading } =
    useApiCall<PolicyAttrs[]>("policy");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const handlePolicyUpload = async (values: PolicyFormValues) => {
    setIsLoading(true);
    const file = values.policyFile[0];
    if (!file || file.type !== "application/pdf") {
      return;
    }
    const policyValues: PolicyValues = {
      name: values.policyName,
    };
    const urlResponse = await newPolicy(policyValues);
    if (urlResponse.data.errors) {
      setMessage({ message: "Failed to upload!", severity: "error" });
      return;
    }
    if (urlResponse.status === 201) {
      const s3Response = await uploadfiletoS3(
        urlResponse.data.presignedUrl,
        file,
        file.type
      );
      if (!s3Response.ok) {
        setMessage({ message: "Failed to upload!", severity: "error" });
        return;
      }
      const response = await updatePolicy({
        policyId: urlResponse.data.policy?.id,
        isUploaded: true,
      });
      if (response.status === 201) {
        const policyDoc = urlResponse.data.policy as PolicyDoc;
        policies.push({
          policyId: policyDoc.id,
          name: policyDoc.name,
          createdAt: policyDoc.createdAt,
          branchId: policyDoc.branchId,
          presignedUrl: file,
          isUploaded: true,
        });
        setMessage({
          message: "Policy uploaded Successfully!",
          severity: "success",
        });
      }
      setIsLoading(false);
      setUploadModalOpen(false);
    }
  };
  const handleMsgClose = () => {
    setMessage({ message: "", severity: "success" });
  };

  const handlePolicyDelete = async (policyId: string) => {
    setIsLoading(true);
    try {
      const response = await deletePolicy(policyId);
      if (response.status === 200) {
        policies.forEach((policy, index) => {
          if (policy.policyId === policyId) {
            policies.splice(index, 1);
          }
        });
        setMessage({
          message: "Policy Deleted Successfully",
          severity: "success",
        });
      }
      if (response.data.errors) {
        setMessage({
          message: "Error in deleting the Policy",
          severity: "error",
        });
      }
    } catch (error) {
      console.log({ error });
      setMessage({
        message: "Error in deleting the Policy",
        severity: "error",
      });
    }
    setIsLoading(false);
  };

  const handlePolicyAdd = () => {
    setUploadModalOpen(true);
  };
  if (isLoading || isPolicyLoading) {
    return <TMSLoader />;
  }
  return (
    <>
      {policies?.length > 0 && (
        <PoliciesList
          policies={policies}
          header="policies"
          onPolicyDelete={handlePolicyDelete}
          onPolicyAdd={handlePolicyAdd}
        />
      )}
      {policies?.length <= 0 && (
        <MDBox
          height={"70vh"}
          margin={"auto"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {
            <Tooltip title="Upload Policies">
              <IconButton
                color="info"
                sx={{
                  p: 4,
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "2em",
                }}
                onClick={() => setUploadModalOpen(true)}
              >
                <UploadFileIcon />
              </IconButton>
            </Tooltip>
          }
        </MDBox>
      )}
      <Modal open={uploadModalOpen} sx={{ width: "50%", margin: "auto" }}>
        <MDBox
          display={"flex"}
          flexDirection={"column"}
          sx={{ bgcolor: "background.paper" }}
        >
          <Tooltip title="Close">
            <IconButton color="info" onClick={() => setUploadModalOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
          <PolicyForm onSubmitForm={handlePolicyUpload} />
        </MDBox>
      </Modal>
      {message.message && (
        <TMSSnackbar
          message={message.message}
          open={!!message.message}
          handleClose={handleMsgClose}
        />
      )}
    </>
  );
};
export default Policy;
