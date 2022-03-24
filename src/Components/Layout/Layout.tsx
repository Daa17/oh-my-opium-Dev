import { useState, useEffect, SyntheticEvent } from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Header from "../Header/index";

import "./Layout.scss";
interface ILayout {
  path?: string;
}

const Layout: React.FC<ILayout> = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>("all-pools");
  const [activeLayout, setActiveLayout] = useState("pools");
  const [currentNetwork, setCurrentNetwork] = useState("eth");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    if (newValue === "all-pools") {
      setValue("all-pools");
      navigate(`/${currentNetwork}/pools/all-pools`);
      setActiveLayout("pools");
    } else {
      setValue(newValue);
      setActiveLayout(newValue);
      navigate(`/${currentNetwork}/${newValue}`);
    }
  };

  const networkhandler = (network: string) => {
    setCurrentNetwork(network);
    navigate(`/${network}/${activeLayout}/${value}`);
  };
  useEffect(() => {
    if (activeLayout === "pools") {
      navigate(`/${currentNetwork}/pools/${value}`);
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
        >
          <Tab label="pools" value="all-pools" />
          <Tab label="positions" value="positions" />
        </Tabs>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="wOpium" value="wOpium" />
        </Tabs>
      </div>
    </div>
  );
};

export default observer(Layout);
