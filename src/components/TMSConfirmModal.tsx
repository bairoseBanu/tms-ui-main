import { useState, useEffect, FC, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Icon,
} from "@mui/material";
import MDButton from "./MDButton";
import MDBox from "./MDBox";

interface Props {
  open: boolean;
  id?: string;
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
  onChoose?: (arg: string) => void;
  icon?: string;
}

const TMSConfirmationModal: FC<Props> = ({
  id,
  title = "Are you sure?",
  content,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onChoose,
  open,
  icon,
}) => {
  const [modalopen, setModalOpen] = useState(true);

  useEffect(() => {
    setModalOpen(open);
  }, [open]);

  const handleConfirm = useCallback(() => {
    onChoose("confirm");
    setModalOpen(false);
  }, [onChoose]);

  const handleCancel = useCallback(() => {
    onChoose("cancel");
    setModalOpen(false);
  }, [onChoose]);

  const handleClose = useCallback(() => {
    setModalOpen(false);
  }, []);
  return (
    <Dialog
      id={id}
      open={modalopen}
      onClose={handleClose}
      aria-labelledby={title}
      aria-describedby={content}
    >
      {icon && (
        <MDBox display={"flex"} justifyContent={"center"} mt={1}>
          <Icon fontSize="large" color="warning">
            {icon}
          </Icon>
        </MDBox>
      )}
      {title && <DialogTitle id={title}>{title}</DialogTitle>}
      {content && (
        <DialogContent>
          <DialogContentText id={content}>{content}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
        <MDButton color="info" onClick={handleConfirm}>
          {confirmText}
        </MDButton>
        <MDButton color="info" onClick={handleCancel} autoFocus>
          {cancelText}
        </MDButton>
      </DialogActions>
    </Dialog>
  );
};

export default TMSConfirmationModal;
