import { FC, useState, SyntheticEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MuiDropDown from "../DropDown";
import { useLocation } from "react-router";
import FilterIcon from "../../images/filter_icon.svg";
import { MY_STAKE, ALL_POOLS, POOLS } from "../../constants";

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
  poolsFilterHandler: any;
}

const Filters: FC<IFilter> = ({ nestedPath, poolsFilterHandler }) => {
  let navigate = useNavigate();
  let location = useLocation();
  const [value, setValue] = useState<string>(ALL_POOLS);
  const currentPath = location.pathname;
  let currentValue = currentPath.substring(
    currentPath.lastIndexOf("/") + 1,
    currentPath.length
  );
  const applyFilter = (data: any) => {
    poolsFilterHandler(data);
  };
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(`/${nestedPath}/${POOLS}/${newValue}`);
  };

  useEffect(() => {
    setValue(currentValue);
  }, [currentPath, currentValue]);

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
            applyFilter={applyFilter}
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
              applyFilter={applyFilter}
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
            applyFilter={applyFilter}
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
