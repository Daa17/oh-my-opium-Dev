import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormGroup from "@mui/material/FormGroup";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@opiumteam/react-opium-components";

import "../../styles/main.scss";
import "./styles.scss";

export default function MuiDropDown(props: any) {
  const [checkedValue, setCheckedValue] = React.useState<any>([]);
  const [sortedValue, setSortedValue] = React.useState<any>([
    "expiration date",
  ]);
  const [activeNetwork, setActiveNetwork] = React.useState<any>("");
  const [open, toogleOpen] = React.useState<any>(false);

  const handleChange = (value: string, type: string, checked?: boolean) => {
    if (props?.header === "Network" && value) {
      let activeItem = props?.data?.find(
        (item: { title: string | string[] }) => item.title === value
      );
      props?.handleNetworkList(activeItem);
      setActiveNetwork(value as string);
    } else if (type === "checkbox" && checked) {
      setCheckedValue([...checkedValue, value]);
    } else if (type === "checkbox" && !checked) {
      setCheckedValue((prev: any) =>
        prev.filter((item: string) => item !== value)
      );
    }
  };

  const applyDropDownFilters = () => {
    toogleOpen(false);
    if (props.mobile) {
      props.applyFilter(checkedValue);
      props.applySort(sortedValue);
    } else if (!props.isRadio) {
      props.applyFilter(checkedValue);
    } else props.applySort(sortedValue);
  };

  React.useEffect(() => {
    props.data?.length && setActiveNetwork(props.data[0]?.title);
  }, [props.data]);

  let dropDownMsg = "";
  if (
    activeNetwork !== "Network" &&
    props.header === "Network" &&
    props.isAlowed &&
    props.isloggedIn
  ) {
    dropDownMsg = "change network in wallet";
  } else if (
    activeNetwork !== "Network" &&
    props.header === "Network" &&
    !props.isloggedIn
  ) {
    dropDownMsg = "Please connect your wallet";
  } else dropDownMsg = "";

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
        >
          {props.isRadio ? sortedValue : props.title}
        </InputLabel>
      )}
      {props.isCheckbox || props.isRadio || props.mobile ? (
        <Select
          className="default-select"
          variant="standard"
          id="demo-multiple-checkbox"
          placeholder={props.title}
          defaultValue={props.title}
          multiple
          value={[]}
          open={open}
          onOpen={() => toogleOpen(true)}
          onClose={() => toogleOpen(false)}
          renderValue={() => null}
          MenuProps={{
            PaperProps: {
              sx: {
                width: "195px",
                bgcolor: "#222234",
                overflow: "initial",
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
                "& .MuiList-root": {
                  padding: 0,
                },
                "& .MuiMenuItem-root": {
                  "&.Mui-selected": {
                    backgroundColor: "transparent",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  },
                },
                "& .Mui-selected": {
                  backgroundColor: "transparent",
                },
                "&:before": {
                  content: `" "`,
                  width: 0,
                  height: 0,
                  top: 0,
                  right: 0,
                  transform: "translate(0, -85%)",
                  position: "absolute",
                  borderLeft: "10px solid transparent",
                  borderRight: "10px solid transparent",
                  borderBottom: "18px solid #222234",
                  zIndex: 2,
                },
                "&:after": {
                  content: `" "`,
                  width: 0,
                  height: 0,
                  top: 0,
                  right: 0,
                  transform: "translate(0, -100%)",
                  position: "absolute",
                  borderLeft: "10px solid transparent",
                  borderRight: "10px solid transparent",
                  borderBottom: "18px solid #fff",
                  zIndex: 1,
                },
              },
            },
            transformOrigin: {
              vertical: -20,
              horizontal: 130,
            },
            // disablePortal: true,
          }}
        >
          {props.checkboxData && <h4>{props.checkboxHeader}</h4>}
          <FormGroup
            onChange={(e: any) =>
              handleChange(e.target.value, e.target.type, e.target.checked)
            }
          >
            {props.checkboxData?.map(({ title, value }: any) => (
              <MenuItem
                key={title}
                value={value}
                // onChange={() => handleChange}
                className="menu_item"
                sx={{
                  "&:not(:last-of-type)": {
                    borderBottom: "0.5px solid rgba(255, 255, 255, 0.5)",
                  },
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      value={value}
                      checked={checkedValue.indexOf(title) > -1}
                      style={{
                        padding: 0,
                      }}
                      sx={{
                        color: "#fff",
                        "& .MuiSvgIcon-root": {
                          display: "none",
                        },
                      }}
                      size="small"
                    />
                  }
                  label={title}
                />
              </MenuItem>
            ))}
          </FormGroup>

          {props?.radioData && (
            <div className="sorting_wrapper">
              <h4>{props.radioHeader}</h4>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={props.sortBy}
                name="radio-buttons-group"
                onChange={(e: any) => setSortedValue([e.target.value])}
              >
                {props.radioData.map(({ title, value }: any) => (
                  <FormControlLabel
                    key={value}
                    checked={sortedValue.indexOf(title) > -1}
                    control={
                      <Radio
                        value={value}
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
        <Tooltip
          title={`${
            props.disabled ? "You need to log out to change the network." : ""
          }`}
        >
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={activeNetwork}
            className="network-select"
            onChange={(e: any) => handleChange(e.target.value, e.target.type)}
            renderValue={(selected: any) => selected}
            disabled={props.disabled}
            MenuProps={{
              disablePortal: true,
              PaperProps: {
                sx: {
                  bgcolor: "#222234",
                  overflow: "initial",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                  borderBottomRightRadius: "10px",

                  "& .MuiList-root": {
                    padding: 0,
                  },
                  "& .MuiMenuItem-root": {
                    // "& .Mui-selected": {
                    //   backgroundColor: "transparent !important",
                    // },
                    "&:not(:last-of-type)": {
                      borderBottom: "0.5px solid rgba(255, 255, 255, 0.5)",
                      marginBottom: "0.3rem",
                    },
                  },
                  "& .Mui-selected": {
                    backgroundColor: "transparent",
                  },
                  "&:before": {
                    content: `" "`,
                    width: 0,
                    height: 0,
                    top: 0,
                    right: 0,
                    transform: "translate(0, -90%)",
                    position: "absolute",
                    borderLeft: "10px solid transparent",
                    borderRight: "10px solid transparent",
                    borderBottom: "18px solid #222234",
                    zIndex: 2,
                  },
                  "&:after": {
                    content: `" "`,
                    width: 0,
                    height: 0,
                    top: 0,
                    right: 0,
                    transform: "translate(0, -100%)",
                    position: "absolute",
                    borderLeft: "10px solid transparent",
                    borderRight: "10px solid transparent",
                    borderBottom: "18px solid #fff",
                    zIndex: 1,
                  },
                },
              },
              //   anchorOrigin: {
              //     vertical: "bottom",
              //     horizontal: "right",
              //   },
              transformOrigin: {
                vertical: -7,
                horizontal: 130,
              },
            }}
          >
            <h5>{props.header}</h5>
            {props?.data &&
              props.data?.map(({ title, iconUrl }: any) => (
                <MenuItem
                  value={title}
                  key={title}
                  style={{
                    width: "11.8rem",
                    padding: "0.4rem 0",
                    justifyContent: "space-between",
                  }}
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "transparent",
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    },
                  }}
                >
                  <p>{title}</p>
                  <img width="17" height="14" src={iconUrl} alt="icon" />
                </MenuItem>
              ))}
          </Select>
        </Tooltip>
      )}

      <div className="red-network">{dropDownMsg}</div>
    </FormControl>
  );
}
