import { FC, useEffect, useState } from "react";
import TimeSheet from "./TimeForm";
import { Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import MDBox from "./MDBox";
import { TimeSheetFormValues } from "types/timesheet-form-values";
import { Employee, TimeSheetDoc } from "types/api-response";
import MDButton from "./MDButton";
import { useAppData } from "hooks/useAppData";

interface Props {
  date: string;
  onTimeSheetSubmit: (value: TimeSheetFormValues) => void;
  timesheetFormValue: TimeSheetFormValues;
  timesheet: TimeSheetDoc;
  onDelete: (timesheet: TimeSheetDoc) => void;
}

const TimeFormOrValue: FC<Props> = ({
  onTimeSheetSubmit,
  timesheetFormValue,
  timesheet,
  onDelete,
}) => {
  const [isForm, setIsForm] = useState(true);
  const [shortMonth, setShortMonth] = useState("");
  const [day, setDay] = useState(1);
  const { appData } = useAppData();
  const [user, setUser] = useState<Employee>();

  useEffect(() => {
    if (timesheet) {
      const _user = appData.employees.find(
        (emp) => emp.id === timesheet?.employeeId
      );
      setUser(_user);
    }
  }, [appData.employees, timesheet, timesheet?.employeeId]);

  const getApprovedBy = (id: string) => {
    let name = "";
    const employee = appData.employees.find((emp) => emp.id === id);
    if (employee) {
      name = `${employee.lastName}`;
    }
    return name;
  };

  useEffect(() => {
    if (timesheet) {
      setIsForm(false);
    } else {
      setIsForm(true);
    }
  }, [timesheet]);

  useEffect(() => {
    const month = timesheet
      ? new Date(timesheet.date).toLocaleString("default", {
          month: "short",
        })
      : undefined;
    setShortMonth(month);
    const _day = timesheet ? new Date(timesheet.date).getDate() : undefined;
    setDay(_day);
  }, [timesheet]);

  const handleTimeEdit = () => {
    setIsForm(true);
  };

  return (
    <MDBox>
      {isForm && (
        <TimeSheet
          onSubmitForm={onTimeSheetSubmit}
          formValues={timesheetFormValue}
        />
      )}
      {!isForm && timesheet && (
        <Stack>
          <MDBox position={"relative"} maxHeight={"100%"} py={5}>
            <MDBox
              bgColor="background.default"
              color="info"
              textAlign={"center"}
              width="20%"
              top={10}
              right={10}
              position={"absolute"}
              border="5px solid"
              borderColor={"info"}
              boxShadow={4}
            >
              <Typography>{shortMonth}</Typography>
              <Typography>{day}</Typography>
            </MDBox>
            <MDBox color="white" pt={4} pl={3} pr={3}>
              <MDBox textAlign={"center"}>
                {user ? `${user.firstName} ${user.lastName}` : ""}
              </MDBox>
              <MDBox px={5} py={1} textAlign={"center"}>
                <MDBox display={"flex"} justifyContent={"stretch"}>
                  <Typography textAlign={"left"} width={150}>
                    Worked With
                  </Typography>
                  <Typography>:</Typography>
                  <Typography ml={2}>{timesheet.workedWith}</Typography>
                </MDBox>
                <MDBox display={"flex"} justifyContent={"stretch"}>
                  <Typography textAlign={"left"} width={150}>
                    Time Duration
                  </Typography>
                  <Typography>:</Typography>
                  <Typography ml={2}>
                    {(timesheet.totalHoursInMins / 60).toFixed(2)} Hrs
                  </Typography>
                </MDBox>
                <MDBox display={"flex"} justifyContent={"stretch"}>
                  <Typography textAlign={"left"} width={150}>
                    From
                  </Typography>
                  <Typography>:</Typography>
                  <Typography ml={2}>{timesheet.fromOne}</Typography>
                </MDBox>
                <MDBox display={"flex"} justifyContent={"stretch"} width={300}>
                  <Typography textAlign={"left"} width={150}>
                    To
                  </Typography>
                  <Typography>:</Typography>
                  <Typography ml={2}>{timesheet.toOne}</Typography>
                </MDBox>
                {timesheet.fromTwo && (
                  <MDBox
                    display={"flex"}
                    justifyContent={"stretch"}
                    width={300}
                  >
                    <Typography textAlign={"left"} width={150}>
                      From
                    </Typography>
                    <Typography>:</Typography>
                    <Typography ml={2}>{timesheet.fromTwo}</Typography>
                  </MDBox>
                )}
                {timesheet.toTwo && (
                  <MDBox
                    display={"flex"}
                    justifyContent={"stretch"}
                    width={300}
                  >
                    <Typography textAlign={"left"} width={150}>
                      To
                    </Typography>
                    <Typography>:</Typography>
                    <Typography ml={2}>{timesheet.toTwo}</Typography>
                  </MDBox>
                )}

                <MDBox display={"flex"} justifyContent={"stretch"} width={300}>
                  <Typography textAlign={"left"} width={150}>
                    Status
                  </Typography>
                  <Typography>:</Typography>
                  <Typography ml={2}>{timesheet.approvalStatus}</Typography>
                </MDBox>
                {timesheet.approvedBy && (
                  <MDBox
                    display={"flex"}
                    justifyContent={"stretch"}
                    width={300}
                  >
                    <Typography textAlign={"left"} width={150}>
                      Approved By
                    </Typography>
                    <Typography>:</Typography>
                    <Typography ml={2}>
                      {getApprovedBy(timesheet.approvedBy)}
                    </Typography>
                  </MDBox>
                )}
              </MDBox>
              <MDBox display="flex" justifyContent={"center"} gap={3} py={3}>
                <MDButton
                  variant="gradient"
                  color="info"
                  startIcon={<EditIcon />}
                  onClick={() => handleTimeEdit()}
                >
                  Edit
                </MDButton>
                <MDButton
                  variant="gradient"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => onDelete(timesheet)}
                >
                  Delete
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </Stack>
      )}
    </MDBox>
  );
};

export default TimeFormOrValue;
