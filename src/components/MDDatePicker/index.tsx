/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-flatpickr components
import Flatpickr from "react-flatpickr";
import flatpickr from "flatpickr";

// react-flatpickr styles
import "flatpickr/dist/flatpickr.css";

// Material Dashboard 2 PRO React TS components
import MDInput from "components/MDInput";
import colors from "assets/theme/base/colors";

// types

interface MDDatePickerProps {
  // variant: TextFieldVariants;
  onChange: flatpickr.Options.Hook | undefined;
  input?: {
    [key: string]: any;
  };
  [key: string]: any;
}

function MDDatePicker({
  input,
  onChange,
  ...rest
}: MDDatePickerProps): JSX.Element {
  return (
    <Flatpickr
      onChange={onChange}
      style={{
        backgroundColor: colors.background.default,
      }}
      {...rest}
      render={({ defaultValue }: any, ref: any) => (
        <MDInput {...input} defaultValue={defaultValue} inputRef={ref} />
      )}
    />
  );
}

MDDatePicker.defaultProps = {
  input: {},
};

export default MDDatePicker;
