import { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { observer } from "mobx-react";
import authStore from "./Services/Stores/AuthStore";
import appStore from "./Services/Stores/AppStore";
import { AuthType } from "@opiumteam/mobx-web3";
import Layout from "./Components/Layout/Layout";
import PoolsList from "./Components/PoolsList/index";
import EmptyPage from "./Components/EmptyPage";
// const PoolsList = lazy(() => import("./Components/PoolsList/index"));
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

const AppRouts = observer(() => {
  const [currentNetworkShortName, setCurrentNetworkShortName] = useState("eth");
  let currentNetworkId = authStore.networkId;
  const isLoggedIn = authStore.loggedIn && authStore.blockchainStore.address;
  let navigateToWopium =
    currentNetworkShortName === "eth" && isLoggedIn ? (
      <Wrapping />
    ) : (
      <EmptyPage
        description={
          isLoggedIn
            ? "Please change the network to Ethereum for watching the wOPIUM page."
            : "Please log in for watching the wOPIUM page"
        }
      />
    );
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
      <Layout authStore={authStore} appStore={appStore} AuthType={AuthType} />
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
                  element={
                    <PoolsList
                      authStore={authStore}
                      appStore={appStore}
                      nestedPath={currentNetworkShortName}
                    />
                  }
                />
                <Route
                  path="my-stake"
                  element={
                    <PoolsList
                      authStore={authStore}
                      appStore={appStore}
                      nestedPath={currentNetworkShortName}
                    />
                  }
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
              <Route path="wOpium" element={navigateToWopium} />
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

export default AppRouts;
