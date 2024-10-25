import { Autocomplete } from "@mui/material";
import { FC } from "react";
import MDBox from "./MDBox";
import MDInput from "./MDInput";

type Option = {
  id: string;
  label: string;
  value: string;
};
interface Props {
  options: { id: string; label: string; value: string }[];
  name: string;
  label: string;
  width?: string;
  onInputChange: (name: string, value: string, id?: string) => void;
  defaultValue?: Option;
}

const TMSDropdown: FC<Props> = ({
  options,
  name,
  label,
  width = "100%",
  onInputChange,
  defaultValue = null,
  ...props
}) => {
  const isOptionEqualToValue = (option: Option, value: any) => {
    return option.id === value.id;
  };

  const handleType = (_e: unknown, option: any) => {
    onInputChange(name, option.value, option.id);
  };
  return (
    <>
      <MDBox mb={3} width={width}>
        <Autocomplete
          fullWidth
          defaultValue={defaultValue}
          options={options}
          onChange={handleType}
          isOptionEqualToValue={isOptionEqualToValue}
          renderInput={(params) => (
            <MDInput
              label={label}
              {...params}
              sx={{
                backgroundColor: "light.main",
                borderRadius: "5px",
              }}
              variant="outlined"
            />
          )}
          {...props}
        />
      </MDBox>
    </>
  );
};

export default TMSDropdown;
