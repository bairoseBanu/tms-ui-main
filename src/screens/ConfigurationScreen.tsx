import { Grid } from "@mui/material";
import TMSDeptConfig from "components/TMSDeptConfig";
import TMSDesignationConfig from "components/TMSDesignationConfig";
import TMSHolidayDurationConfig from "components/TMSHolidayDurationConfig";
import TMSHolidayTypeConfig from "components/TMSHolidayTypeConfig";
import TMSPaygradeConfig from "components/TMSPaygradeConfig";
import TMSSnackbar from "components/TMSSnackbar";
import { Message } from "types/message";
import { FC, useState } from "react";
import { TMSThemeConfig } from "components/TMSThemeConfig";

interface Props {
  onConfigChange?: (configName: string, status: string) => void;
}

const ConfigurationScreen: FC<Props> = ({ onConfigChange }) => {
  const [message, setMessage] = useState<Message>({
    message: "",
    severity: "success",
  });
  const handleMsgClose = () => {
    setMessage({ message: "", severity: "success" });
  };
  const handleMessage = (message: Message, source: string) => {
    setMessage(message);
    onConfigChange && onConfigChange(source, message.severity);
  };
  return (
    <Grid container spacing={2} direction={"column"}>
      <Grid item>
        <TMSDeptConfig onMessage={handleMessage} />
      </Grid>
      <Grid item>
        <TMSPaygradeConfig onMessage={handleMessage} />
      </Grid>
      <Grid item>
        <TMSDesignationConfig onMessage={handleMessage} />
      </Grid>
      <Grid item>
        <TMSHolidayTypeConfig onMessage={handleMessage} />
      </Grid>
      <Grid item>
        <TMSHolidayDurationConfig onMessage={handleMessage} />
      </Grid>
      <Grid item>
        <TMSThemeConfig />
      </Grid>
      {message?.message && (
        <TMSSnackbar
          message={message.message}
          severity={message.severity}
          open={!!message.message}
          handleClose={handleMsgClose}
        />
      )}
    </Grid>
  );
};

export default ConfigurationScreen;
