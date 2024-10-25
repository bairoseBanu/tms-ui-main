import { IconButton, IconButtonProps } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";

import { FC } from "react";
interface Props extends IconButtonProps {
  onClick: () => void;
  toolTipText?: string;
}

const TMSEditIcon: FC<Props> = ({
  onClick,
  toolTipText = "Edit",
  ...props
}) => {
  return (
    <Tooltip title={toolTipText}>
      <IconButton onClick={onClick} {...props}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};

export default TMSEditIcon;
