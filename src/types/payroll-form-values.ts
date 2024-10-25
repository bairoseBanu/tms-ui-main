export interface PayrollFormValues {
  employeeId: string;
  name: string;
  month: string;
  year: string;
  doc: File | undefined;
}
export type UpdatePayrollValues = {
  payrollId: string;
  name?: string;
  isUploaded?: boolean;
};
