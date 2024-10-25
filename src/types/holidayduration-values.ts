export type HolidayDurationValues = {
  holidayDurationId?: string; // Added to optional to re-use the type for Edit Form
  type: "calendaryear" | "financialyear";
  branchId: string;
};
