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
import { styled } from '@mui/material/styles';

import "../../styles/main.scss";
import "./styles.scss";
import { scaleBand } from "d3-scale";

const BpIcon = styled('span')(({ theme }) => ({

  width: '0.625rem',
  height: '0.625rem',
  border: '0.5px solid #FFFFFF',
  marginRight: '0.4375rem',

  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
  },
}));

// const BpCheckedIcon = styled(BpIcon)({
//   // backgroundColor: '#137cbd',
//   // backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
//   '&:before': {
//     // display: 'block',
//     width: '0.625rem',
//     height: '0.625rem',
//     // backgroundImage:
//     //   "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
//     //   " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
//     //   "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
//     // content: '""',
//   },
//   // 'input:hover ~ &': {
//   //   backgroundColor: '#106ba3',
//   // },
// });

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
          style={{
            width: '13.92rem',
            borderRadius: '10px'
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: '#222234',
                '& .MuiMenuItem-root': {
                  '& .Mui-selected': {
                    backgroundColor: 'transparent',
                  },
                },
                '& .Mui-selected': {
                  backgroundColor: 'transparent'
                },
                '&:before': {
                  content: `" "`,
                  width: 0,
                  height: 0,
                  top: 0,
                  right: 0,
                  transform: 'translate(0, -90%)',
                  position: 'absolute',
                  borderLeft: '10px solid transparent',
                  borderRight: '10px solid transparent',
                  borderBottom: '18px solid #222234',
                  zIndex: 2
                },
                '&:after': {
                  content: `" "`,
                  width: 0,
                  height: 0,
                  top: 0,
                  right: 0,
                  transform: 'translate(0, -100%)',
                  position: 'absolute',
                  borderLeft: '10px solid transparent',
                  borderRight: '10px solid transparent',
                  borderBottom: '18px solid #fff',
                  zIndex: 1
                }
              },
            },
          }}
        >
          <h4>{props.checkboxHeader}</h4>
          {props.checkboxData?.map(({ title, value }: any) => (
            <MenuItem key={title} value={value} className="menu_item"
              style={{
                padding: '0.37rem 0',
                marginBottom: '0.75rem'
              }}
            >
              <Checkbox checked={data.indexOf(title) > -1} 
                   style={{
                    padding: 0,
                    color: "#fff",
                    transform: 'scale(0.6)',
                  }}
                  size="small" 
                  // icon={<BpIcon />}
                  // checkedIcon={<BpCheckedIcon />}
              />
              <ListItemText primary={title} />
            </MenuItem>
          ))}

          {props?.radioData && (
            <div>
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
                    control={<Radio style={{ 
                      padding: 0, 
                      color: "#fff",
                      transform: 'scale(0.6)'
                    }}
                    size="small" 
                    />}
                    label={title}
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.37rem 0',
                      margin: '0 0 0.75rem 0',
                    }}
                  />
                ))}
              </RadioGroup>
            </div>
          )}
          <Button
            variant="secondary"
            className="apply_filter"
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
          style={{
            width: '13.92rem',
            borderRadius: '10px'
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: '#222234',
                '& .MuiMenuItem-root': {
                  '& .Mui-selected': {
                    backgroundColor: 'transparent',
                  },
                },
                '& .Mui-selected': {
                  backgroundColor: 'transparent'
                },
                '&:before': {
                  content: `" "`,
                  width: 0,
                  height: 0,
                  top: 0,
                  right: 0,
                  transform: 'translate(0, -90%)',
                  position: 'absolute',
                  borderLeft: '10px solid transparent',
                  borderRight: '10px solid transparent',
                  borderBottom: '18px solid #222234',
                  zIndex: 2
                },
                '&:after': {
                  content: `" "`,
                  width: 0,
                  height: 0,
                  top: 0,
                  right: 0,
                  transform: 'translate(0, -100%)',
                  position: 'absolute',
                  borderLeft: '10px solid transparent',
                  borderRight: '10px solid transparent',
                  borderBottom: '18px solid #fff',
                  zIndex: 1
                }
              },
            },
          }}
        >
          <h4>{props.header}</h4>
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
