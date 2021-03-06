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
  authStore?: any;
  appStore?: any;
  AuthType?: any;
}

const Layout: React.FC<ILayout> = ({ authStore, appStore, AuthType }) => {
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
    } else if (newValue === WOPIUM) {
      setValue(WOPIUM);
      navigate(`/${currentNetwork}/${WOPIUM}`);
      setActiveLayout(WOPIUM);
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
    if (currentPath.includes(WOPIUM)) {
      setActiveLayout(WOPIUM);
      setValue(WOPIUM);
    }
    if (currentPath.includes(POSITIONS) && value !== ALL_POOLS) {
      navigate(`/${currentNetwork}/${POSITIONS}`);
    }
    if (currentPath.includes(WOPIUM) && value !== ALL_POOLS) {
      navigate(`/${currentNetwork}/${WOPIUM}`);
    } else if (
      !currentPath.includes(WOPIUM) &&
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath]);

  const networkhandler = (network: string) => {
    setCurrentNetwork(network);
    if (activeLayout === POOLS) {
      navigate(`/${network}/${activeLayout}/${value}`);
    } else navigate(`/${network}/${activeLayout}`);
  };

  useEffect(() => {
    if (activeLayout === POOLS) {
      navigate(`/${currentNetwork}/${POOLS}/${value}`);
    } else navigate(`/${currentNetwork}/${activeLayout}`);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Header
        authStore={authStore}
        appStore={appStore}
        AuthType={AuthType}
        networkhandler={networkhandler}
      />
      <div className="Layout-tabs-area">
        <Tabs
          value={value}
          onChange={handleChange}
          classes={{
            flexContainer: "flexContainer",
            indicator: "indicator",
          }}
          style={{
            minHeight: "25px",
          }}
          TabIndicatorProps={{ children: <span /> }}
        >
          <Tab
            label="pools"
            value={ALL_POOLS}
            className="pools_btn"
            style={{
              minHeight: "25px",
            }}
          />
          <Tab
            label="positions"
            value={POSITIONS}
            style={{
              minHeight: "25px",
            }}
          />
          <Tab
            label="wOPIUM"
            value={WOPIUM}
            style={{
              display: "none",
            }}
          />
        </Tabs>
        <Tabs
          value={value}
          onChange={handleChange}
          classes={{
            flexContainer: "flexContainer",
            indicator: "indicator",
          }}
          style={{
            minHeight: "25px",
          }}
          TabIndicatorProps={{ children: <span /> }}
        >
          <Tab
            label="pools"
            value={ALL_POOLS}
            style={{
              display: "none",
            }}
          />
          <Tab
            label="positions"
            value={POSITIONS}
            style={{
              display: "none",
            }}
          />
          <Tab
            label="wOPIUM"
            value={WOPIUM}
            style={{
              minHeight: "22px",
            }}
          />
        </Tabs>
      </div>
    </div>
  );
};

export default observer(Layout);
