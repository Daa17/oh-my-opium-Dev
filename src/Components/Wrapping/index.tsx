import React, { FC, useState, useEffect } from "react";
import { observer } from "mobx-react";
import { useAlert } from "react-alert";
import { Button } from "@opiumteam/react-opium-components";
import authStore from "../../Services/Stores/AuthStore";
import {
  wrapToWopium,
  unwrapToOpium,
  checkWrapperAllowance,
  makeApprove,
  getOpiumBalance,
  getWopiumBalance,
} from "../../Services/Utils/methods";
import { wrapperProducts } from "../../Services/DataBase/opium";
import WopiumIcon from "../../images/wopium_icon.svg";

import "./styles.scss";

const Wrapping: FC<any> = () => {
  const alert = useAlert();
  const [opiumValue, setOpiumValue] = useState(0);
  const [wopiumValue, setWopiumValue] = useState(0);
  const [opiumBalance, setOpiumBalance] = useState(0);
  const [wopiumBalance, setWopiumBalance] = useState(0);

  const userAddress = authStore.blockchainStore.address;

  useEffect(() => {
    updateBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAddress]);

  const updateBalance = () => {
    const { marginAddress: opiumAddress, decimals: opiumDecimals } =
      wrapperProducts.opium;
    getOpiumBalance(opiumAddress, userAddress, opiumDecimals).then((res) => {
      setOpiumBalance(Number(res.toFixed(2)));
    });

    const { tokenManager, decimals: wopiumDecimals } = wrapperProducts.wopium;
    getWopiumBalance(tokenManager, userAddress, wopiumDecimals).then((res) => {
      setWopiumBalance(Number(res.toFixed(2)));
    });
  };

  const wrap = async () => {
    const { poolAddress, marginAddress, decimals } = wrapperProducts.opium;
    console.log(poolAddress, marginAddress, decimals);
    const tokenAllowed = await checkWrapperAllowance(
      opiumValue,
      poolAddress,
      userAddress,
      marginAddress,
      decimals
    );
    console.log("tokenAllowed", tokenAllowed);
    if (!tokenAllowed) {
      makeApprove(
        poolAddress,
        userAddress,
        () =>
          wrapToWopium(
            opiumValue,
            userAddress,
            () => {
              alert.success("Successfully wrapped");
              updateBalance();
            },
            (e) => alert.error(e.message)
          ),
        (e) => alert.error(e.message),
        marginAddress
      );
    } else {
      wrapToWopium(
        opiumValue,
        userAddress,
        () => {
          updateBalance();
          alert.success("Successfully wrapped");
        },
        (e) => alert.error(e.message)
      );
    }
  };

  const unwrap = async () => {
    const { poolAddress, marginAddress, decimals } = wrapperProducts.wopium;

    const tokenAllowed = await checkWrapperAllowance(
      opiumValue,
      poolAddress,
      userAddress,
      marginAddress,
      decimals
    );

    if (!tokenAllowed) {
      makeApprove(
        poolAddress,
        userAddress,
        () =>
          unwrapToOpium(
            wopiumValue,
            userAddress,
            () => {
              alert.success("Successfully unwrapped");
              updateBalance();
            },
            (e) => alert.error(e.message)
          ),
        (e) => alert.error(e.message),
        marginAddress
      );
    } else {
      unwrapToOpium(
        wopiumValue,
        userAddress,
        () => {
          alert.success("Successfully unwrapped");
          updateBalance();
        },
        (e) => alert.error(e.message)
      );
    }
  };

  return (
    <div className="wopium_wrapper">
      <div className="wopium_row">
        <div className="wopium_item">
          <div className="wopium_item_title">
            <img src={WopiumIcon} alt="wopiom_icon" />
            <span>OPIUM</span>
          </div>
          <div className="balance_info">
            <span>Your balance:</span>
            <span className="amount">{opiumBalance}</span>
          </div>
          <div className="input_wrapper">
            <span>Amount to wrap:</span>
            <input
              type="number"
              onChange={(e) => setOpiumValue(+e.target.value)}
            />
          </div>
          <Button variant="secondary" size="sm" label="wrap" onClick={wrap} />
        </div>
        <div className="wopium_item">
          <div className="wopium_item_title">
            <img src={WopiumIcon} alt="wopiom_icon" />
            <span>wOPIUM</span>
          </div>
          <div className="balance_info">
            <span>Your balance:</span>
            <span className="amount">{wopiumBalance}</span>
          </div>
          <div className="input_wrapper">
            <span>Amount to wrap:</span>
            <input
              type="number"
              onChange={(e) => setWopiumValue(+e.target.value)}
            />
          </div>
          <Button
            variant="secondary"
            size="sm"
            label="unwrap"
            onClick={unwrap}
          />
        </div>
      </div>
    </div>
  );
};

export default observer(Wrapping);
