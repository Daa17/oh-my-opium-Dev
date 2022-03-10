import React, { FC } from "react";
import { Tabs, Button } from "@opiumteam/react-opium-components";
import MuiDropDown from "../DropDown";
// import PoolsList from '../PoolsList'

import "../../styles/main.scss";
import "./styles.scss";

const tabItems = [
  { title: "All pools", eventKey: "All pools", content: <span></span> },
  { title: "My stake", eventKey: "My stake", content: <span></span> },
];
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

const applyFilter = () => {};
const Filters: FC<{}> = () => {
  return (
    <div className="filters_wrapper">
      <div className="filters_tab_wrapper">
        <Tabs
          id="filters"
          items={tabItems}
          // defaultActiveKey="pools"
        />
      </div>
      <div className="dropdowns_container">
        <div className="dropdown-wrapper">
          <MuiDropDown
            isCheckbox
            checkboxHeader="Programs"
            title="Programs"
            checkboxData={programsDropdownItems}
          />
        </div>
        <div className="sort_dropdown">
          <span>Sort by:</span>
          <div className="dropdown-wrapper">
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
