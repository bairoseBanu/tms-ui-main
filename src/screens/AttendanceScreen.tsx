import { useEffect, useState } from "react";
import MDTab from "components/Tab/MDTab";
import MDBox from "components/MDBox";
import Calendar from "examples/Calendar";
import { bankHolidays } from "data/bankholidays.data";
import { Grid, Icon, IconButton, Tooltip } from "@mui/material";
import { TimeSheetFormValues } from "types/timesheet-form-values";
import { Message } from "types/message";
import { isTimeDiffValid } from "lib/isTimeDiffValid";
import { DateClickArg } from "@fullcalendar/interaction";
import TMSLoader from "components/TMSLoader";
import { deleteTimeSheet, newTimeSheet } from "apis/time.api";
import TMSSnackbar from "components/TMSSnackbar";
import useApiCall from "hooks/useApiCall";
import { HolidayDoc, TimeSheetDoc } from "types/api-response";
import TimeFormOrValue from "components/TimeFormOrValue";
import HolidayFormOrValue from "components/HolidayFormOrValue";
import { HolidayFormValues } from "types/holiday-form-values";
import { deleteHoliday, newHoliday } from "apis/holiday.api";
import { getDateRange } from "lib/getDateRange";

interface FormStatus {
  visible: boolean;
  formType: "time" | "holiday";
  selectDate: string;
}

interface TimeSheetEvent {
  title: string;
  start: string;
  className: string;
  allDay: boolean;
}
interface HolidayEvent {
  title: string;
  start: string;
  end?: string;
  className: string;
  allDay: boolean;
}
const Attendance = () => {
  const [isFormLoading, setFormLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>({
    visible: false,
    formType: "time",
    selectDate: new Date().toISOString(),
  });

  const [timesheetFormValue, setTimeSheetFormValue] =
    useState<TimeSheetFormValues>({
      date: new Date().toISOString().split("T")[0],
      fromOne: "",
      toOne: "",
      isTimeSplit: false,
      fromTwo: "",
      toTwo: "",
      workedWith: "",
    });

  const [holidayFormValue, setHolidayFormValue] = useState<HolidayFormValues>({
    fromDate: new Date().toISOString().split("T")[0],
    fromDateDuration: "full",
    toDate: "",
    toDateDuration: "full",
    holidayType: "",
  });

  const [holidayEvents, setHolidayEvents] = useState<HolidayEvent[]>([]);
  const { data: timesheets, isLoading } =
    useApiCall<TimeSheetDoc[]>("timesheet");

  const { data: holidays, isLoading: isHolidayLoading } =
    useApiCall<HolidayDoc[]>("holiday");

  const timeSheetEvents = timesheets?.map((timesheet) => {
    let className = "event-info";
    if (timesheet.approvalStatus === "pending") {
      className = "event-warning";
    }
    if (timesheet.approvalStatus === "approved") {
      className = "event-success";
    }
    if (timesheet.approvalStatus === "rejected") {
      className = "event-error";
    }

    return {
      title: `time-${timesheet.approvalStatus}`,
      start: timesheet.date,
      className,
      allDay: true,
    } as TimeSheetEvent;
  });

  useEffect(() => {
    if (holidays && holidays.length > 0) {
      const _holidayEvents =
        holidays?.map((holiday) => {
          const { toDate } = holiday;
          let className = "event-info";
          if (holiday.approvalStatus === "pending") {
            className = "event-warning";
          }
          if (holiday.approvalStatus === "approved") {
            className = "event-success";
          }
          if (holiday.approvalStatus === "rejected") {
            className = "event-error";
          }
          let end;
          if (toDate) {
            const dt = new Date(toDate.split("T")[0]);
            dt.setDate(dt.getDate() + 1);
            end = dt.toISOString().split("T")[0];
          }
          return {
            title: `holiday-${holiday.approvalStatus}`,
            start: holiday.fromDate.split("T")[0],
            end,
            className,
            allDay: true,
          } as HolidayEvent;
        }) || [];
      setHolidayEvents(_holidayEvents);
    }
  }, [holidays]);

  const [message, setMessage] = useState<Message>({
    message: "",
    severity: "success",
  });

  const [currentTimeSheet, setCurrentTimeSheet] = useState<
    TimeSheetDoc | undefined
  >(undefined);

  const [currentHoliday, setCurrentHoliday] = useState<HolidayDoc | undefined>(
    undefined
  );

  const handleTimeDelete = async (timesheet: TimeSheetDoc) => {
    setFormLoading(true);
    const response = await deleteTimeSheet(timesheet.date);
    if (response.status !== 200) {
      setMessage({ message: "Error in Deleting the time", severity: "error" });
      setFormLoading(false);
      return;
    }
    setMessage({
      message: "Successfully Deleted the TimeSheet",
      severity: "success",
    });

    setFormLoading(false);
  };

  const handleHolidayDelete = async (holiday: HolidayDoc) => {
    setFormLoading(true);
    const response = await deleteHoliday(holiday.id);
    if (response.status !== 200) {
      setMessage({
        message: "Error in Deleting the Holiday",
        severity: "error",
      });
      setFormLoading(false);
      return;
    }
    setMessage({
      message: "Successfully Deleted the Holiday",
      severity: "success",
    });

    setFormLoading(false);
  };

  const handleHolidaySubmit = async (holidayForm: HolidayFormValues) => {
    setFormLoading(true);
    try {
      if (holidayForm.toDate && !holidayForm.toDateDuration) {
        holidayForm.toDateDuration = "full";
      }
      const response = await newHoliday(holidayForm);
      if (response.status !== 201 || response.data.errors) {
        console.log({ errors: response.data.errors });
        setMessage({
          message: "Error in Adding the Holiday",
          severity: "error",
        });
        setFormLoading(false);
        return;
      }
      const newHol = response.data as HolidayDoc;
      let end;
      if (newHol?.toDate) {
        const dt = new Date(newHol?.toDate.split("T")[0]);
        dt.setDate(dt.getDate() + 1);
        end = dt.toISOString().split("T")[0];
      }
      const newHolEvent = {
        title: `holiday-${newHol.approvalStatus}`,
        start: newHol.fromDate.split("T")[0],
        end,
        className: "event-warning",
        allDay: true,
      };
      setHolidayEvents([...holidayEvents, newHolEvent]);

      setMessage({
        message: "Successfully Added the Holiday",
        severity: "success",
      });
      setFormLoading(false);
    } catch (error: unknown) {
      setMessage({
        message: `Something went wrong!`,
        severity: "error",
      });
      setFormLoading(false);
    }
  };

  const handleTimeSubmit = async (timesheetForm: TimeSheetFormValues) => {
    setFormLoading(true);
    const { fromOne, toOne, isTimeSplit, fromTwo, toTwo } = timesheetForm;

    if (!isTimeDiffValid(fromOne, toOne)) {
      setMessage({ message: "First Time must be valid", severity: "error" });
    }

    if (isTimeSplit) {
      if (!fromTwo || !toTwo) {
        setMessage({
          message: "Second Time Must be entered",
          severity: "error",
        });

        return;
      }
      if (!isTimeDiffValid(fromTwo, toTwo)) {
        setMessage({
          message: "Second Time must be valid",
          severity: "error",
        });
      }
    }
    const response = await newTimeSheet(timesheetForm);
    if (response.status !== 201) {
      setMessage({ message: "Error in Adding the time", severity: "error" });
      setFormLoading(false);
      return;
    }
    const timesheetDoc = response.data as TimeSheetDoc;
    timesheets.push(timesheetDoc);
    setCurrentTimeSheet(timesheetDoc);
    setMessage({
      message: "Successfully Added the TimeSheet",
      severity: "success",
    });

    setFormLoading(false);
  };

  const data = [
    {
      title: "Timesheet Request",
      component: (
        <TimeFormOrValue
          date={formStatus.selectDate}
          onTimeSheetSubmit={handleTimeSubmit}
          timesheet={currentTimeSheet}
          timesheetFormValue={timesheetFormValue}
          onDelete={handleTimeDelete}
        />
      ),
    },
    {
      title: "Holiday Request",
      component: (
        <HolidayFormOrValue
          date={formStatus.selectDate}
          onHolidaySubmit={handleHolidaySubmit}
          holiday={currentHoliday}
          holidayFormValue={holidayFormValue}
          onDelete={handleHolidayDelete}
        />
      ),
    },
  ];

  const setTimeSheetValue = (event: TimeSheetEvent) => {
    const _timeSheet = timesheets.find(
      (timesheet) => timesheet.date === event.start
    );
    setCurrentTimeSheet(_timeSheet);
    setTimeSheetFormValue({
      date: _timeSheet.date.split("T")[0],
      fromOne: _timeSheet.fromOne,
      toOne: _timeSheet.toOne,
      isTimeSplit: _timeSheet.isTimeSplit,
      fromTwo: _timeSheet.fromTwo,
      toTwo: _timeSheet.toTwo,
      workedWith: _timeSheet.workedWith,
    });
  };
  const setTimeSheetForm = (dateString: string) => {
    setCurrentTimeSheet(undefined);
    setTimeSheetFormValue({
      date: dateString.split("T")[0],
      fromOne: "",
      toOne: "",
      isTimeSplit: false,
      fromTwo: "",
      toTwo: "",
      workedWith: "",
    });
  };

  const setHolidayValue = (event: HolidayEvent) => {
    const _holiday = holidays.find((holiday) => {
      const dates = getDateRange(event.start, event.end);
      console.log({ dates, holiday: holiday.fromDate });
      return (
        dates.includes(holiday.fromDate.split("T")[0]) ||
        dates.includes(holiday.toDate?.split("T")[0])
      );
    });

    setCurrentHoliday(_holiday);
    setHolidayFormValue({
      fromDate: _holiday.fromDate.split("T")[0],
      fromDateDuration: _holiday.fromDateDuration,
      toDate: _holiday?.toDate?.split("T")[0],
      toDateDuration: _holiday?.toDateDuration,
      holidayType: _holiday.holidayType,
    });
  };

  const setHolidayForm = (dateString: string) => {
    setCurrentHoliday(undefined);
    setHolidayFormValue((prev) => ({
      ...prev,
      fromDate: dateString.split("T")[0],
      toDate: dateString.split("T")[0],
    }));
  };
  const handleMsgClose = () => {
    setMessage({ message: "", severity: "success" });
  };
  const handleDateClick = (dateClickArg: DateClickArg) => {
    const dateString = new Date(dateClickArg.dateStr).toISOString();
    const clickedDate = dateString.split("T")[0];
    const timeEvent = timeSheetEvents.find((event) => {
      return event.start === dateString;
    });
    const holidayEvent = holidayEvents.find((event) => {
      const dates = getDateRange(event.start, event.end);
      return dates.includes(clickedDate);
    });
    if (timeEvent === undefined) {
      setTimeSheetForm(dateString);
    }

    // if (holidayEvent === undefined) {
    //   setHolidayForm(dateString);
    // }

    timeEvent ? setTimeSheetValue(timeEvent) : setTimeSheetForm(dateString);
    holidayEvent ? setHolidayValue(holidayEvent) : setHolidayForm(dateString);

    setFormStatus((prev) => ({
      ...prev,
      visible: true,
      selectDate: dateString,
    }));
  };
  if (isLoading || isHolidayLoading) {
    return <TMSLoader />;
  }
  return (
    <Grid container spacing={1} alignItems="stretch" maxHeight={"80vh"}>
      <Grid
        item
        xs={formStatus.visible ? 6 : 12}
        maxHeight={"80vh"}
        overflow={"hidden"}
      >
        <Calendar
          dateClick={handleDateClick}
          selectable
          editable
          events={[...bankHolidays, ...holidayEvents, ...timeSheetEvents]}
          isFullWidth={true}
          height={"100%"}
        />
      </Grid>
      {formStatus.visible && (
        <Grid
          item
          xs={6}
          flexDirection={"column"}
          display="flex"
          flexGrow={1}
          height={"100%"}
        >
          <MDBox display={"flex"} justifyContent={"flex-end"} pb={1}>
            <Tooltip title="close form" placement="top">
              <IconButton
                onClick={() =>
                  setFormStatus((prev) => ({ ...prev, visible: false }))
                }
                size="small"
                sx={{ "&:hover": { backgroundColor: "grey.400" } }}
              >
                <Icon
                  color="action"
                  fontSize="small"
                  sx={{ textShadow: "1px 2px 5px" }}
                >
                  close
                </Icon>
              </IconButton>
            </Tooltip>
          </MDBox>
          <MDBox flexGrow={1} sx={{ width: "100%" }}>
            {!isFormLoading && (
              <>
                <MDTab
                  data={data}
                  styleProps={{ backgroundColor: "transparent" }}
                />
                {message?.message && (
                  <TMSSnackbar
                    message={message.message}
                    severity={message.severity}
                    open={!!message.message}
                    handleClose={handleMsgClose}
                  />
                )}
              </>
            )}
            {isFormLoading && <TMSLoader />}
          </MDBox>
        </Grid>
      )}
    </Grid>
  );
};
export default Attendance;
