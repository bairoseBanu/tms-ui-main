import { Box, Typography } from "@mui/material";
import { FC, PropsWithChildren } from "react";

const ErrorMsg: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box color="red">
      <Typography variant="body1" fontSize="small">
        {children}
      </Typography>
    </Box>
  );
};

export default ErrorMsg;
