import { EmployeeProof } from "types/employee-proof.type";

const image1 =
  "https://newsd.in/wp-content/uploads/2020/08/aadhar-card-sample-picture-1.jpg";
const image2 =
  "https://tse2.mm.bing.net/th?id=OIP.axrc-wuhcpyPgWivIdJY_QHaI7&pid=Api&P=0";
export const proofData: EmployeeProof[] = [
  {
    id: "1",
    employeeId: "dummy",
    type: "address",
    title: "Address Proof",
    status: "approved",
    src: [image1, image2],
    fileKeys: ["sd"],
  },
  {
    id: "2",
    employeeId: "dummy",
    type: "passport",
    title: "Passport Copy",
    status: "pending",
    fileKeys: ["sd"],
  },
  {
    id: "3",
    employeeId: "dummy",
    type: "ni",
    title: "NI/Social Security No",
    status: "approved",
    fileKeys: ["sd"],
  },
  {
    id: "4",
    employeeId: "dummy",
    type: "brp",
    title: "BRP/Visa Copy",
    status: "rejected",
    src: [image2, image1],
    rejectReason: "Unclear image",
    fileKeys: ["sd"],
  },
];
