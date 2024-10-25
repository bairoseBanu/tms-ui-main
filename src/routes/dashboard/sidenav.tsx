import { DashBoardRoute, DashBoardRoutes } from "routes/dashboard_routes";
import brandDark from "assets/images/logo-ct-dark.png";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";
import Divider from "@mui/material/Divider";
import { filterDashboardRoutes } from "lib/filterDashboardRoutes";
import { useState } from "react";
import { setMiniSidenav, useMaterialUIController } from "context";
import { Icon, Link, List } from "@mui/material";
import { NavLink } from "react-router-dom";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import SidenavCollapse from "components/Sidenav/SidenavCollapse";
import SidenavList from "components/Sidenav/SidenavList";
import SidenavItem from "components/Sidenav/SidenavItem";
import { SidenavRoot } from "components/Sidenav/SidenavRoot";
import { useAppData } from "hooks/useAppData";

interface SiveNavProps {
  routes: DashBoardRoutes;
  onMouseEnter: any;
  onMouseLeave: any;
}
const Sidenav = ({ routes, ...rest }: SiveNavProps) => {
  const filteredRoutes = filterDashboardRoutes(routes);
  const brand = brandDark;
  const brandName = "ISSCL TMS";
  const textColor:
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "dark"
    | "white"
    | "inherit"
    | "text"
    | "light" = "white";
  const [openCollapse, setOpenCollapse] = useState<boolean | string>(false);
  const [controller, dispatch] = useMaterialUIController();
  const { themeColor } = useAppData();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } =
    controller;
  const closeSidenav = () => {
    setMiniSidenav(dispatch, true);
  };
  const renderRoute = (route: DashBoardRoute) => {
    if (route.type === "external") {
      const { href, key, name, icon } = route;
      return (
        <Link
          href={href}
          key={key}
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "none" }}
        >
          <SidenavCollapse name={name} icon={icon} noCollapse={true} />
        </Link>
      );
    } else if (route.type === "navlink") {
      const { path, key, name, icon } = route;
      return (
        <NavLink to={path} key={key}>
          <SidenavCollapse
            name={name}
            icon={icon}
            noCollapse={true}
            // active={key === collapseName}
          >
            {/* {collapse ? renderCollapse(collapse) : null} */}
          </SidenavCollapse>
        </NavLink>
      );
    } else if (route.type === "collapsible") {
      const { key, name, icon, collapse } = route;
      return (
        <SidenavCollapse
          key={key}
          name={name}
          icon={icon}
          //   active={key === collapseName}
          //   open={openCollapse === key}
          open={openCollapse === key}
          onClick={() =>
            openCollapse === key ? setOpenCollapse(false) : setOpenCollapse(key)
          }
        >
          {collapse.map(({ key, name, path }) => (
            <SidenavList key={key}>
              <NavLink to={path} key={key} style={{ textDecoration: "none" }}>
                <SidenavItem
                  //   color={color}
                  name={name}
                  //   active={key === itemName}
                />
              </NavLink>
            </SidenavList>
          ))}
        </SidenavCollapse>
      );
    }
  };
  // if (isAppDataLoading) {
  //   return <></>;
  // }
  // const { theme } = appData;
  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      themeColor={themeColor}
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={3} pb={1} px={4} textAlign="center">
        <MDBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <MDTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </MDTypography>
        </MDBox>
        <MDBox component={NavLink} to="/" display="flex" alignItems="center">
          {brand && (
            <MDBox component="img" src={brand} alt="Brand" width="2rem" />
          )}
          <MDBox
            width={(!brandName && "100%") || undefined}
            sx={(theme: any) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <MDTypography
              component="h6"
              variant="button"
              fontWeight="medium"
              color={textColor}
            >
              {brandName}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <Divider light={true} />
      <List>{filteredRoutes.map(renderRoute)}</List>
    </SidenavRoot>
  );
};

export default Sidenav;
