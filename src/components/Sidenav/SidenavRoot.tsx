// @mui material components
import Drawer from "@mui/material/Drawer";
import { styled, Theme } from "@mui/material/styles";
import { ThemeType } from "types/theme-type";

export const SidenavRoot = styled(Drawer)(
  ({
    theme,
    ownerState,
    themeColor,
  }: {
    theme?: Theme;
    ownerState: any;
    themeColor: ThemeType;
  }) => {
    const { palette, boxShadows, transitions, breakpoints, functions } = theme;
    const { transparentSidenav, whiteSidenav, miniSidenav } = ownerState;
    const sidebarWidth = 250;
    const { transparent, white } = palette;
    const { xxl } = boxShadows;
    const { pxToRem } = functions;

    /**Changed from existing template  */

    // let backgroundValue = darkMode
    //   ? background.sidenav
    //   : linearGradient(palette.dark.main, gradients.dark.state);
    let backgroundValue = palette[themeColor].main;

    if (transparentSidenav) {
      backgroundValue = transparent.main;
    } else if (whiteSidenav) {
      backgroundValue = white.main;
    }

    // styles for the sidenav when miniSidenav={false}
    const drawerOpenStyles = () => ({
      background: backgroundValue,
      transform: "translateX(0)",
      transition: transitions.create("transform", {
        easing: transitions.easing.sharp,
        duration: transitions.duration.shorter,
      }),

      [breakpoints.up("xl")]: {
        boxShadow: transparentSidenav ? "none" : xxl,
        marginBottom: transparentSidenav ? 0 : "inherit",
        left: "0",
        width: sidebarWidth,
        transform: "translateX(0)",
        transition: transitions.create(["width", "background-color"], {
          easing: transitions.easing.sharp,
          duration: transitions.duration.enteringScreen,
        }),
      },
    });

    // styles for the sidenav when miniSidenav={true}
    const drawerCloseStyles = () => ({
      background: backgroundValue,
      transform: `translateX(${pxToRem(-320)})`,
      transition: transitions.create("transform", {
        easing: transitions.easing.sharp,
        duration: transitions.duration.shorter,
      }),

      [breakpoints.up("xl")]: {
        boxShadow: transparentSidenav ? "none" : xxl,
        marginBottom: transparentSidenav ? 0 : "inherit",
        left: "0",
        width: pxToRem(96),
        overflowX: "hidden",
        transform: "translateX(0)",
        transition: transitions.create(["width", "background-color"], {
          easing: transitions.easing.sharp,
          duration: transitions.duration.shorter,
        }),
      },
    });

    return {
      "& .MuiDrawer-paper": {
        boxShadow: xxl,
        border: "none",

        ...(miniSidenav ? drawerCloseStyles() : drawerOpenStyles()),
      },
    };
  }
);
