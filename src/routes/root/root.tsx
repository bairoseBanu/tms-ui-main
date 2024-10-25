// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import { Outlet, useOutletContext } from "react-router-dom";
import { useMaterialUIController } from "context";
import themeDark from "assets/theme-dark";
import { Branch, Department, Designation, Employee } from "types/api-response";

interface AppData {
  branches?: Branch[];
  currentBranch?: Branch | null;
  departments?: Department[];
  designations?: Designation;
  employees?: Employee[];
}
const Root = () => {
  const [controller] = useMaterialUIController();

  const { darkMode } = controller;
  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      <Outlet></Outlet>
    </ThemeProvider>
  );
};

export default Root;

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  return useOutletContext<AppData>();
}
