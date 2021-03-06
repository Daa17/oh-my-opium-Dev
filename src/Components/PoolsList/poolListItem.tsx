import React, { FC, useState, useEffect, useRef } from "react";
import { observer } from "mobx-react";
import { useAlert } from "react-alert";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import moment from "moment";
import {
  Button,
  OpiumLink,
  ETheme,
  CollapseContainer,
} from "@opiumteam/react-opium-components";

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

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { shortenTabletAddress } from "../../Services/Utils/helpers";

import "../../styles/main.scss";
import "./styles.scss";

type Props = {
  pool: PoolType;
  showPurchasedProducts: Function;
  showMaintenance: Function;
  authStore?: any;
  appStore?: any;
};

const PoolsList: FC<Props> = (props: Props) => {
  const alert: any = useAlert();
  const userAddress = props.authStore.blockchainStore.address;
  const isloggedIn = props.authStore.loggedIn && userAddress;
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
  const [isMaintainable, setIsMaintainable] = useState(false);
  const [phaseInfoIsLoading, setPhaseInfoIsLoading] = useState(false);
  const [positionsLoading, setPositionsLoading] = useState(false);
  const [collapseIsOpened, setCollapseIsOpened] = useState(false);
  const [activeTab, setActiveTab] = React.useState("Stake");
  const ref = useRef<any>(null);
  const poolItemRef = useRef<any>(null);
  const { poolAddress } = pool;

  const stepperScrollHandler = (scrollOffset: any) => {
    ref.current.scrollLeft += scrollOffset;
  };
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const changeCollapseStatus = async (status: boolean) => {
    if (status && !props.appStore.requestsAreNotAllowed) {
      loadBalance();
      loadPhase();
      const maintainable = await isPoolMaintainable(pool.poolAddress);
      setIsMaintainable(maintainable);
    }
    setCollapseIsOpened(status);
  };

  useEffect(() => {
    if (protectValue === 0 || props.appStore.requestsAreNotAllowed) {
      setInsPrice(0);
      return;
    }
    getInsurancePrice(protectValue, pool).then((price) => {
      setInsPrice(price);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [protectValue, pool]);

  useEffect(() => {
    if (props.appStore.currentPoolId === poolAddress) {
      changeCollapseStatus(true);
      poolItemRef.current.scrollIntoView({
        behavior: "smooth",
        // block: "center",
        inline: "end",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.appStore.currentPoolId, poolItemRef]);

  useEffect(() => {
    return () => props.appStore.setCurrentPoolId("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.appStore.currentPoolId]);

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

  const renderHeader = () => {
    return (
      <div className="pools-list-item-header-wrapper">
        <div className="pools-list-item-header-info">
          <div className="pools-list-item-header-title">
            <img width="17" height="14" src={pool?.icon} alt="icon" />
            <a href={pool?.readMoreLink} target="_blank" rel="noreferrer">
              {pool.title}
            </a>
          </div>
          <div className="pools-list-item-header-address web-mobile">
            <OpiumLink
              theme={ETheme.DARK}
              newTab={true}
              label={pool?.poolAddress}
              href={getScanLink(pool.poolAddress, props.authStore.networkId)}
            />
          </div>
          <div className="pools-list-item-header-address tablet">
            <OpiumLink
              theme={ETheme.DARK}
              newTab={true}
              label={shortenTabletAddress(pool?.poolAddress)}
              href={getScanLink(pool.poolAddress, props.authStore.networkId)}
            />
          </div>
        </div>
        <div className={`arrow-button ${collapseIsOpened ? "up" : ""}`}>
          <Arrow />
        </div>
      </div>
    );
  };

  let options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  let date: any = new Date();
  const currentDate: any = date.toLocaleString("en-us", options);

  const isInWaitingPhase: any =
    date > new Date(phaseInfo.notInitialized.split("-")[1]);

  let currentPhaseNumber = 0;
  let currentPhaseTodo = "";

  switch (phaseInfo.currentPhaseText) {
    case "REBALANCING":
      currentPhaseNumber = 1;
      currentPhaseTodo =
        "During the rebelancing phase you can stake and unstake your funds";
      break;
    case "TRADING":
      currentPhaseNumber = 2;
      currentPhaseTodo =
        "During the active phase you can stake into the poll and buy the product";
      break;
    case "STAKING (ONLY)":
      currentPhaseNumber = 3;
      currentPhaseTodo =
        "During the staking only phase you can only stake into pool";
      break;
    case "WAITING":
      currentPhaseNumber = 5;
      currentPhaseTodo = "Now you need to wait untill pool is reinitalized";

      break;
  }
  if (isInWaitingPhase) {
    currentPhaseNumber = 4;
    currentPhaseTodo = "";
  }

  const renderBody = () => {
    if (collapseIsOpened) {
      return (
        <div className="pools-list-item-body-wrapper">
          <div className="pools-item-title">
            <div className="pools-list-item-phase-current">
              {props.appStore.requestsAreNotAllowed ? (
                isloggedIn ? (
                  "Please check your network"
                ) : (
                  "Please connect your wallet"
                )
              ) : phaseInfoIsLoading ? (
                "Loading..."
              ) : (
                <h4 className="current-phase-text">
                  {!isInWaitingPhase
                    ? phaseInfo.currentPhaseText
                    : "Not Initialized"}
                </h4>
              )}
            </div>
            {!props.appStore.requestsAreNotAllowed && (
              <span>{currentPhaseTodo}</span>
            )}
          </div>
          <div className="pools-list-subttitle">{phaseInfo.tradingPhase}</div>
          <div className="mobile_stepper_wrapper">
            <Button
              className="stepper_btn prev-btn"
              label=""
              onClick={() => stepperScrollHandler(-200)}
              style={{ backgroundColor: "transparent" }}
            />
            <div
              ref={ref}
              className={`pools-list-item-phase-wrapper ${
                currentPhaseNumber > 3 ? "overWaitingPhase" : ""
              }`}
            >
              <Stepper
                className="mobile-step"
                activeStep={currentPhaseNumber}
                alternativeLabel
              >
                <Step key={"phaseInfo.stakingPhase"}>
                  <span className="phase_name">Rebalansing phase</span>
                  <StepLabel>
                    {phaseInfo.stakingPhase
                      ? moment(phaseInfo.stakingPhase?.substring(0, 6)).format(
                          "DD MMM yyyy"
                        )
                      : ""}
                  </StepLabel>
                </Step>
                {currentPhaseNumber === 1 && (
                  <Step key={"phaseInfo.stakingPhase1"}>
                    <StepLabel>{`${currentDate}
                  `}</StepLabel>
                  </Step>
                )}
                <Step key={"phaseInfo.tradingPhase"}>
                  <span className="phase_name">Trading phase</span>
                  <StepLabel>
                    {phaseInfo.stakingPhase
                      ? moment(phaseInfo.tradingPhase?.substring(0, 6)).format(
                          "DD MMM yyyy"
                        )
                      : ""}
                  </StepLabel>
                </Step>
                {currentPhaseNumber === 2 && (
                  <Step key={"phaseInfo.stakingPhase1"}>
                    <StepLabel>{`${currentDate}
                  `}</StepLabel>
                  </Step>
                )}
                {phaseInfo.stakingOnly && (
                  <Step key={"phaseInfo.stakingOnly"}>
                    <span className="phase_name">Staking only</span>
                    <StepLabel>{moment().format("DD MMM yyyy")}</StepLabel>
                  </Step>
                )}
                {currentPhaseNumber === 3 && (
                  <Step key={"phaseInfo.stakingPhase1"}>
                    <StepLabel>{`${currentDate}
                  `}</StepLabel>
                  </Step>
                )}
                <Step key={"phaseInfo.waiting"}>
                  <span className="phase_name">Waiting phase</span>
                  <StepLabel>
                    {phaseInfo.stakingPhase
                      ? moment(
                          phaseInfo.notInitialized?.substring(0, 6)
                        ).format("DD MMM yyyy")
                      : ""}
                  </StepLabel>
                </Step>
              </Stepper>
            </div>

            <Button
              className="stepper_btn next-btn"
              label=""
              onClick={() => stepperScrollHandler(200)}
              style={{ backgroundColor: "transparent" }}
            />
          </div>
          <div className="mobile_hint">
            {!isInWaitingPhase ? phaseInfo.currentPhaseText : "Not Initialized"}
          </div>
          <div className="pools-list-item-info">
            <div className="pools-list-info">
              <div className="pools-list-info-row">
                <span className="pools-list-info-title">
                  Total staked in pool:
                </span>
                <span className="pools-list-info-amount">88 USDC</span>
              </div>
              <div className="pools-list-info-row">
                <span className="pools-list-info-title">Strike price:</span>
                <span className="pools-list-info-amount">88 USDC</span>
              </div>
              <div className="pools-list-info-row">
                <span className="pools-list-info-title">
                  Current pool's utilization:
                </span>
                <span className="pools-list-info-amount">88%</span>
              </div>
              <div className="pools-list-info-row">
                <span className="pools-list-info-title">
                  Return since instription:
                </span>
                <span className="pools-list-info-amount">0%</span>
              </div>
              <div className="pools-list-info-row">
                <span className="pools-list-info-title">Staked balance:</span>
                <span className="pools-list-info-amount blue">
                  {props.appStore.requestsAreNotAllowed
                    ? isloggedIn
                      ? "Please check your network"
                      : "Please connect your wallet"
                    : balanceIsLoading
                    ? "Loading..."
                    : balance}
                </span>
              </div>
              {!pool.isSuspended && isMaintainable && isInWaitingPhase && (
                <Button
                  variant="secondary"
                  className="blue"
                  label="open maintenance"
                  onClick={showMaintenance}
                  disabled={props.appStore.requestsAreNotAllowed}
                />
              )}
              <Button
                variant="secondary"
                label={
                  positionsLoading ? "loading ..." : "see positions in the pool"
                }
                onClick={checkProducts}
                disabled={
                  props.appStore.requestsAreNotAllowed || positionsLoading
                }
              />
            </div>
            <div className="buy_stake_wrapper">
              <div className="pools-list-item-stake">
                <div className="pools-item-title-wrapper">
                  <span>Stake</span>
                </div>
                <div className="pools-list-item-input">
                  Amount to stake ({pool.marginTitle}):
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
                    disabled={
                      props.appStore.requestsAreNotAllowed || pool.isSuspended
                    }
                  />
                  <Button
                    variant="secondary"
                    label="unstake"
                    onClick={makeUnstake}
                    disabled={
                      props.appStore.requestsAreNotAllowed || pool.isSuspended
                    }
                  />
                </div>
              </div>

              <div className="pools-list-item-buy">
                <div className="pools-item-title-wrapper">
                  <span>Buy product</span>
                </div>
                <div className="pools-list-item-input">
                  Amount to protect: ({pool.marginTitle}):
                  <input
                    type="number"
                    onChange={(e) => setProtectValue(+e.target.value)}
                  />
                </div>

                <div className="buy-buttons-wrapper">
                  <div className="pools-list-item-insurance-price">
                    <span>You pay: </span>
                    {`${
                      insPrice === 0
                        ? "N/A"
                        : `${parseFloat(insPrice.toFixed(3))} ${
                            pool.marginTitle
                          }`
                    }`}
                  </div>
                  <Button
                    variant="secondary"
                    label="buy"
                    onClick={makeHedging}
                    disabled={
                      props.appStore.requestsAreNotAllowed || pool.isSuspended
                    }
                  />
                </div>
              </div>
              <div className="mobile-tabs">
                <Tabs
                  value={activeTab}
                  onChange={handleChange}
                  aria-label="basic tabs example"
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
                    label="Stake"
                    value="Stake"
                    style={{
                      minHeight: "25px",
                    }}
                  />
                  <Tab
                    label="Buy product"
                    value="BuyProduct"
                    style={{
                      minHeight: "25px",
                    }}
                  />
                </Tabs>
                {activeTab === "Stake" ? (
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
                        disabled={
                          props.appStore.requestsAreNotAllowed ||
                          pool.isSuspended
                        }
                      />
                      <Button
                        variant="secondary"
                        label="unstake"
                        onClick={makeUnstake}
                        disabled={
                          props.appStore.requestsAreNotAllowed ||
                          pool.isSuspended
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <div className="pools-list-item-buy mobile">
                    <div className="pools-list-item-input">
                      Amount to protect: ({pool.marginTitle}):
                      <input
                        type="number"
                        onChange={(e) => setProtectValue(+e.target.value)}
                      />
                    </div>

                    <div className="buy-buttons-wrapper">
                      <div className="pools-list-item-insurance-price">
                        <span>You pay: </span>
                        {`${
                          insPrice === 0
                            ? "N/A"
                            : `${parseFloat(insPrice.toFixed(3))} ${
                                pool.marginTitle
                              }`
                        }`}
                      </div>
                      <Button
                        variant="secondary"
                        label="buy"
                        onClick={makeHedging}
                        disabled={
                          props.appStore.requestsAreNotAllowed ||
                          pool.isSuspended
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <>
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
      <div ref={poolItemRef} />
    </>
  );
};

export default observer(PoolsList);
