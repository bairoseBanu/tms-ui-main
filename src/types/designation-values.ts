export type DesignationValues = {
  designationId?: string; // Added to optional to re-use the type for Edit Form
  name: string;
  description: string;
  isActive: boolean;
  branchId: string;
};
