import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { observer } from "mobx-react";
import PoolsList from "./Components/PoolsList";
import AuthStore from "./Services/Stores/AuthStore";
import Layout from "./Components/Layout/Layout";
import { Wopium } from "./Components/Wopium/Wopium";
import PositionsList from "./Components//PositionsList/index";

const testPos = [{
  endTime:'2131313211321',
  address:'0x5afFE41805a9E57fEd3657d0e64D96aeA0B77885',
  balance:'42',
  long:true,
},{
  endTime:'1431313211321',
  address:'0x5afFE41805a9E57fEd3657d0e64D96aeA0B77885',
  balance:'42',
  long:false,
}]

export const AppRouts = observer(() => {
  const [currentNetworkShortName, setCurrentNetworkShortName] = useState("eth");
  let currentNetworkId = AuthStore.networkId;

  useEffect(() => {
    if (currentNetworkId === 1) {
      setCurrentNetworkShortName("eth");
    } else if (currentNetworkId === 56) {
      setCurrentNetworkShortName("bcs");
    } else if (currentNetworkId === 137) {
      setCurrentNetworkShortName("polygon");
    }
  }, [currentNetworkId]);

  return (
    <>
      <Layout />
      <Routes>
        <Route path="/">
          <Route path={currentNetworkShortName}>
            <Route path="pools">
              <Route
                path="all-pools"
                element={<PoolsList nestedPath={currentNetworkShortName} />}
              />
              <Route
                path="my-stake"
                element={<PoolsList nestedPath={currentNetworkShortName} />}
              />
            </Route>
            <Route path="positions" element={<PositionsList positions={testPos}/>} />
            <Route path="wOpium" element={<Wopium/>} />
            <Route
              path="*"
              element={
                <Navigate
                  to={`/${currentNetworkShortName}/pools/all-pools`}
                  replace
                />
              }
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
});
