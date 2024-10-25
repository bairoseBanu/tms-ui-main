import { useEffect, useState } from "react";
import { Department, Employee } from "types/api-response";
import { useAppData } from "./useAppData";
import { InfoAndValidation } from "components/TMSProfileCard";
import { formatBasicInfo } from "lib/format-profile-card-info";

const useEmployee = (employeeId: string) => {
  const [manager, setManager] = useState<Employee>();
  const [hr, setHr] = useState<Employee>();
  const [infoOne, setInfoOne] = useState<InfoAndValidation>();
  const [infoTwo, setInfoTwo] = useState<InfoAndValidation>();
  const [department, setDepartment] = useState<Department>();
  const { employees, departments } = useAppData().appData;
  const employee = employees.find((emp) => emp.id === employeeId);
  useEffect(() => {
    if (hr && manager && department) {
      const _infoOne = formatBasicInfo({
        employee,
        deptName: department.name,
        manager: manager.firstName,
        hr: hr.firstName,
        profileType: 1,
      });
      const _infoTwo = formatBasicInfo({
        employee,
        deptName: department.name,
        manager: manager.firstName,
        hr: hr.firstName,
        profileType: 2,
      });
      setInfoOne(_infoOne);
      setInfoTwo(_infoTwo);
    }
  }, [department, employee, hr, manager]);
  employees.forEach((emp) => {
    console.log("I am insided HR", emp.firstName, employee.firstName);
    if (emp.id === employee.hr) {
      setHr(emp);
    }
    if (emp.id === employee.manager) {
      setManager(emp);
    }
  });
  const _department = departments?.find((dept) => {
    return dept.id === employee?.deptId;
  });
  setDepartment(_department);

  return { manager, hr, department, infoOne, infoTwo };
};
export default useEmployee;
