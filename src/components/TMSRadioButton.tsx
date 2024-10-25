import Radio from "@mui/material/Radio";
import RadioGroup, { RadioGroupProps } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { ChangeEvent, FC, useState } from "react";
interface Props extends RadioGroupProps {
  options: { id: string; label: string; value: string }[];
  name: string;
  onInputChange: (name: string, value: string) => void;
  label?: string;
  //   formControlLabelProps?: FormControlLabelProps;
  //   radioProps?: RadioProps;
}
export const TMSRadioButton: FC<Props> = ({
  options,
  name,
  onInputChange,
  label,
  //   formControlLabelProps,
  //   radioProps,
  ...rest
}) => {
  const [value, setValue] = useState(options[0].value);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    onInputChange(name, (event.target as HTMLInputElement).value);
  };

  return (
    <>
      {label && <FormLabel id={name}>{label}</FormLabel>}
      <RadioGroup
        row
        aria-labelledby={name}
        name={name}
        onChange={handleChange}
        value={value}
        // sx={{ backgroundColor: "yellow" }}
        {...rest}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.id}
            value={option.value}
            label={option.label}
            // {...formControlLabelProps}
            control={<Radio />}
          />
        ))}
      </RadioGroup>
    </>
  );
};
