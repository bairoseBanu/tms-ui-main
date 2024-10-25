import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, ButtonProps, IconButton, BoxProps } from "@mui/material";
import Modal, { ModalComponentsPropsOverrides } from "@mui/material/Modal";
import { Close } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  pt: 7,
};

interface ModalProps extends BoxProps {
  modalText?: React.ReactNode;
  isButton?: boolean;
  children: React.ReactNode;
  buttonProps?: ButtonProps;
  modalProps?: ModalComponentsPropsOverrides;
  closeModal?: boolean;
  openModal?: boolean;
  onModalClose?: () => void;
}

export default function TMSModal({
  modalText = "Open",
  children,
  buttonProps = {},
  modalProps = {},
  closeModal = false,
  openModal = false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onModalClose = () => {},
  ...props
}: ModalProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onModalClose();
  };

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  useEffect(() => {
    if (closeModal) {
      console.log("I m open", closeModal);

      setOpen(false);
    }
  }, [closeModal]);

  return (
    <Box {...props}>
      <Button
        // style={isButton ? btnStyle : {}}
        onClick={handleOpen}
        {...buttonProps}
      >
        {modalText}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        {...modalProps}
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
              onClick={handleClose}
            >
              <Close onClick={handleClose}></Close>
            </IconButton>

            {children && children}
          </Box>
        </>
      </Modal>
    </Box>
  );
}
