import { useState, useEffect, SyntheticEvent } from "react";
import { observer } from "mobx-react";
import { useNavigate, useLocation } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Header from "../Header/index";
import { MY_STAKE, ALL_POOLS, POSITIONS, WOPIUM, POOLS } from "../../constants";

import "./Layout.scss";
interface ILayout {
  path?: string;
}

const Layout: React.FC<ILayout> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [value, setValue] = useState<string>(ALL_POOLS);
  const [activeLayout, setActiveLayout] = useState(POOLS);
  const [currentNetwork, setCurrentNetwork] = useState("eth");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    if (newValue === ALL_POOLS) {
      setValue(ALL_POOLS);
      navigate(`/${currentNetwork}/${POOLS}/${ALL_POOLS}`);
      setActiveLayout(POOLS);
    } else {
      setValue(newValue);
      setActiveLayout(newValue);
      navigate(`/${currentNetwork}/${newValue}`);
    }
  };
  useEffect(() => {
    if (currentPath.includes(POSITIONS)) {
      setActiveLayout(POSITIONS);
      setValue(POSITIONS);
    }
    if (currentPath.includes(POSITIONS) && value !== ALL_POOLS) {
      navigate(`/${currentNetwork}/${POSITIONS}`);
    } else if (
      !currentPath.includes(POSITIONS) &&
      !currentPath.includes(MY_STAKE)
    ) {
      setValue(ALL_POOLS);
      setActiveLayout(POOLS);
      navigate(`/${currentNetwork}/${POOLS}/${ALL_POOLS}`);
    } else if (currentPath.includes(MY_STAKE)) {
      setValue(ALL_POOLS);
      setActiveLayout(POOLS);
      navigate(`/${currentNetwork}/${POOLS}/${MY_STAKE}`);
    }
  }, [currentPath]);

  const networkhandler = (network: string) => {
    setCurrentNetwork(network);
    navigate(`/${network}/${activeLayout}/${value}`);
  };

  useEffect(() => {
    if (activeLayout === POOLS) {
      navigate(`/${currentNetwork}/${POOLS}/${value}`);
    } else navigate(`/${currentNetwork}/${activeLayout}`);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Header networkhandler={networkhandler} />
      <div className="Layout-tabs-area">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          classes={{
            flexContainer: "flexContainer",
            indicator: "indicator"
          }}
          style = {{
            minHeight: "25px"
          }}
          TabIndicatorProps={{ children: <span /> }}
        >
          <Tab label="pools" value={ALL_POOLS} className="pools_btn"
              style = {{
                minHeight: "25px"
              }}
          />
          <Tab label="positions" value={POSITIONS} 
              style = {{
                minHeight: "25px"
              }}
          />
        </Tabs>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          classes={{
            flexContainer: "flexContainer",
            indicator: "indicator"
          }}
          style = {{
            minHeight: "25px"
          }}
          TabIndicatorProps={{ children: <span /> }}
        >
          <Tab label="wOPIUM" value={WOPIUM} 
              style = {{
                minHeight: "25px"
              }}
          />
        </Tabs>
      </div>
    </div>
  );
};

export default observer(Layout);
