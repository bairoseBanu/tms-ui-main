export type HolidayTypeValues = {
  holidayTypeId?: string; // Added to optional to re-use the type for Edit Form
  name: string;
  description: string;
  isPaidLeave: boolean;
  maxAllowedDaysPerYear: number;
  carryOverAllowed: boolean;
  carryOverLimit?: number; // required only when CarryOver Allowed is true
  isActive: boolean;
  branchId: string;
};
