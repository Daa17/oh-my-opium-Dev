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
import { filterSelectStyle, networkSelectStyle } from "./styleConstant";

import "../../styles/main.scss";
import "./styles.scss";

export default function MuiDropDown(props: any) {
  const [data, setData] = React.useState<string[]>([]);
  const [activeNetwork, setActiveNetwork] = React.useState<any>("");
  const [open, toogleOpen] = React.useState<any>(false);
  const handleChange = (event: SelectChangeEvent<typeof data>) => {
    if (props?.header === "Network" && event.target.value) {
      let activeItem = props?.data?.find(
        (item: { title: string | string[] }) =>
          item.title === event.target.value
      );
      props?.handleNetworkList(activeItem);
      setActiveNetwork(event.target.value as string);
    }
    const {
      target: { value },
    } = event;

    value && setData(typeof value === "string" ? value.split(",") : value);
  };

  const applyDropDownFilters = () => {
    toogleOpen(false);
    const modifyData = data.filter((item) => item);
    props.applyFilter(modifyData);
  };

  React.useEffect(() => {
    props.data?.length && setActiveNetwork(props.data[0]?.title);
  }, [props.data]);

  return (
    <FormControl
      className="dropDown-default-styles"
      sx={{
        m: 1,
        width: "max-content",
        position: "relative",
        "& .MuiSvgIcon-root": {
          width: "1.2rem",
          color: "#fff",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          display: "none",
        },
      }}
    >
      {!activeNetwork && (
        <InputLabel
          variant="filled"
          className="dropDown-label"
          id="demo-multiple-checkbox-label"
          shrink={false}
          style={{
            transform: "none",
          }}
        >
          {props.title}
        </InputLabel>
      )}
      {props.isCheckbox || props.isRadio || props.mobile ? (
        <Select
          variant="standard"
          id="demo-multiple-checkbox"
          placeholder={props.title}
          defaultValue={props.title}
          multiple
          value={data}
          onChange={handleChange}
          open={open}
          onOpen={() => toogleOpen(true)}
          onClose={() => toogleOpen(false)}
          renderValue={() => null}
          MenuProps={filterSelectStyle}
        >
          {props.checkboxData && <h4>{props.checkboxHeader}</h4>}
          {props.checkboxData?.map(({ title, value }: any) => (
            <MenuItem
              key={title}
              value={value}
              className="menu_item"
              style={{
                height: "auto",
                minHeight: "auto",
                padding: "0.37rem 0",
                marginBottom: "0.38rem",
              }}
              sx={{
                "&:not(:last-of-type)": {
                  borderBottom: "0.5px solid rgba(255, 255, 255, 0.5)",
                },
              }}
            >
              <Checkbox
                checked={data.indexOf(title) > -1}
                style={{
                  padding: 0,
                  marginRight: "0.3rem",
                }}
                sx={{
                  color: "#fff",
                  "& .MuiSvgIcon-root": {
                    width: "1rem",
                    height: "1rem",
                  },
                  "&.Mui-checked": {
                    "& .MuiSvgIcon-root": {
                      fill: "#fff",
                    },
                  },
                }}
                size="small"
              />
              <ListItemText primary={title} />
            </MenuItem>
          ))}

          {props?.radioData && (
            <div className="sorting_wrapper">
              <h4>{props.radioHeader}</h4>
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
                    control={
                      <Radio
                        style={{
                          padding: 0,
                          color: "#fff",
                        }}
                        size="small"
                        sx={{
                          "& .MuiSvgIcon-root": {
                            width: "0.9rem",
                            height: "1rem",
                          },
                        }}
                      />
                    }
                    label={title}
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.37rem 0",
                      margin: "0 0 0.3rem 0",
                    }}
                  />
                ))}
              </RadioGroup>
            </div>
          )}
          <MenuItem disableRipple>
            <Button
              variant="secondary"
              className="apply_filter"
              label="apply"
              onClick={applyDropDownFilters}
            />
          </MenuItem>
        </Select>
      ) : (
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={activeNetwork}
          onChange={handleChange}
          renderValue={(selected: any) => selected}
          style={{
            minHeight: "auto",
            color: "#fff",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "1.14rem",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "1.25rem",
          }}
          MenuProps={networkSelectStyle}
        >
          <h5>{props.header}</h5>
          {props?.data &&
            props.data?.map(({ title, iconUrl }: any) => (
              <MenuItem
                value={title}
                key={title}
                style={{
                  width: "11.8rem",
                  padding: "0.375rem 0",
                  justifyContent: "space-between",
                }}
              >
                <p>{title}</p>
                <img style={{ maxWidth: "15px" }} src={iconUrl} alt="icon" />
              </MenuItem>
            ))}
        </Select>
      )}
      {activeNetwork !== "Network" && props.header === "Network" && (
        <div className="red-network">change network in wallet</div>
      )}
    </FormControl>
  );
}
