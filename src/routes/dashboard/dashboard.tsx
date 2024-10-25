import { CssBaseline } from "@mui/material";
import MDBox from "components/MDBox";
import { Outlet, useNavigate } from "react-router-dom";
import { DashBoardRoutes } from "routes/dashboard_routes";
import { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useMaterialUIController, setMiniSidenav } from "context";
import colors from "assets/theme/base/colors";
import boxShadows from "assets/theme/base/boxShadows";
import DashboardNavbar from "components/Navbars/DashboardNavbar";
import Sidenav from "./sidenav";
import { extractPayload } from "lib/auth";

type DashBoardProps = { routes: DashBoardRoutes };

const DashBoard = ({ routes }: DashBoardProps) => {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { branchId } = extractPayload();
    if (!branchId) {
      navigate("/settings/branch");
    }
  }, [navigate]);
  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };
  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };
  return (
    <MDBox width={"100vw"} height={"100%"} minHeight={"100vh"}>
      <CssBaseline></CssBaseline>
      <Sidenav
        routes={routes}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      />
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox
          borderRadius="10px"
          sx={{ backgroundColor: colors.grey[300], boxShadow: boxShadows.lg }}
          paddingX={4}
          marginTop={2}
          paddingTop={3}
          paddingBottom={3}
          boxSizing={"border-box"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Outlet></Outlet>
        </MDBox>
      </DashboardLayout>
    </MDBox>
  );
};

export default DashBoard;
