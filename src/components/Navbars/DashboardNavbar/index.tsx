/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import {
  useState,
  useEffect,
  forwardRef,
  Ref,
  MouseEvent,
  useContext,
} from "react";

// react-router components
import { useLocation, useNavigate } from "react-router-dom";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";

// Material Dashboard 2 PRO React TS examples components
import Breadcrumbs from "examples/Breadcrumbs";
// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarDesktopMenu,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 PRO React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  // setOpenConfigurator,
  // setDarkMode,
} from "context";
import TMSMenu from "components/TMSMenu";
import { DashboardMenuItems } from "../../../routes/dashboard_menuItems";
import { useAppData } from "hooks/useAppData";
import MDTypography from "components/MDTypography";
import { Tooltip } from "@mui/material";
import { SocketContext } from "context/SocketProvider";

// Declaring prop types for DashboardNavbar
interface Props {
  absolute?: boolean;
  light?: boolean;
  isMini?: boolean;
}
const { SettingsMenuItems, AccountMenuItems } = DashboardMenuItems;

const DashboardNavbar = forwardRef(
  (
    { absolute, light, isMini }: Props,
    ref: Ref<HTMLDivElement>
  ): JSX.Element => {
    const [navbarType, setNavbarType] = useState<
      "fixed" | "absolute" | "relative" | "static" | "sticky"
    >();
    const [controller, dispatch] = useMaterialUIController();
    const {
      miniSidenav,
      transparentNavbar,
      fixedNavbar,
      // openConfigurator,
      darkMode,
    } = controller;
    const [openSettingsMenu, setOpenSettingsMenu] = useState<Element>(null);
    const [openAccountMenu, setOpenAccountMenu] = useState<Element>(null);
    const route = useLocation().pathname.split("/").slice(1);
    const { isAppDataLoading, appData } = useAppData();

    const socket = useContext(SocketContext);

    useEffect(() => {
      if (socket) {
        socket.on("basicEmit", (data) => {
          console.log("Received data in basicEmit:", data);
          // Handle the event data here
        });

        // Cleanup function to remove the listener on unmount
        return () => socket.off("basicEmit");
      }
    }, [socket]);

    useEffect(() => {
      // Setting the navbar type
      if (fixedNavbar) {
        setNavbarType("sticky");
      } else {
        setNavbarType("static");
      }
      // A function that sets the transparent state of the navbar.
      function handleTransparentNavbar() {
        setTransparentNavbar(
          dispatch,
          (fixedNavbar && window.scrollY === 0) || !fixedNavbar
        );
      }

      /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
      window.addEventListener("scroll", handleTransparentNavbar);

      // Call the handleTransparentNavbar function to set the state with the initial value.
      handleTransparentNavbar();

      // Remove event listener on cleanup
      return () =>
        window.removeEventListener("scroll", handleTransparentNavbar);
    }, [dispatch, fixedNavbar]);

    const navigate = useNavigate();
    const showOrganization = () => {
      navigate("/organization");
    };

    const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
    // const handleConfiguratorOpen = () =>
    //   setOpenConfigurator(dispatch, !openConfigurator);
    const handleSettingsMenu = (event: MouseEvent<HTMLButtonElement>) =>
      setOpenSettingsMenu(event.currentTarget);
    const handleCloseSettingsMenu = () => setOpenSettingsMenu(null);
    const handleAccountMenu = (event: MouseEvent<HTMLButtonElement>) =>
      setOpenAccountMenu(event.currentTarget);
    const handleCloseAccountMenu = () => setOpenAccountMenu(null);
    // const handleDarkMode = ()=>setDarkMode(dispatch, !darkMode);

    // Render the Settings menu
    // const renderSettingsMenu = () => (
    //   <Menu
    //     anchorEl={openSettingsMenu}
    //     anchorReference={null}
    //     anchorOrigin={{
    //       vertical: "bottom",
    //       horizontal: "left",
    //     }}
    //     open={Boolean(openSettingsMenu)}
    //     onClose={handleCloseSettingsMenu}
    //     sx={{ mt: 2 }}
    //   >
    //     <Link to={"/settings/branch"}>
    //       <NotificationItem
    //         icon={<Icon>apartment</Icon>}
    //         title="Create New Branch"
    //       />
    //     </Link>
    //     <Link to={"/settings/employee"}>
    //       <NotificationItem
    //         icon={<Icon>person_add</Icon>}
    //         title="Add New Employee"
    //       />
    //     </Link>
    //   </Menu>
    // );

    // Styles for the navbar icons
    const iconsStyle = ({
      palette: { dark, white, text },
      functions: { rgba },
    }: {
      palette: any;
      functions: any;
    }) => ({
      color: () => {
        let colorValue = light || darkMode ? white.main : dark.main;

        if (transparentNavbar && !light) {
          colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
        }

        return colorValue;
      },
    });

    if (isAppDataLoading) {
      return <></>;
    }
    const { currentBranch, organization } = appData;
    return (
      <AppBar
        position={absolute ? "absolute" : navbarType}
        color="inherit"
        sx={(theme) => navbar(theme, { light, darkMode })}
        ref={ref}
      >
        <Toolbar sx={navbarContainer}>
          <MDBox
            color="inherit"
            mb={{ xs: 1, md: 0 }}
            sx={(theme) => navbarRow(theme, { isMini })}
          >
            <Breadcrumbs
              icon="home"
              title={route[route.length - 1]}
              route={route}
              light={light}
            />
            <IconButton
              sx={navbarDesktopMenu}
              onClick={handleMiniSidenav}
              size="small"
              disableRipple
            >
              <Icon fontSize="medium" sx={iconsStyle}>
                {miniSidenav ? "menu_open" : "menu"}
              </Icon>
            </IconButton>
            {organization && (
              <Tooltip title="view Organization">
                <MDTypography
                  variant="h5"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                  onClick={showOrganization}
                >
                  {organization.name}
                </MDTypography>
              </Tooltip>
            )}
          </MDBox>
          {isMini ? null : (
            <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
              {/* <MDBox pr={1}>
                <IconButton sx={navbarIconButton} onClick={handleDarkMode}>{darkMode ? <Icon sx={iconsStyle} >dark_mode</Icon>: <Icon sx={iconsStyle} >light_mode</Icon>} </IconButton>
              </MDBox> */}
              {currentBranch && (
                <MDTypography variant="h6">{currentBranch.name}</MDTypography>
              )}
              <MDBox color={light ? "white" : "inherit"}>
                <Tooltip title="Log out">
                  <IconButton
                    sx={navbarIconButton}
                    onClick={handleAccountMenu}
                    size="small"
                    disableRipple
                  >
                    <Icon sx={iconsStyle}>account_circle</Icon>
                  </IconButton>
                </Tooltip>
                <IconButton
                  size="small"
                  disableRipple
                  color="inherit"
                  sx={navbarMobileMenu}
                  onClick={handleMiniSidenav}
                >
                  <Icon sx={iconsStyle} fontSize="medium">
                    {miniSidenav ? "menu_open" : "menu"}
                  </Icon>
                </IconButton>
                <Tooltip title="Settings">
                  <IconButton
                    size="small"
                    disableRipple
                    color="inherit"
                    sx={navbarIconButton}
                    // onClick={handleConfiguratorOpen}
                    onClick={handleSettingsMenu}
                  >
                    <Icon sx={iconsStyle}>settings</Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Notifications">
                  <IconButton
                    size="small"
                    color="inherit"
                    sx={navbarIconButton}
                  >
                    <MDBadge badgeContent={9} color="error" size="xs" circular>
                      <Icon sx={iconsStyle}>notifications</Icon>
                    </MDBadge>
                  </IconButton>
                </Tooltip>
                <TMSMenu
                  open={openSettingsMenu}
                  handleClose={handleCloseSettingsMenu}
                  menuItems={SettingsMenuItems}
                />
                <TMSMenu
                  open={openAccountMenu}
                  handleClose={handleCloseAccountMenu}
                  menuItems={AccountMenuItems}
                />
              </MDBox>
            </MDBox>
          )}
        </Toolbar>
      </AppBar>
    );
  }
);

// Declaring default props for DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

export default DashboardNavbar;
