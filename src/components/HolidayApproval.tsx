import HolidayForm from "./HolidayForm";
import ApprovalComponent from "./ApprovalComponent";
import { HolidayWithEmployee } from "types/api-response";
import useApiCall from "hooks/useApiCall";
import { FC, useCallback, useEffect, useState } from "react";
import ApproveBtn from "./ApproveBtn";
import { VerificationStatus } from "types/employee-proof.type";
import TMSLoader from "./TMSLoader";
import { approveHoliday } from "apis/holiday.api";
import { Message } from "types/message";
import { useAppData } from "hooks/useAppData";

const toBeApprovedcolumns = [
  { Header: "Name", accessor: "name" },
  { Header: "from", accessor: "fromDate" },
  { Header: "Duration", accessor: "fromDateDuration" },
  { Header: "To", accessor: "toDate" },
  { Header: "Duration", accessor: "toDateDuration" },
  { Header: "No of Days", accessor: "noOfDays" },
  { Header: "Type", accessor: "holidayType" },
  { Header: "Status", accessor: "status" },
];
const Approvedcolumns = [
  { Header: "Name", accessor: "name" },
  { Header: "from", accessor: "fromDate" },
  { Header: "Duration", accessor: "fromDateDuration" },
  { Header: "To", accessor: "toDate" },
  { Header: "Duration", accessor: "toDateDuration" },
  { Header: "No of Days", accessor: "noOfDays" },
  { Header: "Type", accessor: "holidayType" },
  { Header: "Status", accessor: "status" },
];

interface Props {
  onMessage: (message: Message) => void;
}
const HolidayApproval: FC<Props> = ({ onMessage }) => {
  const { data: holidaysWithEmployee, isLoading } =
    useApiCall<HolidayWithEmployee[]>("holidayapproval");
  const { appData, isAppDataLoading } = useAppData();
  const [pendingHolidays, setPendingHolidays] = useState<HolidayWithEmployee[]>(
    []
  );
  const [nonPendingHolidays, setNonPendingHolidays] = useState<
    HolidayWithEmployee[]
  >([]);

  useEffect(() => {
    if (holidaysWithEmployee && holidaysWithEmployee.length > 0) {
      const pendingLists = holidaysWithEmployee.filter(
        (holiday) => holiday.approvalStatus === "pending"
      );
      setPendingHolidays(pendingLists);
      const nonPendingLists = holidaysWithEmployee.filter(
        (holiday) => holiday.approvalStatus !== "pending"
      );
      setNonPendingHolidays(nonPendingLists);
    }
  }, [holidaysWithEmployee]);
  const formValues = {
    fromDate: new Date().toISOString().split("T")[0],
    fromDateDuration: "full" as "full" | "am" | "pm",
    toDate: "",
    toDateDuration: "full" as "full" | "am" | "pm",
    holidayType: "",
  };

  const [load, setLoad] = useState(false);

  const handleVerify = useCallback(
    async (id: string, status: VerificationStatus) => {
      console.log(id, status);
      setLoad(true);
      const clonedPendingHolidays = [...pendingHolidays];
      const clonedNonPendingHolidays = [...nonPendingHolidays];
      const response = await approveHoliday(id, status);
      if (response.status === 201) {
        const newHoliday = clonedPendingHolidays.find(
          (holiday, index, array) => {
            if (holiday.id === id) {
              array.splice(index, 1);
              return true;
            }
            return false;
          }
        );
        newHoliday.approvalStatus = status;
        clonedNonPendingHolidays.push(newHoliday);

        setPendingHolidays(clonedPendingHolidays);
        setNonPendingHolidays(clonedNonPendingHolidays);
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
    [nonPendingHolidays, onMessage, pendingHolidays]
  );
  const getHolidayNameById = (id: string) => {
    if (appData) {
      const { holidayTypes } = appData;
      if (holidayTypes && holidayTypes?.length > 0) {

        const ht = holidayTypes.find((type) => type.id === id);
        console.log({ name: ht?.name });
        return ht ? ht?.name : "-";
      }
    }
    return "-";
  };
  const fomatHoliday = useCallback(
    (holidayData: HolidayWithEmployee[]) => {
      return holidayData.map((holiday) => {
        const {
          fromDate,
          fromDateDuration,
          toDate,
          toDateDuration,
          holidayType,
          noOfDays,
          approvalStatus,
        } = holiday;
        return {
          name: `${holiday.employeeId.firstName} ${holiday.employeeId.lastName}`,
          fromDate: fromDate.split("T")[0],
          fromDateDuration,
          toDate: toDate?.split("T")[0] || "-",
          toDateDuration: toDateDuration || "-",
          holidayType: getHolidayNameById(holidayType),
          noOfDays: noOfDays,
          status:
            approvalStatus === "pending" ? (
              <ApproveBtn
                id={holiday.id}
                onApprove={(id: string) => handleVerify(id, "approved")}
                onReject={(id: string) => handleVerify(id, "rejected")}
              />
            ) : (
              approvalStatus
            ),
          id: holiday.id,
        };
      });
    },
    [handleVerify]
  );

  if (isLoading || load || isAppDataLoading) {
    return <TMSLoader />;
  } else {
    return (
      <ApprovalComponent
        toBeApprovedData={fomatHoliday(pendingHolidays)}
        toBeApprovedcolumns={toBeApprovedcolumns}
        _ApprovedData={fomatHoliday(nonPendingHolidays)}
        Approvedcolumns={Approvedcolumns}
        ChildForm={<HolidayForm formValues={formValues} />}
      />
    );
  }
};

export default HolidayApproval;
