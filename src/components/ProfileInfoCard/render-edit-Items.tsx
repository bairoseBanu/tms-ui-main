import { editEmployee } from "apis/employee.api";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDDatePicker from "components/MDDatePicker";
import TMSDropdown from "components/TMSDropdown";
import TMSInput from "components/TMSInput";
import { Form, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { useAppData } from "hooks/useAppData";
import {
  formatDeptOptions,
  formatDesignationDocOptions,
  formatEmployeeOptions,
  formatPaygradeOptions,
} from "lib/formatDropdownOptions";
import { FC, useEffect, useState } from "react";
import { EmployeeValues } from "types/employee-values";
import { ProfileInfoField } from "types/profile-info-field";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

type RenderItemProps = { profileInfoField: ProfileInfoField };
export type Values = Partial<
  EmployeeValues & Omit<"isManager", keyof EmployeeValues>
>;
const RenderEditItem: FC<RenderItemProps> = ({ profileInfoField }) => {
  const { setFieldValue } = useFormikContext<EmployeeValues>();
  const { departments, employees, paygrades, designationsDocs } =
    useAppData().appData;

  const handleDropdownChange = (name: string, value: string) => {
    console.log({ name, value });

    setFieldValue(name, value);
  };
  const handleJoiningDate = (date: Date[]) => {
    setFieldValue("joiningDate", new Date(date[0]).toISOString().split("T")[0]);
  };
  const handleDobDate = (date: Date[]) => {
    setFieldValue("dob", new Date(date[0]).toISOString().split("T")[0]);
  };
  const handleEndingDate = (date: Date[]) => {
    setFieldValue("endingDate", new Date(date[0]).toISOString().split("T")[0]);
  };

  const selectOptions = (
    optionType: "department" | "employee" | "grade" | "designation" | "dob"
  ) => {
    switch (optionType) {
      case "designation":
        return formatDesignationDocOptions(designationsDocs);
      case "department":
        return formatDeptOptions(departments);
      case "employee":
        return formatEmployeeOptions(employees);
      case "grade":
        return formatPaygradeOptions(paygrades);
    }
  };

  if (profileInfoField && !profileInfoField?.optionsType) {
    return (
      <TMSInput
        id={profileInfoField.id}
        label={profileInfoField.label}
        name={profileInfoField.key}
        variant="outlined"
        fullWidth
        defaultValue={profileInfoField.value}
      />
    );
  } else if (profileInfoField?.optionsType === "joiningDate") {
    return (
      <MDDatePicker
        onChange={handleJoiningDate}
        input={{
          id: `${profileInfoField.id}`,
          label: `${profileInfoField.label}`,
          name: `${profileInfoField.key}`,
          variant: "outlined",
          fullWidth: true,
          InputLabelProps: {
            shrink: true,
          },
          value: `${profileInfoField.value}`,
          // backgroundColor: colors.background.default,
        }}
      />
    );
  } else if (profileInfoField?.optionsType === "dob") {
    return (
      <MDDatePicker
        onChange={handleDobDate}
        input={{
          id: `${profileInfoField.id}`,
          label: `${profileInfoField.label}`,
          name: `${profileInfoField.key}`,
          variant: "outlined",
          fullWidth: true,
          InputLabelProps: {
            shrink: true,
          },
          value: `${profileInfoField.value}`,
          // backgroundColor: colors.background.default,
        }}
      />
    );
  } else if (profileInfoField?.optionsType === "endingDate") {
    return (
      <MDDatePicker
        onChange={handleEndingDate}
        input={{
          id: `${profileInfoField.id}`,
          label: `${profileInfoField.label}`,
          name: `${profileInfoField.key}`,
          variant: "outlined",
          fullWidth: true,
          InputLabelProps: {
            shrink: true,
          },
          value: `${profileInfoField.value}`,
          // backgroundColor: colors.background.default,
        }}
      />
    );
  } else {
    const selectedOptions = selectOptions(profileInfoField?.optionsType);
    return (
      <TMSDropdown
        options={selectedOptions}
        label={profileInfoField?.label}
        name={profileInfoField?.key}
        onInputChange={handleDropdownChange}
        defaultValue={{
          id: profileInfoField?.id,
          label: profileInfoField?.label,
          value: profileInfoField?.value,
        }}
      />
    );
  }
};

interface Props {
  info: ProfileInfoField[];
  setEditMode: (value: boolean) => void;
  employeeId: string;
  onEdit: (values: Values) => void;
  validationSchema: Yup.Schema<object>;
}
export const RenderEditItems: FC<Props> = ({
  info,
  employeeId,
  onEdit,
  setEditMode,
  validationSchema,
}) => {
  const [initialValues, setIntialValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: Values) => {
    setIsLoading(true);
    try {
      const response = await editEmployee(values, employeeId);
      if (response.status === 201) {
        onEdit(values);
      }
      setIsLoading(false);
    } catch (error) {
      throw new Error();
    }
  };

  useEffect(() => {
    let values = {};
    info?.forEach((infos) => {
      values = { ...values, [infos.key]: infos.value };
    });
    setIntialValues(values);
  }, [info]);

  console.log({ info });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props) => {
          console.log({ props });

          return (
            <Form>
              {isLoading && (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              )}
              {!isLoading && (
                <MDBox>
                  {info.map((element) => (
                    <RenderEditItem profileInfoField={element} />
                  ))}
                  <MDButton type="submit">Save</MDButton>
                  <MDButton onClick={() => setEditMode(false)}>Cancel</MDButton>
                </MDBox>
              )}
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
