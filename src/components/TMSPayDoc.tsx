import { FC } from "react";
import TMSInfoCard from "./TMSInfoCard";
import { Box, Grid, Icon, IconButton, Tooltip } from "@mui/material";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { PayRoll } from "types/api-response";

interface Props {
  data: PayRoll[];
  onDelete: (payrollId: string) => void;
  onPayDocOpen: (payrollId: string) => void;
}

const TMSPayDoc: FC<Props> = ({ data, onDelete, onPayDocOpen }) => {
  const handleDelete = (id: string) => {
    onDelete(id);
  };
  const openPayroll = (id: string) => {
    onPayDocOpen(id);
  };

  const payslips = data.map((payslip) => {
    return (
      <Grid item>
        <TMSInfoCard
          id={payslip.id}
          title={payslip.name}
          description={`${payslip.month} - ${payslip.year}`}
          sx={{
            transition: `transform 0.2s ease-in-out`,
            "&:hover": {
              transform: `scale(1.1)`,
            },
          }}
          options={
            <Box display={"flex"} justifyContent={"center"}>
              <Tooltip title="share">
                <IconButton color="inherit">
                  <IosShareOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="download">
                <IconButton color="inherit">
                  <FileDownloadOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="delete">
                <IconButton
                  color="inherit"
                  onClick={() => handleDelete(payslip.id)}
                >
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Box>
          }
          icon={
            <Tooltip title="view Payslip">
              <IconButton
                onClick={() => openPayroll(payslip.id)}
                color="inherit"
              >
                <Icon>visibility</Icon>
              </IconButton>
            </Tooltip>
          }
          width="200px"
        />
      </Grid>
    );
  });
  return <>{payslips}</>;
};

export default TMSPayDoc;
