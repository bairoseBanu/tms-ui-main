import {
  Branch,
  Designation,
  Department,
  Employee,
  Grade,
  PaygradeDoc,
  DesignationDoc,
  HolidayTypeDoc,
} from "../types/api-response";

// Dropdown Formats as { id: "1", label: "desi", value: "01" };

export const formatBranchOptions = (branches: Branch[]) => {
  return branches.map((branch) => {
    return {
      id: branch.id,
      label: branch.name,
      value: branch.id,
    };
  });
};
export const formatDeptOptions = (depts: Department[]) => {
  return depts.map((dept) => {
    return {
      id: dept.id,
      label: dept.name,
      value: dept.id,
    };
  });
};
// Designation format will chnage in future
export const formatDesignationOptions = (designations: Designation | Grade) => {
  return designations.map((des) => {
    return {
      id: des,
      label: des,
      value: des,
    };
  });
};
export const formatDesignationDocOptions = (designations: DesignationDoc[]) => {
  return designations.map((des) => {
    return {
      id: des.id,
      label: des.name,
      value: des.id,
    };
  });
};

export const formatEmployeeOptions = (employees: Employee[]) => {
  return employees?.map((employee) => {
    return {
      id: employee?.id,
      label: employee?.firstName,
      value: employee?.id,
    };
  });
};
export const formatPaygradeOptions = (paygrades: PaygradeDoc[]) => {
  return paygrades?.map((pg) => {
    return {
      id: pg?.id,
      label: pg?.name,
      value: pg?.id,
    };
  });
};
export const formatHolidayTypeOptions = (holidayTypes: HolidayTypeDoc[]) => {
  return holidayTypes?.map((ht) => {
    return {
      id: ht?.id,
      label: ht?.name,
      value: ht?.id,
    };
  });
};
