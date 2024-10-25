import { FC, useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import MDBox from "./MDBox";
import { Employee, HolidayDoc } from "types/api-response";
import MDButton from "./MDButton";
import { useAppData } from "hooks/useAppData";
import { HolidayFormValues } from "types/holiday-form-values";
import HolidayForm from "./HolidayForm";

interface Props {
  date: string;
  onHolidaySubmit: (value: HolidayFormValues) => void;
  holidayFormValue: HolidayFormValues;
  holiday: HolidayDoc;
  onDelete: (holiday: HolidayDoc) => void;
}

const HolidayFormOrValue: FC<Props> = ({
  onHolidaySubmit,
  holidayFormValue,
  holiday,
  onDelete,
}) => {
  const [isForm, setIsForm] = useState(true);
  const [shortMonth, setShortMonth] = useState("");
  const [day, setDay] = useState(1);
  const { appData } = useAppData();
  const [user, setUser] = useState<Employee>();

  useEffect(() => {
    if (holiday) {
      const _user = appData.employees.find(
        (emp) => emp.id === holiday?.employeeId
      );
      setUser(_user);
    }
  }, [appData.employees, holiday, holiday?.employeeId]);
  const getApprovedBy = (id: string) => {
    let name = "";
    const employee = appData.employees.find((emp) => emp.id === id);
    if (employee) {
      name = `${employee.lastName}`;
    }
    return name;
  };

  useEffect(() => {
    if (holiday) {
      setIsForm(false);
    } else {
      setIsForm(true);
    }
  }, [holiday]);

  useEffect(() => {
    const month = holiday
      ? new Date(holiday.fromDate).toLocaleString("default", {
          month: "short",
        })
      : undefined;
    setShortMonth(month);
    const _day = holiday ? new Date(holiday.fromDate).getDate() : undefined;
    setDay(_day);
  }, [holiday]);

  return (
    <MDBox>
      {isForm && (
        <HolidayForm
          onSubmitForm={onHolidaySubmit}
          formValues={holidayFormValue}
        />
      )}
      {!isForm && holiday && (
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
                    Starting Date
                  </Typography>
                  <Typography>:</Typography>
                  <Typography ml={2}>
                    {holiday.fromDate.split("T")[0]}
                  </Typography>
                </MDBox>
                <MDBox display={"flex"} justifyContent={"stretch"}>
                  <Typography textAlign={"left"} width={150}>
                    No of days
                  </Typography>
                  <Typography>:</Typography>
                  <Typography ml={2}>{holiday.noOfDays}</Typography>
                </MDBox>
                {holiday.toDate && (
                  <MDBox display={"flex"} justifyContent={"stretch"}>
                    <Typography textAlign={"left"} width={150}>
                      End date
                    </Typography>
                    <Typography>:</Typography>
                    <Typography ml={2}>
                      {holiday.toDate.split("T")[0]}
                    </Typography>
                  </MDBox>
                )}
                {holiday.toDateDuration && (
                  <MDBox
                    display={"flex"}
                    justifyContent={"stretch"}
                    width={300}
                  >
                    <Typography textAlign={"left"} width={150}>
                      Time Duration
                    </Typography>
                    <Typography>:</Typography>
                    <Typography ml={2}>{holiday.toDateDuration}</Typography>
                  </MDBox>
                )}
                <MDBox display={"flex"} justifyContent={"stretch"} width={300}>
                  <Typography textAlign={"left"} width={150}>
                    Holiday Type
                  </Typography>
                  <Typography>:</Typography>
                  <Typography ml={2}>{holiday.holidayType}</Typography>
                </MDBox>
                <MDBox display={"flex"} justifyContent={"stretch"} width={300}>
                  <Typography textAlign={"left"} width={150}>
                    Status
                  </Typography>
                  <Typography>:</Typography>
                  <Typography ml={2}>{holiday.approvalStatus}</Typography>
                </MDBox>
                {holiday.approvedBy && (
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
                      {getApprovedBy(holiday.approvedBy)}
                    </Typography>
                  </MDBox>
                )}
              </MDBox>
              <MDBox display="flex" justifyContent={"center"} gap={3} py={3}>
                {/* <MDButton
                  variant="gradient"
                  color="info"
                  startIcon={<EditIcon />}
                  onClick={() => handleHolidayEdit()}
                >
                  Edit
                </MDButton> */}
                <MDButton
                  variant="gradient"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => onDelete(holiday)}
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

export default HolidayFormOrValue;
