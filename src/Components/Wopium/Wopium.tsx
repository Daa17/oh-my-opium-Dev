import React from "react";
import { Button } from "@opiumteam/react-opium-components";
  
import WopiumIcon from "../../images/wopium_icon.svg";
import "./styles.scss";

const wrapHandler = () => {
    console.log("Wrapped");
  };

export const Wopium = () => {
  return (
    <div className="wopium_wrapper">
        <div className="wopium_row">
            <div className="wopium_item">
                <div className="wopium_item_title">
                    <img  src={WopiumIcon} alt="wopiom_icon"/>
                    <span>OPIUM</span>
                </div>
                <div className="balance_info">
                    <span>Your balance:</span>
                    <span className="amount">1000</span>
                </div>
                <div className="input_wrapper">
                    <span>Amount to wrap:</span>
                    <input type="number"/>
                </div>
                <Button
                     variant="secondary"
                     size="sm"
                     label="wrap"
                     onClick={wrapHandler}
                />
            </div>
            <div className="wopium_item">
                <div className="wopium_item_title">
                    <img src={WopiumIcon} alt="wopiom_icon"/>
                    <span>wOPIUM</span>
                </div>
                <div className="balance_info">
                    <span>Your balance:</span>
                    <span className="amount">0</span>
                </div>
                <div className="input_wrapper">
                    <span>Amount to wrap:</span>
                    <input type="number"/>
                </div>
                <Button
                     variant="secondary"
                     size="sm"
                     label="unwrap"
                     onClick={wrapHandler}
                />
            </div>
        </div>
    </div>
  );
};