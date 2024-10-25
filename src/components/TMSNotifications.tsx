import { Icon, IconButton, Tooltip } from "@mui/material";
import React from "react";
import MDBadge from "./MDBadge";

interface Props {
  test?: string;
}

const TMSNotifications: React.FC<Props> = () => {
  //   const handleEmitEvent = () => {
  //     // Type the event name and data being emitted (optional)
  //     // socket.emit("your-event-name", "data-to-send"); // Replace with your event name and data
  //   };

  return (
    <Tooltip title="Notifications">
      <IconButton size="small" color="inherit">
        <MDBadge badgeContent={9} color="error" size="xs" circular>
          <Icon>notifications</Icon>
        </MDBadge>
      </IconButton>
    </Tooltip>
  );
};

export default TMSNotifications;
