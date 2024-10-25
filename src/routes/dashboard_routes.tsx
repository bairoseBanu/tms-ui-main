import Icon from "@mui/material/Icon";
import { ReactNode } from "react";
import Approvals from "screens/ApprovalScreen";
import Policy from "screens/PolicyScreen";
import Attendance from "screens/AttendanceScreen";
import RTWLinks from "screens/RTWLinksScreen";
import EmployeeProof from "screens/EmployeeProofScreen";
import HomeScreen from "screens/HomeScreen";
import AnalyticsScreen from "screens/AnalyticsScreen";
import EmployeeListScreen from "screens/EmployeeListScreen";
import PayScreen from "screens/PayScreen";
import OrganizationScreen from "screens/OrganizationScreen";
import DocumentsScreen from "screens/DocumentsScreen";
import TMSPayment from "components/TMSPayment";

export type Route = {
  key: string;
  name: string;
  icon: ReactNode;
};

export type ExternalLinkRoute = Route & {
  type: "external";
  href: string;
  role: string[];
};

export type ChildRoute = Omit<NavLinkRoute, "icon">;

export type NavLinkRoute = Route & {
  type: "navlink";
  path: string;
  collapse?: ChildRoute[];
  component: ReactNode;
  role: string[];
};

export type NavigatableRoute = NavLinkRoute | Collapsible;

// may it scary to look it first time.
// in simple words, it takes NavLinkRoute and make all fields required and omit several fields
export type Collapsible = Omit<
  Required<NavLinkRoute>,
  "path" | "component" | "type"
> & {
  type: "collapsible";
};

export type DashBoardRoute = ExternalLinkRoute | NavLinkRoute | Collapsible;

export type DashBoardRoutes = DashBoardRoute[];

const routes: DashBoardRoutes = [
  {
    type: "navlink",
    name: "Dashboard",
    key: "dashboard",
    path: "/",
    component: <HomeScreen />,
    icon: <Icon fontSize="medium">home</Icon>,
    role: ["Admin", "RootAdmin", "Employee"],
  },
  {
    type: "navlink",
    name: "Employees",
    key: "employees",
    path: "/employees",
    component: <EmployeeListScreen />,
    icon: <Icon fontSize="medium">person_apron</Icon>,
    role: ["Admin", "RootAdmin"],
  },
  {
    type: "navlink",
    name: "Approval",
    key: "approval",
    path: "/approvals",
    component: <Approvals />,
    icon: <Icon fontSize="medium">approval</Icon>,
    role: ["Admin", "RootAdmin"],
  },
  {
    type: "navlink",
    name: "Policies",
    key: "policies",
    path: "/policies",
    component: <Policy />,
    icon: <Icon fontSize="medium">policy</Icon>,
    role: ["Admin", "RootAdmin", "Employee"],
  },
  {
    type: "navlink",
    name: "Attendance",
    key: "attendance",
    path: "/attendance",
    component: <Attendance />,
    icon: <Icon fontSize="medium">people_icon</Icon>,
    role: ["Admin", "RootAdmin", "Employee"],
  },
  {
    type: "navlink",
    name: "RTW Links",
    key: "rtwlinks",
    path: "/rtw-links",
    component: <RTWLinks />,
    icon: <Icon fontSize="medium">fact_check</Icon>,
    role: ["Admin", "RootAdmin", "Employee"],
  },
  {
    type: "navlink",
    name: "Employee Proofs",
    key: "employeeproofs",
    path: "/employee-proofs",
    component: <EmployeeProof />,
    icon: <Icon fontSize="medium">rule_folder</Icon>,
    role: ["Admin", "RootAdmin", "Employee"],
  },
  {
    type: "navlink",
    name: "Payroll",
    key: "payroll",
    path: "/payroll",
    component: <PayScreen />,
    icon: <Icon fontSize="medium">receipt_long</Icon>,
    role: ["Employee", "Admin", "RootAdmin"],
  },
  {
    type: "navlink",
    name: "Analytics",
    key: "analytics",
    path: "/analytics",
    component: <AnalyticsScreen />,
    icon: <Icon fontSize="medium">insights</Icon>,
    role: ["Employee", "Admin", "RootAdmin"],
  },
  {
    type: "navlink",
    name: "organization",
    key: "organization",
    path: "/organization",
    component: <OrganizationScreen />,
    icon: <Icon fontSize="medium">insights</Icon>,
    role: ["Employee", "Admin", "RootAdmin"],
  },

  {
    type: "navlink",
    name: "Documents",
    key: "Documents",
    path: "/Documents",
    component: <DocumentsScreen />,
    icon: <Icon fontSize="medium">insights</Icon>,
    role: ["Employee", "Admin", "RootAdmin"],
  },
  {
    type: "navlink",
    name: "Subscription",
    key: "Subscription",
    path: "/subscription",
    component: <TMSPayment />,
    icon: <Icon fontSize="medium">insights</Icon>,
    role: ["Employee", "Admin", "RootAdmin"],
  },
];

export default routes;
