import { useMemo, ReactNode } from "react";

// react-chartjs-2 components

import { Chart as ChartJS } from "chart.js/auto";

import {
  CategoryScale,
  LinearScale,
  Legend,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
} from "chart.js";
import { Pie } from "react-chartjs-2";

// import { Chart as ReactChartJs } from 'react-chartjs-2';

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import configs from "./configs";

// PieChart configurations

// Declaring props types for PieChart
export interface PieChartProps {
  icon?: {
    color?:
      | "primary"
      | "secondary"
      | "info"
      | "success"
      | "warning"
      | "error"
      | "light"
      | "dark";
    component: ReactNode;
  };
  title?: string;
  description?: string | ReactNode;
  height?: string | number;
  chart: {
    labels: string[];
    datasets: {
      label: string;
      backgroundColors: string[];
      data: number[];
    };
  };
  [key: string]: any;
}

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  Legend,
  PointElement,
  LineElement,
  Title,
  Tooltip
);
function PieChart({
  icon,
  title,
  description,
  height,
  chart,
}: PieChartProps): JSX.Element {
  const { data, options } = configs(chart.labels || [], chart.datasets || {});

  const renderChart = (
    <MDBox py={2} pr={2} pl={icon.component ? 1 : 2}>
      {title || description ? (
        <MDBox display="flex" px={description ? 1 : 0} pt={description ? 1 : 0}>
          {icon.component && (
            <MDBox
              width="4rem"
              height="4rem"
              bgColor={icon.color || "info"}
              variant="gradient"
              coloredShadow={icon.color || "info"}
              borderRadius="xl"
              display="flex"
              justifyContent="center"
              alignItems="center"
              color="white"
              mt={-5}
              mr={2}
            >
              <Icon fontSize="medium">{icon.component}</Icon>
            </MDBox>
          )}
          <MDBox mt={icon.component ? -2 : 0}>
            {title && <MDTypography variant="h6">{title}</MDTypography>}
            <MDBox mb={2}>
              <MDTypography component="div" variant="button" color="text">
                {description}
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      ) : null}
      {useMemo(
        () => (
          <MDBox height={height}>
            <Pie data={data} options={options} />
          </MDBox>
        ),
        [data, height, options]
      )}
    </MDBox>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
}

// Declaring default props for PieChart
PieChart.defaultProps = {
  icon: { color: "info", component: "" },
  title: "",
  description: "",
  height: "19.125rem",
};

export default PieChart;
