export type ProofType = "address" | "brp" | "ni" | "passport" | "other";
export type VerificationStatus = "approved" | "rejected" | "pending";
export type EmployeeProof = {
  id: string;
  employeeId: string;
  type: ProofType;
  title: string;
  status: VerificationStatus;
  fileKeys: string[];
  src?: (string | undefined)[] | undefined;
  rejectReason?: string;
};
