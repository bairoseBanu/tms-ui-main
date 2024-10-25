import { CircularProgress } from "@mui/material";
import MDBox from "./MDBox";

const TMSLoader = () => {
  return (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      margin="auto"
      height="100%"
      width="100%"
    >
      <CircularProgress />
    </MDBox>
  );
};

export default TMSLoader;
