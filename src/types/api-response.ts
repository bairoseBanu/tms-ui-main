import { Edge, Node } from "reactflow";
import { ProofType, VerificationStatus } from "./employee-proof.type";
import { PaygradeDuration } from "./paygrade-values";
import { ThemeType } from "./theme-type";

export interface Branch {
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  postCode: string;
  phone: string;
  configStatus?: "notadded" | "partial" | "uptodate";
  version: number;
  id: string;
}

export interface Department {
  name: string;
  code: string;
  manager: string;
  isActive: true;
  branchId: string;
  version: number;
  id: string;
}

export type Designation = string[];
export type Grade = string[];

export interface Employee {
  email: string;
  phone: string;
  isPhoneVerified: boolean;
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
  isActive: boolean;
  role: string;
  deptId: string | null;
  branchId: string | null;
  designation: string;
  grade: string;
  manager: string;
  hr: string;
  workingHours: string;
  version: number;
  joiningDate: string;
  profilePic?: string;
  noOfHolidays: string;
  dob: string;
  endingDate?: string;
  id: string;
}

export interface Organization {
  name: string;
  isActive: boolean;
  dbName: string;
  plan: string;
  joiningDate: Date;
  billingDate: Date;
  isPaid: boolean;
  version: number;
}

export interface RTWList {
  id: string;
  name: string;
  employeeId: string;
  docType: ProofType;
  docNumber?: string;
  docExpiry?: string;
  docStatus: "pending" | "approved" | "rejected";
  addressLineOne?: string;
  addressLineTwo?: string;
  postCode?: string;
}

export interface PolicyAttrs {
  policyId: string;
  name: string;
  createdAt: Date;
  branchId: string;
  isUploaded: boolean;
  presignedUrl: string | File;
}

export interface PolicyDoc {
  id: string;
  name: string;
  fileKey: string;
  createdAt: Date;
  isUploaded: boolean;
  branchId: string;
  version: number;
}

export interface TimeSheetDoc {
  id: string;
  employeeId: string;
  date: string;
  fromOne: string;
  toOne: string;
  isTimeSplit: boolean;
  fromTwo: string;
  toTwo: string;
  workedWith: string;
  totalHoursInMins: number;
  approvalStatus: "pending" | "approved" | "rejected";
  approvedBy?: string;
  approvalOrRejectionMsg?: string;
  version: number;
}

export interface TimesheetWithEmployee
  extends Omit<TimeSheetDoc, "employeeId"> {
  employeeId: Employee;
}
export interface HolidayWithEmployee extends Omit<HolidayDoc, "employeeId"> {
  employeeId: Employee;
}

export interface HolidayDoc {
  id: string;
  employeeId: string;
  fromDate: string;
  fromDateDuration: "full" | "am" | "pm";
  toDate?: string;
  toDateDuration?: "full" | "am" | "pm";
  noOfDays: number;
  holidayType: string;
  approvalStatus: "pending" | "approved" | "rejected";
  approvedBy?: string;
  approvalOrRejectionMsg?: string;
  version: number;
}

export interface PayRoll {
  id: string;
  employeeId: string;
  name: string;
  month: string;
  year: string;
  fileKey: string;
  isUploaded: boolean;
  presignedUrl: string;
  version: number;
}

export interface OrgScreen {
  nodes: Node[];
  edges: Edge[];
  totalEmployees: number;
  orgName: string;
  phone: string;
  website: string;
  location: string;
}

export interface Analytic {
  id: string;
  name: string;
  value: number;
}

export interface TimeHolidayAnalytic {
  timeAnalytics: Analytic[];
  holidayAnalytics: Analytic[];
  totalTime: number;
  totalHolidays: number;
}

export interface RtwDoc {
  employeeId: string;
  passportFileKeys?: string[];
  isPassportVerified?: VerificationStatus;
  passportNumber?: string;
  passportExpiry?: string;
  addressFileKeys?: string[];
  addressNumber?: string;
  addressLineOne?: string;
  addressLineTwo?: string;
  postCode?: string;
  isAddrVerified?: VerificationStatus;
  niNumber?: string;
  isNiVerified?: VerificationStatus;
  brpFileKeys?: string[];
  brpNumber?: string;
  isBrpVerified?: VerificationStatus;
  brpExpiry?: string;
  otherProofFileKeys?: string[];
  otherProofNumber?: string;
  isOtherProofVerified?: VerificationStatus;
  otherProofExpiry?: string;
  isActive: boolean;
  version: number;
}

export interface DepartmentValues {
  deptId?: string;
  name: string;
  branchId: string;
  manager: string;
  code: string;
}
export interface DepartmentDoc {
  id: string;
  name: string;
  branchId: string;
  manager: string;
  code: string;
  isActive: boolean;
  version: number;
}

export interface PaygradeDoc {
  id: string;
  name: string;
  duration: PaygradeDuration;
  minimumRange: number;
  maximumRange: number;
  isActive: boolean;
  branchId: string;
  version: number;
}
export interface DesignationDoc {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  branchId: string;
  version: number;
}
export interface HolidayTypeDoc {
  id: string;
  name: string;
  description: string;
  isPaidLeave: boolean;
  maxAllowedDaysPerYear: number;
  carryOverAllowed: boolean;
  carryOverLimit?: number; // required only when CarryOver Allowed is true
  isActive: boolean;
  branchId: string;
  version: number;
}
export interface HolidayDurationDoc {
  id: string;
  type: "calendaryear" | "financialyear";
  branchId: string;
  version: number;
}
export interface ThemeDoc {
  id: string;
  type: ThemeType;
  branchId: string;
  version: number;
}

export type DefaultConfigResponse = {
  branch: Branch;
  refreshToken: boolean;
};

export type UserDoc = {
  id: string;
  email: string;
  dbName?: string;
  isEmailVerified: boolean;
  /** This pwd reset flag to be used only in auth serv */
  pwdResetRequest?: string;
  version: number;
};
