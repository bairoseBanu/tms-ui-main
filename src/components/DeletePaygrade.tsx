import MDBox from "./MDBox";
import { Box } from "@mui/material";
import MDTypography from "./MDTypography";
import MDButton from "./MDButton";
import SendIcon from "@mui/icons-material/Send";
import TMSDropdown from "./TMSDropdown";
import { formatPaygradeOptions } from "lib/formatDropdownOptions";
import { PaygradeDoc } from "types/api-response";
import { FC, useState } from "react";
import TMSConfirmationModal from "./TMSConfirmModal";

interface Props {
  paygrades: PaygradeDoc[];
  onDelete: (paygradeId: string) => void;
}
const DeletePaygrade: FC<Props> = ({ onDelete, paygrades }) => {
  const [confirmModal, setConfirmModal] = useState(false);

  const handleSubmit = () => {
    setConfirmModal(true);
  };
  const [selectedPaygrade, setSelectedPaygrade] = useState<PaygradeDoc>();
  const paygradeOptions = formatPaygradeOptions(paygrades);

  const handlePaygradeIdChange = (
    _name: string,
    _value: string,
    id: string
  ) => {
    const paygrd = paygrades.find((pg) => pg.id === id);
    setSelectedPaygrade(paygrd);
  };

  const handleConfirmChoose = (chosenOption: string) => {
    if (chosenOption === "cancel") {
      setConfirmModal(false);
      return;
    }
    if (chosenOption === "confirm") {
      onDelete(selectedPaygrade.id);
    }
  };

  return (
    <>
      <MDBox p={3} pt={0} bgcolor={"info"}>
        <Box mx={2} mt={-3} mb={1} textAlign={"center"}>
          <MDTypography my={1.5} variant={"h4"}>
            Delete Paygrade
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
          <Box mt={4} mb={1}>
            <MDButton
              variant="contained"
              fullWidth
              endIcon={<SendIcon />}
              color="info"
              onClick={handleSubmit}
            >
              Delete Paygrade
            </MDButton>
          </Box>
        )}
        <TMSConfirmationModal
          open={confirmModal}
          onChoose={handleConfirmChoose}
        />
      </MDBox>
    </>
  );
};

export default DeletePaygrade;
