import MDTab from "components/Tab/MDTab";
import HolidayApproval from "components/HolidayApproval";
import TimesheetApproval from "components/TimesheetApproval";
import EmployeeProofApproval from "components/EmployeeProofApproval";
import { useState } from "react";
import { Message } from "types/message";
import TMSSnackbar from "components/TMSSnackbar";

function Approvals() {
  const [message, setMessage] = useState<Message>({
    message: "",
    severity: "success",
  });
  const handleMessage = (message: Message) => {
    setMessage(message);
  };
  const data = [
    {
      title: "Employee Proof Approval",
      component: <EmployeeProofApproval />,
    },
    {
      title: "TimeSheet Approval",
      component: <TimesheetApproval onMessage={handleMessage} />,
    },
    {
      title: "Holiday Approval",
      component: <HolidayApproval onMessage={handleMessage} />,
    },
  ];

  const handleMsgClose = () => {
    setMessage({ message: "", severity: "success" });
  };
  return (
    <>
      <MDTab data={data} />
      {message.message && (
        <TMSSnackbar
          message={message.message}
          open={!!message.message}
          handleClose={handleMsgClose}
        />
      )}
    </>
  );
}

export default Approvals;
