import { FC, useState } from "react";
import { observer } from "mobx-react";
// import { useAlert } from "react-alert";
import { AuthType } from "@opiumteam/mobx-web3";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { address } = authStore.blockchainStore;

  const closePopup = () => {
    setPopupIsOpened(false);
    setPositionProductTitle("");
    setPositions([]);
  };
  // const handleMobileMenu = () => {
  //   console.log('You clicked button.');
  // }
  console.log(authStore.loggedIn, "hhh", address);
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
        {authStore.loggedIn && authStore.blockchainStore.address && (
          <div className="dropdown-wrapper">
            <MuiDropDown
              // title={shortenAddress(address)}
              data={dropdownItems}
              header="Network"
              // onSelect={(eventKey) => handleSelect(eventKey)}
            />
          </div>
        )}
      </div>
      <div className="header-buttons-wrapper">
        <div className="dropdown-wrapper">
          <MuiDropDown
            // title={shortenAddress(address)}
            data={dropdownItems}
            header="Network"
            // onSelect={(eventKey) => handleSelect(eventKey)}
          />
        </div>
        {authStore.loggedIn && authStore.blockchainStore.address && (
          <OpiumLink
            theme={ETheme.DARK}
            newTab={true}
            label={shortenAddress(address)}
            href={getScanLink(address, authStore.networkId)}
          />
        )}
        <>
          {!(authStore.loggedIn && address) ? (
            <Button
              variant="primary"
              className="login-btn"
              style={{
                backgroundColor: "transparent",
                color: "#fff",
              }}
              label="log in"
              onClick={handleClick}
            />
          ) : (
            <Button
              variant="primary"
              className="login-btn"
              style={{
                backgroundColor: "transparent",
                color: "#fff",
              }}
              label="log out"
              onClick={() => authStore.blockchainStore.logout()}
            />
          )}
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "left", vertical: "top" }}
            anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          >
            <MenuItem>
              <ListItemIcon>
                <img src={CircleIcone} alt="icon" />
              </ListItemIcon>
              <Button
                variant="primary"
                className="login-btn"
                style={{
                  backgroundColor: "transparent",
                  color: "#fff",
                }}
                label="MetaMask"
                onClick={() =>
                  authStore.blockchainStore.login(AuthType.INJECTED)
                }
              />
            </MenuItem>
            <Divider />

            <MenuItem>
              <ListItemIcon>
                <img src={CircleIcone} alt="icon" />
              </ListItemIcon>
              Wallet connect
            </MenuItem>
          </Menu>
        </>
      </div>
    </div>
  );
};

export default observer(Header);
