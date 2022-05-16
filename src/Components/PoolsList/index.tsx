import { FC, useEffect, useState, lazy } from "react";
import { observer } from "mobx-react";
import { useAlert } from "react-alert";
import { useLocation } from "react-router-dom";
import { ETheme, Popup } from "@opiumteam/react-opium-components";
import PoolListItem from "./poolListItem";
import {
  getPurchasedProducts,
  isPoolMaintainable,
  getPurchasedProductsTheGraph,
  // getStakedBalance,
} from "../../Services/Utils/methods";
import { PoolType, PositionType } from "../../Services/Utils/types";
import "./styles.scss";

// const PoolListItem = lazy(() => import("./poolListItem"));
const PositionsList = lazy(() => import("../PositionsList"));
const Maintenance = lazy(() => import("../Maintenance"));
const Filters = lazy(() => import("../Filters"));

const isTurbo = [
  "Turbo ETH",
  "ETH Dump Protection",
  "Weekly Turbo ETH",
  "Turbo BTC",
  "Turbo MATIC",
  "Turbo AAVE",
  "Daily Turbo ETH",
];
const isOpium = "$OPIUM Option Call";
interface IPoolList {
  nestedPath?: string;
  authStore?: any;
  appStore?: any;
}

const PoolsList: FC<IPoolList> = ({ nestedPath, authStore, appStore }) => {
  let { pathname } = useLocation();
  const alert = useAlert();
  const [popupIsOpened, setPopupIsOpened] = useState(false);
  const [positions, setPositions] = useState<PositionType[]>([]);
  const [sortedValue, setSortedValue] = useState<string>("expiration date");
  const [positionProductTitle, setPositionProductTitle] = useState<string>("");
  const [poolsByNetwork, setPoolsByNetwork] = useState(
    appStore?.poolsByNetwork
  );
  const [maintenanceIsOpened, setMaintenanceIsOpened] = useState(false);
  const [poolToMaintain, setPoolToMaintain] = useState<PoolType | null>(null);
  const [stakedPoolIds, setStakedPoolIds] = useState<PoolType[]>([]);
  const isPoolsPage = pathname.includes("all-pools");

  console.log("stakedPoolIds", stakedPoolIds);

  const showPurchasedProducts = async (pool: PoolType) => {
    let positions: PositionType[] | undefined = [];

    await getPurchasedProductsTheGraph(pool, authStore?.blockchainStore.address)
      .then((res) => (positions = res))
      .catch(async (e) => {
        await getPurchasedProducts(
          pool,
          authStore?.blockchainStore.address,
          (e) => alert.error(e.message)
        ).then((res) => (positions = res));
      });
    setPositions(positions);

    if (positions && positions.length) {
      setPopupIsOpened(true);
      setPositions(positions);
      setPositionProductTitle(pool.title);
    } else {
      alert.error("There are no purchased products");
    }
  };
  const poolsFilterHandler = (checkedValue: any) => {
    let filteredDataArr: any = [];

    const turbo = checkedValue.includes("turbo")
      ? appStore.poolsByNetwork.filter((item: any) =>
          isTurbo.includes(item.title)
        )
      : [];
    const opium = checkedValue.includes("$OPIUM products")
      ? appStore.poolsByNetwork.filter((item: any) => item.title === isOpium)
      : [];
    const insurance = checkedValue.includes("insurance")
      ? appStore.poolsByNetwork.filter(
          (item: any) => item.title !== isOpium && !isTurbo.includes(item.title)
        )
      : [];
    let filteredData = filteredDataArr.concat(turbo, opium, insurance);
    !checkedValue.length && (filteredData = appStore.poolsByNetwork);

    setPoolsByNetwork(filteredData);
  };

  useEffect(() => {
    if (sortedValue[0] === "name") {
      setPoolsByNetwork((prev: string[]) =>
        prev.sort((a: any, b: any) => (a.title > b.title ? 1 : -1))
      );
    } else if (sortedValue[0] === "APR") {
      setPoolsByNetwork((prev: string[]) =>
        prev.sort((a: any, b: any) =>
          a.yieldToDataAnnualized > b.yieldToDataAnnualized ? 1 : -1
        )
      );
    } else if (sortedValue[0] === "liquidity") {
      setPoolsByNetwork((prev: string[]) =>
        prev.sort((a: any, b: any) => (a.poolSize > b.poolSize ? 1 : -1))
      );
    } else if (sortedValue.includes("expiration date")) {
      setPoolsByNetwork((prev: string[]) =>
        prev.sort((a: any, b: any) =>
          a.currentEpochTimeStamp > b.currentEpochTimeStamp ? 1 : -1
        )
      );
    } else setPoolsByNetwork(appStore.poolsByNetwork);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedValue, poolsByNetwork]);

  const closePopup = () => {
    setPopupIsOpened(false);
    setPositionProductTitle("");
    setPositions([]);
  };

  const showMaintenance = async (pool: PoolType) => {
    if (!pool.oracle || pool.isSuspended) {
      alert.error("This pool is unmaintainable");
      return;
    }

    const isMaintainable = await isPoolMaintainable(pool.poolAddress);

    if (!isMaintainable) {
      alert.error("Current epoch has not finished yet");
      return;
    }

    setPoolToMaintain(pool);
    setMaintenanceIsOpened(true);
  };

  const closeMaintenance = () => {
    setPoolToMaintain(null);
    setMaintenanceIsOpened(false);
  };
  // const [balanceIds, setBalanceIds] = useState<any>([]);

  // const getStakedPools = () => {
  //   poolsByNetwork.map(async (pool: any) => {
  //     const balance = await getStakedBalance(
  //       pool.poolAddress,
  //       authStore?.blockchainStore.address
  //     );
  //     if (balance) {
  //       console.log("balance", balance);
  //       // setBalanceIds(balanceIds.push(pool.poolAddress));
  //     }
  //   });
  // };
  // getStakedPools();

  return (
    <div className="pools-list-wrapper">
      <Popup
        theme={ETheme.DARK}
        titleSize="lg"
        title="Purchased products"
        subtitle={positionProductTitle}
        className="positions-list-popup"
        popupIsOpen={popupIsOpened}
        closePopup={closePopup}
        component={<PositionsList currentPositions={positions} fromPopup />}
      />
      <Popup
        theme={ETheme.DARK}
        titleSize="lg"
        title="Maintenance"
        className="positions-list-popup"
        popupIsOpen={maintenanceIsOpened}
        closePopup={closeMaintenance}
        component={<Maintenance pool={poolToMaintain} />}
      />
      <Filters
        poolsFilterHandler={poolsFilterHandler}
        poolsSortedValue={setSortedValue}
        nestedPath={nestedPath}
      />
      {isPoolsPage && poolsByNetwork.length ? (
        poolsByNetwork.map((pool: any) => (
          <PoolListItem
            pool={pool}
            authStore={authStore}
            appStore={appStore}
            showPurchasedProducts={() => showPurchasedProducts(pool)}
            showMaintenance={() => showMaintenance(pool)}
            setStakedPoolIds={setStakedPoolIds}
            key={pool.poolAddress}
          />
        ))
      ) : (
        <div className="no_pools">
          No pools found according to chosen filters
        </div>
      )}
    </div>
  );
};

export default observer(PoolsList);
