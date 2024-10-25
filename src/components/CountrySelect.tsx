import { countries } from "assets/countries/countries";
import { Autocomplete, Box, TextField } from "@mui/material";

const CountrySelect = () => {
  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ height: "auto" }}
      options={countries}
      autoHighlight
      getOptionLabel={(option) => "+" + option.phone}
      renderOption={(props, option) => (
        <Box
          component="li"
          //   sx={{ "& > img": { mr: 1, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="17"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {/* {option.label} */}
          <span className="codeinput">+{option.phone}</span>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="code"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};

export default CountrySelect;
