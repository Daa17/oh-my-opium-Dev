import { FC, useState, SyntheticEvent } from "react";
import { Button } from "@opiumteam/react-opium-components";
import { useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MuiDropDown from "../DropDown";

import FilterIcon from "../../images/filter_icon.svg";

import "../../styles/main.scss";
import "./styles.scss";

const programsDropdownItems = [
  { title: "turbo", value: "turbo" },
  { title: "inshurance", value: "inshurance" },
  { title: "$OPIUM products", value: "$OPIUM products" },
];

const sortDropdownItems = [
  { title: "expiration date", value: "expiration date" },
  { title: "liquidity", value: "liquidity" },
  { title: "APR", value: "APR" },
  { title: "name", value: "name" },
];

interface IFilter {
  nestedPath?: string;
}

const applyFilter = () => {};
const Filters: FC<IFilter> = ({ nestedPath }) => {
  let navigate = useNavigate();

  const [value, setValue] = useState<string>("all-pools");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(`/${nestedPath}/pools/${newValue}`);
  };

  return (
    <div className="filters_wrapper">
      <div className="filters_tab_wrapper">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          className="filter-tabs"
          classes={{
            flexContainer: "flexContainer",
            indicator: "indicator"
          }}
          style = {{
            minHeight: "25px"
          }}
          TabIndicatorProps={{ children: <span /> }}
        >
          <Tab label="All Pools" value="all-pools" 
            style = {{
              minHeight: "25px"
            }}
          />
          <Tab label="My Stake" value="my-stake" 
            style = {{
              minHeight: "25px"
            }}
          />
        </Tabs>
      </div>
      <div className="dropdowns_container">
        <div className="dropdown-wrapper programs">
          <MuiDropDown
            isCheckbox
            checkboxHeader="Programs"
            title="Programs"
            checkboxData={programsDropdownItems}
          />
        </div>
        <div className="sort_dropdown">
          <span>Sort by:</span>
          <div className="dropdown-wrapper sorting">
            <MuiDropDown
              isRadio
              radioHeader="Sort By"
              title="expiration date"
              radioData={sortDropdownItems}
            />
          </div>
        </div>
      </div>

      <div className="mobile_dropdowns">
        <div className="dropdown-wrapper">
          <img src={FilterIcon} alt="filter_icon" className="filter_icon" />
          <MuiDropDown
            title=" "
            radioHeader="Sort By"
            checkboxHeader="Programs"
            checkboxData={programsDropdownItems}
            radioData={sortDropdownItems}
            className="filter_dropdown"
            mobile
          >
            <Button
              variant="secondary"
              className="apply_filter"
              style={{
                backgroundColor: "transparent",
                color: "#fff",
              }}
              label="apply"
              onClick={applyFilter}
            />
          </MuiDropDown>
        </div>
      </div>
    </div>
  );
};

export default Filters;
