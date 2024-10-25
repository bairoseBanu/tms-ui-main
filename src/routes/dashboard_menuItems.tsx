import { signOut } from "lib/auth";

export const DashboardMenuItems = {
  SettingsMenuItems: [
    {
      src: "/settings/config",
      iconName: "settings_applications",
      title: "Configure",
    },
    {
      src: "/settings/branch",
      iconName: "apartment",
      title: "Create New Branch",
    },
    {
      src: "/settings/employee",
      iconName: "person_add",
      title: "Create New Employee",
    },
    {
      src: "/settings/deactivate",
      iconName: "person_add",
      title: "De-Activate Employee",
    },
  ],
  AccountMenuItems: [
    {
      src: "/auth",
      iconName: "logout",
      title: "Logout",
      handleClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        console.log({ e });
        signOut();
      },
    },
  ],
};
