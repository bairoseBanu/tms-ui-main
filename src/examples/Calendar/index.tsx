// @fullcalendar components
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Custom styles for Calendar
import CalendarRoot from "examples/Calendar/CalendarRoot";

// Material Dashboard 2 PRO React context
import { useMaterialUIController } from "context";
import { CalendarOptions } from "@fullcalendar/core";

// Declaring props types for the Calender
interface Props extends CalendarOptions {
  header?: {
    title?: string;
    date?: string;
  };
  isFullWidth?: boolean;
  [key: string]: any;
}

function Calendar({
  header,
  isFullWidth = false,
  events,
  ...rest
}: Props): JSX.Element {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  // const validClassNames = [
  //   "primary",
  //   "secondary",
  //   "info",
  //   "success",
  //   "warning",
  //   "error",
  //   "light",
  //   "dark",
  // ];

  // const events = rest.events
  //   ? rest.events.map((el: any) => ({
  //       ...el,
  //       className: validClassNames.find((item) => item === el.className)
  //         ? `event-${el.className}`
  //         : "event-info",
  //     }))
  //   : [];

  return (
    <Card sx={{ height: "100%", width: isFullWidth ? "100%" : "65%" }}>
      <MDBox pt={header.title || header.date ? 2 : 0} px={2} lineHeight={1}>
        {header.title ? (
          <MDTypography
            variant="h6"
            fontWeight="medium"
            textTransform="capitalize"
          >
            {header.title}
          </MDTypography>
        ) : null}
        {header.date ? (
          <MDTypography
            component="p"
            variant="button"
            color="text"
            fontWeight="regular"
          >
            {header.date}
          </MDTypography>
        ) : null}
      </MDBox>
      <CalendarRoot p={2} ownerState={{ darkMode }}>
        <FullCalendar
          {...rest}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          events={events}
          height="100%"
        />
      </CalendarRoot>
    </Card>
  );
}

// Declaring default props for Calendar
Calendar.defaultProps = {
  header: {
    title: "",
    date: "",
  },
};

export default Calendar;
