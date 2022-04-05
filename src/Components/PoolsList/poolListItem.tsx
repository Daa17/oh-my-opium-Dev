import React, { FC, useState, useEffect } from "react";
import { observer } from "mobx-react";
import { useAlert } from "react-alert";
import {
  Button,
  OpiumLink,
  ETheme,
  CollapseContainer,
} from "@opiumteam/react-opium-components";
import appStore from "../../Services/Stores/AppStore";
import authStore from "../../Services/Stores/AuthStore";
import {
  stakeIntoPool,
  checkAllowance,
  makeApprove,
  unstakeFromPool,
  buyProduct,
  checkTokenBalance,
  checkStakedBalance,
  getPoolPhase,
  getStakedBalance,
  checkPhase,
  getInsurancePrice,
  isPoolMaintainable,
} from "../../Services/Utils/methods";
import { PoolType } from "../../Services/Utils/types";
import { getScanLink } from "../../Services/Utils/transaction";
import Arrow from "./arrow";

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import {Tabs } from '@opiumteam/react-opium-components';
import "rc-slider/assets/index.css";
import "./styles.scss";

type Props = {
  pool: PoolType;
  showPurchasedProducts: Function;
  showMaintenance: Function;
};

const PoolsList: FC<Props> = (props: Props) => {
  const { pool, showPurchasedProducts, showMaintenance } = props;

  const [stakeValue, setStakeValue] = useState(0);
  const [protectValue, setProtectValue] = useState(0);
  const [insPrice, setInsPrice] = useState(0);
  const [balance, setBalance] = useState("");
  const [balanceIsLoading, setBalanceIsLoading] = useState(false);
  const [phaseInfo, setPhaseInfo] = useState<{
    currentPhaseText: string;
    stakingPhase: string;
    tradingPhase: string;
    notInitialized: string;
    stakingOnly: string;
  }>({
    currentPhaseText: "",
    stakingPhase: "",
    tradingPhase: "",
    notInitialized: "",
    stakingOnly: "",
  });
  const [phaseInfoIsLoading, setPhaseInfoIsLoading] = useState(false);
  const [isMaintainable, setIsMaintainable] = useState(false);
  const [positionsLoading, setPositionsLoading] = useState(false);

  const [collapseIsOpened, setCollapseIsOpened] = useState(false);

  const changeCollapseStatus = async (status: boolean) => {
    if (status && !appStore.requestsAreNotAllowed) {
      loadBalance();
      loadPhase();
      const maintainable = await isPoolMaintainable(pool.poolAddress);
      setIsMaintainable(maintainable);
    }
    setCollapseIsOpened(status);
  };

  useEffect(() => {
    if (protectValue === 0 || appStore.requestsAreNotAllowed) {
      setInsPrice(0);
      return;
    }
    getInsurancePrice(protectValue, pool).then((price) => {
      setInsPrice(price);
    });
  }, [protectValue, pool]);

  const alert = useAlert();

  const userAddress = authStore.blockchainStore.address;

  const makeStake = async () => {
    const { isStaking, isStakingOnly } = await checkPhase(
      pool.poolAddress,
      phaseInfo.currentPhaseText
    );
    if (!isStaking && !isStakingOnly) {
      alert.error("Stakings is available only during rebalancing phase");
      return;
    }

    if (stakeValue === 0) {
      alert.error("Please enter the amount");
      return;
    }

    const insufficientBalance = await checkTokenBalance(
      pool.poolAddress,
      userAddress,
      stakeValue
    );
    if (insufficientBalance) {
      alert.error("Insufficient balance");
      return;
    }

    const tokenAllowed = await checkAllowance(
      stakeValue,
      pool.poolAddress,
      userAddress
    );
    if (!tokenAllowed) {
      makeApprove(
        pool.poolAddress,
        userAddress,
        () =>
          stakeIntoPool(
            stakeValue,
            pool.poolAddress,
            userAddress,
            () => alert.success("Token was successfully approved"),
            (e) => alert.error(e.message)
          ),
        (e) => alert.error(e.message)
      );
    } else {
      stakeIntoPool(
        stakeValue,
        pool.poolAddress,
        userAddress,
        () => alert.success("Successfully staked"),
        (e) => alert.error(e.message)
      );
    }
  };

  const makeHedging = async () => {
    const { isTrading, isStaking } = await checkPhase(
      pool.poolAddress,
      phaseInfo.currentPhaseText
    );
    if (!isTrading && !isStaking) {
      alert.error(
        "Purchasing is available only during trading or rebalancing phases"
      );
      return;
    }

    if (protectValue === 0) {
      alert.error("Please enter the amount");
      return;
    }

    const insufficientBalance = await checkTokenBalance(
      pool.poolAddress,
      userAddress,
      insPrice
    );
    if (insufficientBalance) {
      alert.error("Insufficient balance");
      return;
    }

    const tokenAllowed = await checkAllowance(
      protectValue,
      pool.poolAddress,
      userAddress
    );
    if (!tokenAllowed) {
      makeApprove(
        pool.poolAddress,
        userAddress,
        () =>
          buyProduct(
            protectValue,
            pool,
            userAddress,
            () => alert.success("Successfully bought the product"),
            (e) => alert.error(e.message),
            () => alert.error("Pool has insufficient liquidity")
          ),
        (e) => alert.error(e.message)
      );
    } else {
      buyProduct(
        protectValue,
        pool,
        userAddress,
        () => alert.success("Successfully bought the product"),
        (e) => alert.error(e.message),
        () => alert.error("Pool has insufficient liquidity")
      );
    }
  };

  const makeUnstake = async () => {
    const { isStaking } = await checkPhase(
      pool.poolAddress,
      phaseInfo.currentPhaseText
    );
    if (!isStaking) {
      alert.error("Unstaking is available only during rebalancing phase");
      return;
    }
    if (stakeValue === 0) {
      alert.error("Please enter the amount");
      return;
    }

    const insufficientStake = await checkStakedBalance(
      pool.poolAddress,
      userAddress,
      stakeValue
    );
    if (insufficientStake) {
      alert.error("insufficient staked balance");
      return;
    }
    unstakeFromPool(
      stakeValue,
      pool.poolAddress,
      userAddress,
      () => alert.success("Successfully unstaked"),
      (e) => alert.error(e.message)
    );
  };

  const loadBalance = async () => {
    setBalanceIsLoading(true);
    const balance = await getStakedBalance(pool.poolAddress, userAddress);
    setBalance(balance);
    setBalanceIsLoading(false);
  };

  const loadPhase = async () => {
    setPhaseInfoIsLoading(true);
    const phases = await getPoolPhase(pool.poolAddress);
    setPhaseInfo(phases);
    setPhaseInfoIsLoading(false);
  };

  const checkProducts = async () => {
    setPositionsLoading(true);
    await showPurchasedProducts();
    setPositionsLoading(false);
  };
  const steps = [
    '15 Oct 2021',
    '6 Nov 2021',
    '20 Nov 2021',
    '25 Nov 2021',
    '12 Dec 2021',
  ];
  // const marks = [
  //   {
  //     value: 0,
  //     label: "15 Oct 2021",
  //   },
  //   {
  //     value: 20,
  //     label: "6 Nov 2021"
  //   },
  //   {
  //     value: 70,
  //     label: "20 Nov 2021"
  //   },
  //   {
  //     value: 90,
  //     label: "25 Nov 2021"
  //   },
  //   {
  //     value: 100,
  //     label: "12 Dec 2021"
  //   },
  // ]
  const renderHeader = () => {
    console.log("render", pool.poolAddress);
    console.log("render", authStore.networkId);
    console.log("ijiki", getScanLink(pool.poolAddress, authStore.networkId));
    return (
      <div className="pools-list-item-header-wrapper">
        <div className="pools-list-item-header-info">
          <div className="pools-list-item-header-title">
            <img src={pool?.icon} alt="icon" />
            <span>{pool.title}</span>
          </div>
          <div className="pools-list-item-header-address">
            <OpiumLink
              theme={ETheme.DARK}
              newTab={true}
              label={pool?.poolAddress}
              href={getScanLink(pool.poolAddress, authStore.networkId)}
            />
          </div>
        </div>
        <div className={`arrow-button ${collapseIsOpened ? "up" : ""}`}>
          <Arrow />
        </div>
      </div>
    );
  };

  const tabItems = [
    {title: "Stake", eventKey: "stake", content: 
    <div className="pools-list-item-stake mobile">
    <div className="pools-list-item-input">
      Amount to stake ({pool.marginTitle}):{" "}
      <input
        type="number"
        onChange={(e) => setStakeValue(+e.target.value)}
      />
    </div>
    <div className="buttons-wrapper">
      <Button
        variant="secondary"
        label="stake"
        onClick={makeStake}
        disabled={appStore.requestsAreNotAllowed || pool.isSuspended}
      />
      <Button
        variant="secondary"
        label="unstake"
        onClick={makeUnstake}
        disabled={appStore.requestsAreNotAllowed || pool.isSuspended}
      />
    </div>
  </div>},
    {title: "Buy product", eventKey: "buy", content: 

    <div className="pools-list-item-buy mobile">
    <div className="pools-list-item-input">
      Amount ({pool.marginTitle}):{" "}
      <input
        type="number"
        onChange={(e) => setProtectValue(+e.target.value)}
      />
    </div>

    <div className="buy-buttons-wrapper">
      <div className="pools-list-item-insurance-price">
        <span>You pay: </span>
        {`${insPrice === 0
            ? "N/A"
            : `${parseFloat(insPrice.toFixed(3))} ${pool.marginTitle}`
          }`}
      </div>
      <Button
        variant="secondary"
        label="buy"
        onClick={makeHedging}
        disabled={appStore.requestsAreNotAllowed || pool.isSuspended}
      />
    </div>
  </div>
  },
]
  const renderBody = () => {
    return (
      <div className="pools-list-item-body-wrapper">
        <div className="pools-item-title">
          <h4> Phase name</h4>
          <span>Now you can do this and this</span>
        </div>
        <div className="pools-list-subttitle">{phaseInfo.tradingPhase}</div>
        <div className="pools-list-item-phase-wrapper">
        <Stepper activeStep={2} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <span className="phase_name">Rebalansing phase</span>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
        </Stepper>
        
        {/* <h1>Slider</h1>
        <Slider aria-label="Custom marks" defaultValue={35} marks={marks} disabled/> */}
        </div>
        {pool.isSuspended ? (
          <div>Pool is suspended</div>
        ) : isMaintainable ? (
          <div>
            <div className="pool-list-item-no-epoch">
              Epoch is not initialized
            </div>
            <Button
              variant="secondary"
              className="blue"
              size="sm"
              label="open maintenance"
              onClick={showMaintenance}
              disabled={appStore.requestsAreNotAllowed}
            />
          </div>
        ) : (
          <div className="pools-list-item-phase-wrapper">
            <div className="pools-list-item-phase-current">
              Current phase:
              {appStore.requestsAreNotAllowed ? (
                "Please check your network"
              ) : phaseInfoIsLoading ? (
                "Loading..."
              ) : (
                <div className="current-phase-text">
                  {phaseInfo.currentPhaseText}
                </div>
              )}
            </div>
            <div
              className={`pools-list-item-phase ${"REBALANCING" === phaseInfo.currentPhaseText && "bold-text"
                }`}
            >
              Rebalancing phase:
              {appStore.requestsAreNotAllowed
                ? "Please check your network"
                : phaseInfoIsLoading
                  ? "Loading..."
                  : phaseInfo.stakingPhase}
            </div>
            <div
              className={`pools-list-item-phase ${"TRADING" === phaseInfo.currentPhaseText && "bold-text"
                }`}
            >
              Trading phase:
              {appStore.requestsAreNotAllowed
                ? "Please check your network"
                : phaseInfoIsLoading
                  ? "Loading..."
                  : phaseInfo.tradingPhase}
            </div>
            {phaseInfo.stakingOnly && (
              <div
                className={`pools-list-item-phase ${"STAKING (ONLY)" === phaseInfo.currentPhaseText &&
                  "bold-text"
                  }`}
              >
                Staking (only) phase:
                {appStore.requestsAreNotAllowed
                  ? "Please check your network"
                  : phaseInfoIsLoading
                    ? "Loading..."
                    : phaseInfo.stakingOnly}
              </div>
            )}
            <div
              className={`pools-list-item-phase ${"WAITING" === phaseInfo.currentPhaseText && "bold-text"
                }`}
            >
              Waiting phase:
              {appStore.requestsAreNotAllowed
                ? "Please check your network"
                : phaseInfoIsLoading
                  ? "Loading..."
                  : phaseInfo.notInitialized}
            </div>
          </div>
        )}
        <div className="pools-list-item-info">
          <div className="pools-list-info">
            <div className="pools-list-info-row">
              <span className="pools-list-info-title">Total staked in pool:</span>
              <span className="pools-list-info-amount">88 USDC</span>
            </div>
            <div className="pools-list-info-row">
              <span className="pools-list-info-title">Strike price:</span>
              <span className="pools-list-info-amount">88 USDC</span>
            </div>
            <div className="pools-list-info-row">
              <span className="pools-list-info-title">Current pool's utilization:</span>
              <span className="pools-list-info-amount">88%</span>
            </div>
            <div className="pools-list-info-row">
              <span className="pools-list-info-title">Return since instription:</span>
              <span className="pools-list-info-amount">0%</span>
            </div>
            <div className="pools-list-info-row">
              <span className="pools-list-info-title">Staked balance:</span>
              <span className="pools-list-info-amount blue">
                {appStore.requestsAreNotAllowed
                  ? "Please check your network"
                  : balanceIsLoading
                    ? "Loading..."
                    : balance}
              </span>
            </div>
            <Button
              variant="secondary"
              label={
                positionsLoading ? "loading ..." : "see positions in the pool"
              }
              onClick={checkProducts}
              disabled={appStore.requestsAreNotAllowed || positionsLoading}
            />
          </div>
          <div className="buy_stake_wrapper">
            <div className="pools-list-item-stake">
              <div className="pools-item-title-wrapper">
                <span>Stake</span>
                <a href="#">read more</a>
              </div>
              <div className="pools-list-item-input">
                Amount to stake ({pool.marginTitle}):{" "}
                <input
                  type="number"
                  onChange={(e) => setStakeValue(+e.target.value)}
                />
              </div>
              <div className="buttons-wrapper">
                <Button
                  variant="secondary"
                  label="stake"
                  onClick={makeStake}
                  disabled={appStore.requestsAreNotAllowed || pool.isSuspended}
                />
                <Button
                  variant="secondary"
                  label="unstake"
                  onClick={makeUnstake}
                  disabled={appStore.requestsAreNotAllowed || pool.isSuspended}
                />
              </div>
            </div>

            <div className="pools-list-item-buy">
              <div className="pools-item-title-wrapper">
                <span>Buy product</span>
                <a href="#">read more</a>
              </div>
              <div className="pools-list-item-input">
                Amount ({pool.marginTitle}):{" "}
                <input
                  type="number"
                  onChange={(e) => setProtectValue(+e.target.value)}
                />
              </div>

              <div className="buy-buttons-wrapper">
                <div className="pools-list-item-insurance-price">
                  <span>You pay: </span>
                  {`${insPrice === 0
                      ? "N/A"
                      : `${parseFloat(insPrice.toFixed(3))} ${pool.marginTitle}`
                    }`}
                </div>
                <Button
                  variant="secondary"
                  label="buy"
                  onClick={makeHedging}
                  disabled={appStore.requestsAreNotAllowed || pool.isSuspended}
                />
              </div>
            </div>
            <div className="mobile-tabs">
              <Tabs
                     id= "buy-stack-tabs"
                     items={tabItems}
                     defaultActiveKey="stake"
              />
            </div>
          </div>

        </div>
      </div>
    );
  };
  console.log("{pool.poolAddress", pool.poolAddress);
  return (
    <CollapseContainer
      isOpened={collapseIsOpened}
      setIsOpened={(id: string, status: boolean) =>
        changeCollapseStatus(status)
      }
      key={pool.poolAddress}
      collapseKey={pool.poolAddress}
      theme={ETheme.DARK}
      header={renderHeader()}
      body={renderBody()}
      hoverControlled
      className="collapse-item"
    />
  );
};

export default observer(PoolsList);
