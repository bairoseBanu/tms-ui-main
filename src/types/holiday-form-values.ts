export interface HolidayFormValues {
  fromDate: Date | string;
  fromDateDuration: "full" | "am" | "pm";
  toDate: Date | string;
  toDateDuration: "full" | "am" | "pm";
  holidayType: string;
}
