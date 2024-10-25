import { Box, Grid, Icon, IconButton, Modal } from "@mui/material";
import MDButton from "components/MDButton";
import TMSPayDoc from "components/TMSPayDoc";
import { PayRoll } from "types/api-response";
import Close from "@mui/icons-material/Close";
import { useState } from "react";
import PayrollForm from "components/PayrollForm";
import { PayrollFormValues } from "types/payroll-form-values";
import { deletePayroll, newPayroll, updatePayroll } from "apis/payroll.api";
import { Message } from "types/message";
import TMSSnackbar from "components/TMSSnackbar";
import TMSLoader from "components/TMSLoader";
import { uploadfiletoS3 } from "apis/s3.api";
import useApiCall from "hooks/useApiCall";
import TMSPdfView from "components/TMSPdfView";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  pt: 7,
};

const PayScreen = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openPayrollView, setOpenPayrollView] = useState(false);
  const [currentPayrollUrl, setCurrentPayrollUrl] = useState("");
  const [message, setMessage] = useState<Message>({
    message: "",
    severity: "success",
  });
  const [isFormLoading, setFormLoading] = useState(false);
  const { data, isLoading } = useApiCall<PayRoll[]>("payroll");

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleClosePayrollViewModal = () => {
    setOpenPayrollView(false);
  };
  const handlePayDocOpen = (payrollId: string) => {
    setOpenPayrollView(true);
    const url = data.find((payroll) => payroll.id === payrollId).presignedUrl;
    setCurrentPayrollUrl(url);
  };

  const handleSubmitForm = async (values: PayrollFormValues) => {
    setFormLoading(true);
    try {
      const response = await newPayroll({ ...values, doc: undefined });
      if (response.data.errors) {
        setMessage({
          message: "Error in Creating a Payroll",
          severity: "error",
        });
      }
      if (response.status === 201) {
        const uploadUrl = response.data.presignedUrl as string;
        if (uploadUrl) {
          const s3Response = await uploadfiletoS3(
            uploadUrl,
            values.doc,
            values.doc.type
          );
          console.log({ s3Response });

          if (!s3Response.ok) {
            setMessage({ message: "Failed to upload!", severity: "error" });
            setFormLoading(false);
            return;
          }
          const updatedResponse = await updatePayroll({
            payrollId: response.data.payroll.id,
            isUploaded: true,
          });
          if (updatedResponse.status === 201) {
            setMessage({
              message: "Successfully Added the Payroll",
              severity: "success",
            });
          }
        }
      }
    } catch (err) {
      setMessage({ message: "Error in Creating a Payroll", severity: "error" });
    }
    setFormLoading(false);
  };

  const handleMsgClose = () => {
    setMessage({ message: "", severity: "success" });
  };

  const handlePayrollDelete = async (payrollId: string) => {
    setFormLoading(true);
    try {
      const response = await deletePayroll(payrollId);
      if (response.data.errors) {
        setMessage({
          message: "Error in Deleting payroll",
          severity: "error",
        });
        setFormLoading(false);
        return;
      }
      if (response.status === 200) {
        const index = data.findIndex((payroll) => payroll.id === payrollId);
        data.splice(index);
        setMessage({
          message: "successfully Deleted payroll",
          severity: "success",
        });
      }
    } catch (err) {
      setMessage({ message: "Error in Deleting payroll", severity: "error" });
    }
    setFormLoading(false);
  };

  if (isFormLoading || isLoading) {
    return <TMSLoader />;
  }

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Box mb={4} id="addPayroll">
        <MDButton
          variant="contained"
          color="info"
          fullWidth
          onClick={handleOpenModal}
        >
          <Icon>add</Icon> ADD PAYROLL DOC
        </MDButton>
      </Box>
      <Grid container spacing={3} flexGrow={1}>
        <TMSPayDoc
          onDelete={handlePayrollDelete}
          data={data}
          onPayDocOpen={handlePayDocOpen}
        />
      </Grid>
      <Modal
        id="payrollForm"
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="addPayroll"
        aria-describedby="addPayroll"
      >
        <>
          <Box sx={style}>
            <IconButton
              size="medium"
              sx={{
                position: "absolute",
                top: "25px",
                right: "20px",
                // boxShadow: 5,
              }}
              onClick={handleCloseModal}
            >
              <Close onClick={handleCloseModal}></Close>
            </IconButton>
            <PayrollForm onSubmitForm={handleSubmitForm} />
          </Box>
        </>
      </Modal>
      <Modal
        id="payrollView"
        open={openPayrollView}
        onClose={handleClosePayrollViewModal}
        aria-labelledby="addPayroll"
        aria-describedby="addPayroll"
      >
        <>
          <Box sx={style}>
            <IconButton
              size="medium"
              sx={{
                position: "absolute",
                top: "25px",
                right: "20px",
                // boxShadow: 5,
              }}
              onClick={handleClosePayrollViewModal}
            >
              <Close></Close>
            </IconButton>
            {data && data.length > 0 && (
              <TMSPdfView pdfUrl={currentPayrollUrl} />
            )}
          </Box>
        </>
      </Modal>
      {message?.message && (
        <TMSSnackbar
          message={message.message}
          severity={message.severity}
          open={!!message.message}
          handleClose={handleMsgClose}
        />
      )}
    </Box>
  );
};

export default PayScreen;
