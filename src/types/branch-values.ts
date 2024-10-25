export type BranchValues = {
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  postalCode: string;
  phone: string;
  configStatus?: "notadded" | "partial" | "uptodate";
};
