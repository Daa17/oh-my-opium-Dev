import { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { observer } from "mobx-react";
import AuthStore from "./Services/Stores/AuthStore";
import Layout from "./Components/Layout/Layout";

const PoolsList = lazy(() => import("./Components/PoolsList/index"));
const PositionsList = lazy(() => import("./Components/PositionsList/index"));
const Wrapping = lazy(() => import("./Components/Wrapping/index"));

const testPos = [
  {
    endTime: "2131313211321",
    address: "0x5afFE41805a9E57fEd3657d0e64D96aeA0B77885",
    balance: "42",
    long: true,
  },
  {
    endTime: "1431313211321",
    address: "0x5afFE41805a9E57fEd3657d0e64D96aeA0B77885",
    balance: "42",
    long: false,
  },
];

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
      <Suspense
        fallback={
          <div
            style={{
              color: "#fff",
              position: "absolute",
              left: "50%",
              top: "50%",
            }}
          >
            Loading...
          </div>
        }
      >
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
              <Route
                path="positions"
                element={
                  <PositionsList
                    nestedPath={currentNetworkShortName}
                    testPos={testPos}
                  />
                }
              />
              <Route path="wOpium" element={<Wrapping />} />
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
      </Suspense>
    </>
  );
});
