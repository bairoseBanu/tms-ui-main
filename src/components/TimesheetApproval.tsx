import ApprovalComponent from "./ApprovalComponent";
import TimeSheetForm from "./TimeSheetForm";
import useApiCall from "hooks/useApiCall";
import TMSLoader from "./TMSLoader";
import { TimesheetWithEmployee } from "types/api-response";
import ApproveBtn from "./ApproveBtn";
import { approveTimeSheet } from "apis/time.api";
import { FC, useCallback, useEffect, useState } from "react";
import { Message } from "types/message";
import { VerificationStatus } from "types/employee-proof.type";

const toBeApprovedcolumns = [
  { Header: "Name", accessor: "name" },
  { Header: "Date", accessor: "date" },
  { Header: "Start Time", accessor: "fromOne" },
  { Header: "End Time", accessor: "toOne" },
  { Header: "Paid Break", accessor: "isTimeSplit" },
  { Header: "Start Time", accessor: "fromTwo" },
  { Header: "End Time", accessor: "toTwo" },
  { Header: "Total Hours", accessor: "totalHoursInMins" },
  { Header: "Worked With", accessor: "workedWith" },
  { Header: "Status", accessor: "status" },
];
const Approvedcolumns = [
  { Header: "Name", accessor: "name" },
  { Header: "Date", accessor: "date" },
  { Header: "Start Time", accessor: "fromOne" },
  { Header: "End Time", accessor: "toOne" },
  { Header: "Paid Break", accessor: "isTimeSplit" },
  { Header: "Start Time", accessor: "fromTwo" },
  { Header: "End Time", accessor: "toTwo" },
  { Header: "Total Hours", accessor: "totalHoursInMins" },
  { Header: "Worked With", accessor: "workedWith" },
  { Header: "Status", accessor: "status" },
];

interface Props {
  onMessage: (message: Message) => void;
}
function truncateString(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }

  // Truncate the string and add an ellipsis (...)
  return text.substring(0, maxLength - 3) + "...";
}
const TimesheetApproval: FC<Props> = ({ onMessage }) => {
  const { data: timesheetsWithEmployee, isLoading } =
    useApiCall<TimesheetWithEmployee[]>("timeapproval");
  const [load, setLoad] = useState(false);
  // const [message, setMessage] = useState<Message>({
  //   message: "",
  //   severity: "success",
  // });

  const [pendingTimes, setPendingTimes] = useState<TimesheetWithEmployee[]>([]);
  const [nonPendingTimes, setNonPendingTimes] = useState<
    TimesheetWithEmployee[]
  >([]);

  useEffect(() => {
    if (timesheetsWithEmployee && timesheetsWithEmployee.length > 0) {
      const pendingLists = timesheetsWithEmployee.filter(
        (time) => time.approvalStatus === "pending"
      );
      setPendingTimes(pendingLists);
      const nonPendingLists = timesheetsWithEmployee.filter(
        (time) => time.approvalStatus !== "pending"
      );
      setNonPendingTimes(nonPendingLists);
    }
  }, [timesheetsWithEmployee]);
  const handleVerify = useCallback(
    async (id: string, status: VerificationStatus) => {
      console.log(id, status);
      setLoad(true);
      const clonedPendingTimes = [...pendingTimes];
      const clonedNonPendingTimes = [...nonPendingTimes];
      const response = await approveTimeSheet(id, status);
      if (response.status === 201) {
        const newTime = clonedPendingTimes.find((time, index, array) => {
          if (time.id === id) {
            array.splice(index, 1);
            return true;
          }
          return false;
        });
        newTime.approvalStatus = status;
        clonedNonPendingTimes.push(newTime);

        setPendingTimes(clonedPendingTimes);
        setNonPendingTimes(clonedNonPendingTimes);
        onMessage({ message: "approved successfully", severity: "success" });
        setLoad(false);
      } else {
        onMessage({
          message: "Error in Approving",
          severity: "error",
        });
        setLoad(false);
      }
      setLoad(false);
    },
    [nonPendingTimes, onMessage, pendingTimes]
  );

  const fomatTime = useCallback(
    (timeData: TimesheetWithEmployee[]) => {
      return timeData.map((time) => {
        const {
          date,
          fromOne,
          toOne,
          fromTwo,
          toTwo,
          isTimeSplit,
          workedWith,
          totalHoursInMins,
          approvalStatus,
        } = time;
        return {
          name: `${time.employeeId.firstName} ${time.employeeId.lastName}`,
          date: date.split("T")[0],
          fromOne,
          toOne,
          fromTwo: fromTwo || "-",
          toTwo: toTwo || "-",
          isTimeSplit: isTimeSplit ? "No" : "Yes", // this is for paid break
          workedWith: truncateString(workedWith, 10),
          totalHoursInMins: (totalHoursInMins / 60).toFixed(2),
          status:
            approvalStatus === "pending" ? (
              <ApproveBtn
                id={time.id}
                onApprove={(id: string) => handleVerify(id, "approved")}
                onReject={(id: string) => handleVerify(id, "rejected")}
              />
            ) : (
              approvalStatus
            ),
          id: time.id,
        };
      });
    },
    [handleVerify]
  );

  if (isLoading || load) {
    return <TMSLoader />;
  } else {
    return (
      <>
        <ApprovalComponent
          toBeApprovedData={fomatTime(pendingTimes)}
          toBeApprovedcolumns={toBeApprovedcolumns}
          _ApprovedData={fomatTime(nonPendingTimes)}
          Approvedcolumns={Approvedcolumns}
          ChildForm={<TimeSheetForm />}
        />
      </>
    );
  }
};

export default TimesheetApproval;
