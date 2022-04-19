import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useAlert } from "react-alert";
import { Button, OpiumLink, ETheme } from "@opiumteam/react-opium-components";
import authStore from "../../Services/Stores/AuthStore";
import appStore from "../../Services/Stores/AppStore";
import {
  getPurchasedProductsTheGraph,
  withdrawPosition,
} from "../../Services/Utils/methods";
import { convertDateFromTimestamp } from "../../Services/Utils/date";
import { getScanLink } from "../../Services/Utils/transaction";
import { shortenAddress } from "../../Services/Utils/helpers";
import { PositionType } from "../../Services/Utils/types";

import "./styles.scss";

const PositionsList: FC<any> = ({ currentPositions, fromPopup }) => {
  const { address } = authStore.blockchainStore;
  const [positions, setPositions] = useState<PositionType[]>([]);

  const alert = useAlert();

  const getAllPurchasedProducts = async () => {
    let positions: PositionType[] | undefined = [];
    const pools = appStore.poolsByNetwork.filter((pool) => !pool.isSuspended);
    await Promise.all(
      pools.map(async (pool) => {
        await getPurchasedProductsTheGraph(pool, address).then(
          (res) => (positions = res)
        );
      })
    )
      .then(() => {
        if (positions && positions.length) {
          setPositions(positions);
        } else {
          alert.error("There are no purchased products");
        }
      })
      .catch((e) => {
        alert.error(
          "Something wen wrong, please try to show products in the pool"
        );
      });
  };

  useEffect(() => {
    if (fromPopup) {
      currentPositions?.length
        ? setPositions(currentPositions)
        : setPositions([]);
    } else getAllPurchasedProducts();
  }, []);

  console.log("positions", positions);
  const makeWithdrawal = async (position: PositionType) => {
    withdrawPosition(
      position,
      address,
      () => alert.success("Successfully withdrew"),
      (e) => alert.error(e.message)
    );
  };
  const goToPool = () => {
    console.log("go to pool");
  };
  return (
    <div className="positions-wrapper">
      {positions.length ? (
        positions.map((position, i) => {
          const isExpired = Date.now() / 1000 > position.endTime;
          const date = convertDateFromTimestamp(position.endTime, "DD-MMM-YY");
          return (
            <div className="position-item-wrapper" key={i}>
              <div className="img_name_wrapper">
                <span className="position_icon"></span>
                <div className="position-item-name">
                  <span className="pool-name">Pool name</span>
                  <span className="position short">Short position</span>
                </div>
              </div>
              <div className="amount_expire_wrapper">
                <div className="amount_wrapper">
                  <span>Staked amount: </span>
                  <span className="balance_amount">
                    {position.balance} USDT
                  </span>
                </div>
                <div className={`${isExpired ? "red-date" : "green-date"}`}>
                  {isExpired ? (
                    <div className="expire_date expired">
                      <span>Expired at </span>
                      <span className="date">{date}</span>
                    </div>
                  ) : (
                    <div className="expire_date">
                      <span>Will expire at</span>{" "}
                      <span className="date">{date}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="position-item-address web">
                <OpiumLink
                  theme={ETheme.DARK}
                  newTab={true}
                  label={position.address}
                  href={getScanLink(position.address, authStore.networkId)}
                />
              </div>
              <div className="position-item-address tablet-mobile">
                <OpiumLink
                  theme={ETheme.DARK}
                  newTab={true}
                  label={shortenAddress(position.address)}
                  href={getScanLink(position.address, authStore.networkId)}
                />
              </div>
              <div className="buttons_wrapper">
                <Button
                  variant="secondary"
                  label="go to pool"
                  onClick={() => goToPool()}
                />
                <Button
                  className="withdraw"
                  variant="secondary"
                  label="withdraw"
                  onClick={() => makeWithdrawal(position)}
                  disabled={appStore.requestsAreNotAllowed || !isExpired}
                />
              </div>
            </div>
          );
        })
      ) : (
        <div className="no_pools">
          No pools found according to chosen filters
        </div>
      )}
    </div>
  );
};

export default observer(PositionsList);
