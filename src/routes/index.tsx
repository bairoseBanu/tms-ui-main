import BranchScreen from "screens/BranchScreen";
import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import Auth from "./auth/auth";
import Signin from "./auth/signin";
import Signup, { action as signupAction } from "./auth/signup/signup";
import DashBoard from "./dashboard/dashboard";
import routes, {
  ChildRoute,
  DashBoardRoute,
  DashBoardRoutes,
  NavigatableRoute,
} from "./dashboard_routes";
import EmployeeScreen from "screens/EmployeeScreen";
import { protectedLoader, pushThroughProtected } from "lib/auth";
import { AppDataProvider } from "context/appData";
import Success from "components/Success";
import Cancel from "components/Cancel";
import ForgotPwd from "./auth/forgotPwd";
import VerifyResetLink from "./auth/verifyResetLink";
import OrganizationScreen from "screens/OrganizationScreen";
import ConfigurationScreen from "screens/ConfigurationScreen";
import { ConfigPerBranchScreen } from "screens/ConfigPerBranchScreen";
import DeactivateEmployeeScreen from "screens/DeactivateEmployeeScreen";
function isNavigatable(route: DashBoardRoute): route is NavigatableRoute {
  return route.type === "navlink" || route.type === "collapsible";
}

const convertChildRoutes = (routes: ChildRoute[]) => {
  return routes.map(({ path, component }) => ({ path, element: component }));
};

const convertIntoProperRoutes = (routes: DashBoardRoutes) => {
  return routes
    .filter(isNavigatable)
    .map((route) =>
      route.type === "navlink"
        ? { path: route.path, element: route.component }
        : convertChildRoutes(route.collapse)
    )
    .flat();
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppDataProvider>
        <Root />
      </AppDataProvider>
    ),
    children: [
      {
        path: "/auth",
        element: <Auth></Auth>,
        children: [
          {
            path: "",
            element: <Signin />,
          },
          {
            path: "signup",
            element: <Signup></Signup>,
            action: signupAction,
          },
          {
            path: "forgotpwd",
            element: <ForgotPwd />,
            action: signupAction,
          },
        ],
        loader: pushThroughProtected(() => {
          console.log("emptied");
          return {};
        }),
      },
      {
        path: "/test",
        element: <>hello</>,
      },
      {
        path: "/verifyreset",
        element: <Auth></Auth>,
        children: [
          {
            path: ":id",
            element: <VerifyResetLink />,
          },
        ],
      },
      {
        path: "",
        element: (
          <AppDataProvider>
            <DashBoard routes={routes}></DashBoard>
          </AppDataProvider>
        ),
        children: [...convertIntoProperRoutes(routes)],
        loader: protectedLoader(() => ({})),
      },
      {
        path: "settings",
        children: [
          {
            path: "",
            element: (
              // <AppDataProvider>
              <DashBoard routes={routes}></DashBoard>
              // </AppDataProvider>
            ),
            children: [
              {
                path: "branch",
                element: <BranchScreen />,
              },
              {
                path: "branchconfig",
                element: <ConfigPerBranchScreen />,
              },
              {
                path: "employee",
                element: <EmployeeScreen />,
              },
              {
                path: "config",
                element: <ConfigurationScreen />,
              },
              {
                path: "deactivate",
                element: <DeactivateEmployeeScreen />,
              },
            ],
            loader: protectedLoader(() => ({})),
          },
        ],
      },
    ],
  },
  {
    path: "organization",
    element: <OrganizationScreen />,
    loader: protectedLoader(() => ({})),
  },
  {
    path: "/success",
    element: <Success />,
  },
  {
    path: "/cancel",
    element: <Cancel />,
  },
]);
