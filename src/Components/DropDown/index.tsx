import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

import "./styles.scss";

export default function MuiDropDown(props: any) {
  const [data, setData] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof data>) => {
    const {
      target: { value },
    } = event;
    setData(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl className="dropDown-default-styles" sx={{ m: 1, width: 300 }}>
      <InputLabel
        variant="filled"
        className="dropDown-label"
        id="demo-multiple-checkbox-label"
        shrink={false}
      >
        {props.title}
      </InputLabel>
      <Select
        variant="standard"
        id="demo-multiple-checkbox"
        placeholder={props.title}
        defaultValue={props.title}
        multiple
        value={data}
        onChange={handleChange}
        renderValue={() => null}
        // MenuProps={MenuProps}
      >
        {props.isCheckbox ? (
          props.data?.map(({ title, value }: any) => (
            <MenuItem key={title} value={value}>
              <Checkbox checked={data.indexOf(title) > -1} />
              <ListItemText primary={title} />
            </MenuItem>
          ))
        ) : (
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            {props.data.map(({ title, value }: any) => (
              <FormControlLabel
                key={value}
                value={value}
                control={<Radio />}
                label={title}
              />
            ))}
          </RadioGroup>
        )}
      </Select>
      {props.children}
    </FormControl>
  );
}
