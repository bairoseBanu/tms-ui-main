import Snackbar, { SnackbarProps } from "@mui/material/Snackbar";
import Alert, { AlertProps } from "@mui/material/Alert";
import React, { FC } from "react";

interface Props {
  handleClose: () => void;
  open: boolean;
  message: string;
  severity?: AlertProps["severity"];
  autoHideDuration?: number;
  snackbarProps?: SnackbarProps;
  alertProps?: AlertProps;
}

const TMSSnackbar: FC<Props> = ({
  handleClose,
  open,
  message = "",
  severity = "success",
  snackbarProps = {},
  alertProps = {},
}) => {
  const onClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    handleClose();
  };

  return (
    <Snackbar
      open={open}
      onClose={onClose}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      {...snackbarProps}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{ width: "100%" }}
        {...alertProps}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default TMSSnackbar;
