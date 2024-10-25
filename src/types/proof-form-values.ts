export interface ProofFormValues {
  employeeId: string;
  docType: string;
  noOfDocs: number;
  passportDoc?: File[] | [];
  passportNumber?: string;
  passportExpiry?: string;
  addressDoc?: File[] | [];
  addressNumber?: string;
  addressLineOne?: string;
  addressLineTwo?: string;
  postCode?: string;
  brpDoc?: File[] | [];
  brpExpiry?: string;
  brpNumber?: string;
  niNumber?: string;
  otherProofDoc?: File[] | [];
  otherProofExpiry?: string;
  otherProofNumber?: string;
}

export type ProofFormDocName =
  | "brpDoc"
  | "passportDoc"
  | "addressDoc"
  | "otherProofDoc";
