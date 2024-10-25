import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import ApproveBtn from "./ApproveBtn";
import DataTable from "./Tables/DataTable";
import { FC, ReactNode } from "react";

interface Props {
  toBeApprovedData: any;
  toBeApprovedcolumns: any;
  _ApprovedData: any;
  Approvedcolumns: any;
  ChildForm?: ReactNode;
  modalFormClose?: boolean;
}

const ApprovalComponent: FC<Props> = ({
  toBeApprovedData,
  toBeApprovedcolumns,
  _ApprovedData,
  Approvedcolumns,
  ChildForm,
  modalFormClose = true,
}) => {
  const handleApprove = (id: any, approvedStatus: any) => {
    console.log({ id, approvedStatus });
  };

  console.log({ modalFormClose });

  const renderToApproveData = () => {
    const rows = toBeApprovedData;
    rows.forEach(
      (row: any) =>
        (row.action = (
          <ApproveBtn
            key={row.sNo}
            id={row.sNo}
            // handleApprove={handleApprove}
            onApprove={(id: string) => handleApprove(id, "approved")}
            onReject={(id: string) => handleApprove(id, "rejected")}
          />
        ))
    );
    console.log({ columns: [...toBeApprovedcolumns], rows: [...rows] });
    return { columns: [...toBeApprovedcolumns], rows: [...rows] };
  };

  const renderApprovedData = () => {
    const rows = _ApprovedData;
    return { columns: [...Approvedcolumns], rows: [...rows] };
  };
  return (
    <MDBox>
      <MDBox mb={3}>
        <Card>
          <DataTable
            entriesPerPage={{ defaultValue: 5, entries: [5, 10, 15, 20, 25] }}
            // modalChild={
            //   // <ChildForm
            //   //   // table={renderToApproveData()}
            //   //   // onSubmitForm={handleFormSubmission}
            //   // />
            // }
            modalChild={ChildForm}
            isAddModal={true}
            table={renderToApproveData()}
            canSearch
            title="Approve Requests"
            modalClose={modalFormClose}
          ></DataTable>
        </Card>
      </MDBox>
      <MDBox mb={3}>
        <Card>
          <DataTable
            isAddModal={false}
            entriesPerPage={{ defaultValue: 5, entries: [5, 10, 15, 20, 25] }}
            table={renderApprovedData()}
            title="Approve History"
          ></DataTable>
        </Card>
      </MDBox>
    </MDBox>
  );
};

export default ApprovalComponent;
