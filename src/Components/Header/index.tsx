import { FC, useState } from "react";
import { observer } from "mobx-react";
// import { useAlert } from "react-alert";
import { AuthType } from "@opiumteam/mobx-web3";
import {
  Button,
  OpiumLink,
  ETheme,
  Popup,
} from "@opiumteam/react-opium-components";
import authStore from "../../Services/Stores/AuthStore";
// import appStore from "../../Services/Stores/AppStore";
import { getScanLink } from "../../Services/Utils/transaction";
// import { getPurchasedProductsTheGraph } from "../../Services/Utils/methods";
import { PositionType } from "../../Services/Utils/types";
import { shortenAddress } from "../../Services/Utils/helpers";
import PositionsList from "../PositionsList";
import MuiDropDown from "../DropDown";

import DimondIcon from "../../images/diamond-purple.svg";
import CircleIcone from "../../images/circle.svg";
import EllipseIcon from "../../images/ellipse.svg";

import "../../styles/main.scss";
import "./styles.scss";

const dropdownItems = [
  { title: "Ethereum", value: "1", iconUrl: DimondIcon },
  { title: "Binance", value: "56", iconUrl: CircleIcone },
  { title: "Polygon", value: "137", iconUrl: EllipseIcon },
];
const Header: FC<{}> = () => {
  // const [dropDownTitle, setDropDownTitle] = useState(dropdownItems[0].title);
  const [popupIsOpened, setPopupIsOpened] = useState(false);
  const [positions, setPositions] = useState<PositionType[]>([]);
  const [positionProductTitle, setPositionProductTitle] = useState<string>("");
  // const [ positionsAreLoading, setPositionsAreLoading ] = useState(false)
  // const alert = useAlert();

  // const handleSelect = (index: string) => {
  //   setDropDownTitle(dropdownItems[+index].title);
  //   authStore.changeNetwork(
  //     dropdownItems[+index].title,
  //     +dropdownItems[+index].value
  //   );
  // };
  const { requiredNetworkName, currentNetworkName, address } =
    authStore.blockchainStore;

  // const getAllPurchasedProducts = async () => {
  //   setPositionsAreLoading(true)
  //   let positions: PositionType[] | undefined = [];
  //   const pools = appStore.poolsByNetwork.filter((pool) => !pool.isSuspended);
  //   await Promise.all(
  //     pools.map(async (pool) => {
  //       await getPurchasedProductsTheGraph(pool, address).then(
  //         (res) => (positions = res)
  //       );
  //     })
  //   )
  //     .then(() => {
  //       if (positions && positions.length) {
  //         setPopupIsOpened(true);
  //         setPositions(positions);
  //         setPositionProductTitle("All products");
  //       } else {
  //         alert.error("There are no purchased products");
  //       }
  //     })
  //     .catch(() => {
  //       alert.error(
  //         "Something wen wrong, please try to show products in the pool"
  //       );
  //     });
  //   setPositionsAreLoading(false)
  // };

  const closePopup = () => {
    setPopupIsOpened(false);
    setPositionProductTitle("");
    setPositions([]);
  };
  // const handleMobileMenu = () => {
  //   console.log('You clicked button.');
  // }

  return (
    <div className="header-wrapper">
      <Popup
        theme={ETheme.DARK}
        titleSize="lg"
        title="Purchased products"
        subtitle={positionProductTitle}
        className="positions-list-popup"
        popupIsOpen={popupIsOpened}
        closePopup={closePopup}
        component={<PositionsList positions={positions} />}
      />
      <div className="header-title">Oh my Opium</div>
      {/* <Button 
          variant='primary' 
          label={positionsAreLoading ? 'loading...' : 'my products'}
          onClick={getAllPurchasedProducts} 
          disabled={appStore.requestsAreNotAllowed || positionsAreLoading}
        />
        <Button label='wOPIUM' onClick={() => {appStore.setWrappingPopupIsOpened(true)}} disabled={appStore.requestsAreNotAllowed || authStore.blockchainStore.requiredNetworkName !== 'Mainnet'}/> */}
      <div className="mobile-menu-wrapper">
        {
          authStore.loggedIn && authStore.blockchainStore.address && (
            <div className="dropdown-wrapper">
              <MuiDropDown
                // title={shortenAddress(address)}
                data={dropdownItems}
                header="Network"
                // onSelect={(eventKey) => handleSelect(eventKey)}
              />
            </div>
          )

          // <Button
          //   label={(shortenAddress(address))}
          //   style={{
          //     backgroundColor: "transparent",
          //     color: "#fff"
          //   }}
          //   className="mobile_btn"
          //   onClick={() => handleMobileMenu()}
          // />
        }
      </div>
      <div className="header-buttons-wrapper">
        <div className="dropdown-wrapper">
          <MuiDropDown
            // title={shortenAddress(address)}
            data={dropdownItems}
            header="Network"
            // onSelect={(eventKey) => handleSelect(eventKey)}
          />
          {requiredNetworkName !== currentNetworkName && (
            <div className="red-network">change network in wallet</div>
          )}
        </div>
        {authStore.loggedIn && authStore.blockchainStore.address && (
          <OpiumLink
            theme={ETheme.DARK}
            newTab={true}
            label={shortenAddress(address)}
            href={getScanLink(address, authStore.networkId)}
          />
        )}
        <Button
          variant="primary"
          className="login-btn"
          style={{
            backgroundColor: "transparent",
            color: "#fff",
          }}
          label={authStore.loggedIn && address ? "log out" : "login"}
          onClick={
            authStore.loggedIn && address
              ? () => authStore.blockchainStore.logout()
              : () => authStore.blockchainStore.login(AuthType.INJECTED)
          }
        />
      </div>
    </div>
  );
};

export default observer(Header);
