import { DashBoardRoutes } from "routes/dashboard_routes";
import { extractPayload } from "./auth";

export const filterDashboardRoutes = (routes: DashBoardRoutes) => {
  const { role } = extractPayload();
  return routes.filter((route) => route.role.includes(role));
};
