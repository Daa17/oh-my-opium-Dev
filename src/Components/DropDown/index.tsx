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
import { Button } from "@opiumteam/react-opium-components";

import "./styles.scss";

export default function MuiDropDown(props: any) {
  const [data, setData] = React.useState<string[]>([]);
  const [activeNetwork, setActiveNetwork] = React.useState<any>(props?.header);
  const handleChange = (event: SelectChangeEvent<typeof data>) => {
    console.log(event.target);
    const {
      target: { value },
    } = event;
    setData(typeof value === "string" ? value.split(",") : value);
  };
  console.log(data);

  return (
    <FormControl className="dropDown-default-styles" sx={{ m: 1, width: 300 }}>
      <InputLabel
        variant="filled"
        className="dropDown-label"
        id="demo-multiple-checkbox-label"
        shrink={false}
      >
        {props.title || activeNetwork || "Network"}
      </InputLabel>
      {props.isCheckbox || props.isRadio ? (
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
          <p>{props.checkboxHeader}</p>
          {props.checkboxData?.map(({ title, value }: any) => (
            <MenuItem key={title} value={value}>
              <Checkbox checked={data.indexOf(title) > -1} />
              <ListItemText primary={title} />
            </MenuItem>
          ))}

          {props?.radioData && (
            <div>
              <p>{props.radioHeader}</p>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={
                  props?.radioData?.length && props.radioData[0]?.value
                }
                name="radio-buttons-group"
                onChange={handleChange}
              >
                {props.radioData.map(({ title, value }: any) => (
                  <FormControlLabel
                    key={value}
                    value={value}
                    control={<Radio />}
                    label={title}
                  />
                ))}
              </RadioGroup>
            </div>
          )}
          <Button
            variant="secondary"
            className="apply_filter"
            style={{
              backgroundColor: "red",
              color: "#fff",
            }}
            label="apply"
            onClick={() => {}}
          />
        </Select>
      ) : (
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={activeNetwork}
          label="Age"
          onChange={(e: SelectChangeEvent) =>
            setActiveNetwork(e.target.value as string)
          }
        >
          <p>{props.header}</p>
          {props?.data &&
            props.data?.map(({ title, iconUrl }: any) => (
              <MenuItem key={title} value={title}>
                <p>{title}</p>
                <img src={iconUrl} alt="icon" />
              </MenuItem>
            ))}
        </Select>
      )}
    </FormControl>
  );
}
