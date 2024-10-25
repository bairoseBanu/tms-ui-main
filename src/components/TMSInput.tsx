import { TextFieldVariants, TextFieldProps } from "@mui/material";
import { ErrorMessage, Field, FieldProps } from "formik";
import { FC } from "react";
import ErrorMsg from "./ErrorMsg";
import MDInput from "./MDInput";
import MDBox from "./MDBox";
import colors from "assets/theme/base/colors";
interface CustomInputProps extends Omit<TextFieldProps, "variant"> {
  name: string;
  variant: TextFieldVariants;
  helperText?: string;
  error?: boolean;
  width?: string;
}

const TMSInput: FC<CustomInputProps> = ({
  name,
  variant = "outlined",
  width = "100%",
  ...rest
}) => {
  const { sx } = rest;
  return (
    <MDBox mb={2} width={width}>
      <Field name={name}>
        {(fieldProps: FieldProps) => {
          const {
            field,
            form: { errors, touched },
          } = fieldProps;

          return (
            <MDInput
              sx={{
                backgroundColor: colors.background.default,
                borderRadius: "5px",
                ...sx,
              }}
              variant={variant}
              error={errors[name] && touched[name] ? true : false}
              {...rest}
              {...field}
            />
          );
        }}
      </Field>

      <ErrorMessage name={name} component={ErrorMsg} />
    </MDBox>
  );
};

export default TMSInput;
