import { IconButton, IconButtonProps } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

import { FC } from "react";
interface Props extends IconButtonProps {
  onClick: () => void;
  toolTipText?: string;
}

const TMSDeleteIcon: FC<Props> = ({
  onClick,
  toolTipText = "Delete",
  ...props
}) => {
  return (
    <Tooltip title={toolTipText}>
      <IconButton onClick={onClick} {...props}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};

export default TMSDeleteIcon;
