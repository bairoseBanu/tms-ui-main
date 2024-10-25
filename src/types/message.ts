import { AlertProps } from "@mui/material";

export interface Message {
  message: string;
  severity: AlertProps["severity"];
}
