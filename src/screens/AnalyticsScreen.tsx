import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import MDBox from "components/MDBox";

import { Grid } from "@mui/material";
import TMSHolidaychart from "components/TMSHolidayChart";
import TMSHoursChart from "components/TMSHoursChart";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import { hoursData as DataHoursData } from "data/homeScreen.data";
import MDTypography from "components/MDTypography";
// import VerticalBarChart from "components/BarCharts/VerticalBarChart";

function AnalyticsScreen() {
  const { pathname } = useLocation();
  const [lastSixMonths, setLastSixMonths] = useState([]);
  const monthMap: any = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  };

  useEffect(() => {
    const dt = new Date();
    const currMonth = dt.getMonth();
    const months = [];

    for (let i = 0; i < 6; i++) {
      const newMonth = currMonth - i;
      if (newMonth >= 0) {
        months.push(monthMap[newMonth]);
      } else {
        months.push(monthMap[newMonth + 12]);
      }
    }
    setLastSixMonths(months.reverse());
  }, [pathname]);

  const verChartData: any = {
    labels: lastSixMonths,
    datasets: [
      {
        label: "Holidays in Month",
        color: "dark",
        data: [2, 4, 2, 3, 1, 5],
      },
    ],
  };

  const hoursData: any = {
    labels: lastSixMonths,
    datasets: [
      {
        label: "Hours worked in Month",
        color: "info",
        data: [140, 135, 129, 130, 135, 125],
      },
    ],
  };

  const holidayData: any = {
    labels: ["Annual", "Sick", "Unpaid", "Remaining"],
    datasets: {
      label: "Holiday types",
      backgroundColors: ["info", "primary", "dark", "secondary", "primary"],
      data: [15, 20, 12, 30],
    },
  };

  return (
    <MDBox width={"120%"}>
      <MDBox mt={5} mb={3}>
        <MDTypography variant="h5" mb={2} pl={0.5}>
          Holidays Data Analytics
        </MDTypography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} lg={4}>
            <TMSHolidaychart
              chart={holidayData}
              icon={{ color: "primary", component: "holiday_village" }}
              title="Holidays"
            />
          </Grid>
          {/* <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} /> */}
          <Grid item xs={12} sm={6} lg={8}>
            <VerticalBarChart chart={verChartData} title="Holidays by Month" />
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={5} mb={3}>
        <MDTypography variant="h5" mb={2} pl={0.5}>
          Hours Worked Data Analytics
        </MDTypography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} lg={4}>
            <TMSHoursChart
              chart={DataHoursData}
              icon={{ color: "primary", component: "hourglass_bottom" }}
              title="Hours Worked"
            />
          </Grid>
          {/* <Divider orientation="vertical" sx={{  }} /> */}
          <Grid item xs={12} sm={6} lg={8}>
            <VerticalBarChart chart={hoursData} title="Hours worked in Month" />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default AnalyticsScreen;
