import { Box, Icon, IconButton, Tooltip } from "@mui/material";
import { FC } from "react";
interface Props {
  id: string;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const ApproveBtn: FC<Props> = ({ id, onApprove, onReject }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Tooltip title="Approve">
        <IconButton sx={{ "&:hover": { backgroundColor: "grey.400" } }}>
          <Icon
            onClick={() => onApprove(id)}
            color="success"
            fontSize="medium"
            // sx={{ ...iconStyling }}
          >
            check_circle
          </Icon>
        </IconButton>
      </Tooltip>

      <Tooltip title="Reject">
        <IconButton sx={{ "&:hover": { backgroundColor: "grey.400" } }}>
          <Icon
            onClick={() => onReject(id)}
            color="error"
            fontSize="medium"
            // sx={{ ...iconStyling }}
          >
            cancel
          </Icon>
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ApproveBtn;
