import { FC, useState } from "react";
import { observer } from "mobx-react";
// import { useAlert } from "react-alert";
import { AuthType } from "@opiumteam/mobx-web3";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import { Button, OpiumLink, ETheme } from "@opiumteam/react-opium-components";
import authStore from "../../Services/Stores/AuthStore";
// import appStore from "../../Services/Stores/AppStore";
import { getScanLink } from "../../Services/Utils/transaction";
// import { getPurchasedProductsTheGraph } from "../../Services/Utils/methods";
// import { PositionType } from "../../Services/Utils/types";
import { shortenAddress } from "../../Services/Utils/helpers";
import MuiDropDown from "../DropDown";
import { dropdownItems } from "./constants";
import CircleIcone from "../../images/ellipse.svg";
import MetamaskIcon from "../../images/metamask_icon.svg";

import "../../styles/main.scss";
import "./styles.scss";
import { MobileAuthMenu } from "./mobileAuthMenu";

const Header: FC<{}> = () => {
  // const [dropDownTitle, setDropDownTitle] = useState(dropdownItems[0].title);
  // const [popupIsOpened, setPopupIsOpened] = useState(false);
  // const [positions, setPositions] = useState<PositionType[]>([]);
  // const [positionProductTitle, setPositionProductTitle] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { address } = authStore.blockchainStore;
  const shortAddress = shortenAddress(address);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeNetworkList = (data: { title: string; value: number }) => {
    // console.log(index);
    // console.log(dropdownItems[+index]);
    authStore.changeNetwork(data?.title, data?.value);
  };
  // const closePopup = () => {
  //   setPopupIsOpened(false);
  //   setPositionProductTitle("");
  //   setPositions([]);
  // };
  // const handleMobileMenu = () => {
  //   console.log('You clicked button.');
  // }

  return (
    <div className="header-wrapper">
      {/* <Popup
        theme={ETheme.DARK}
        titleSize="lg"
        title="Purchased products"
        subtitle={positionProductTitle}
        className="positions-list-popup"
        popupIsOpen={popupIsOpened}
        closePopup={closePopup}
        component={<PositionsList positions={positions} />}
      /> */}
      <div className="header-title">Oh my Opium</div>
      {/* <Button 
          variant='primary' 
          label={positionsAreLoading ? 'loading...' : 'my products'}
          onClick={getAllPurchasedProducts} 
          disabled={appStore.requestsAreNotAllowed || positionsAreLoading}
        />
        <Button label='wOPIUM' onClick={() => {appStore.setWrappingPopupIsOpened(true)}} disabled={appStore.requestsAreNotAllowed || authStore.blockchainStore.requiredNetworkName !== 'Mainnet'}/> */}
      <div className="mobile-menu-wrapper">
        <MobileAuthMenu shortAddress={shortAddress} />
      </div>
      <div className="header-buttons-wrapper">
        <div className="dropdown-wrapper">
          <MuiDropDown
            // title={shortenAddress(address)}
            data={dropdownItems}
            header="Network"
            handleNetworkList={handleChangeNetworkList}
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
                minWidth: "13.8rem",
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                bgcolor: "#222234",
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
                "&:before": {
                  content: `" "`,
                  width: 0,
                  height: 0,
                  top: 0,
                  right: 0,
                  transform: "translate(0, -85%)",
                  position: "absolute",
                  borderLeft: "10px solid transparent",
                  borderRight: "10px solid transparent",
                  borderBottom: "18px solid #222234",
                  zIndex: 2,
                },
                "&:after": {
                  content: `" "`,
                  width: 0,
                  height: 0,
                  top: 0,
                  right: 0,
                  transform: "translate(0, -100%)",
                  position: "absolute",
                  borderLeft: "10px solid transparent",
                  borderRight: "10px solid transparent",
                  borderBottom: "18px solid #fff",
                  zIndex: 1,
                },
                "& .MuiList-root": {
                  padding: 0,
                },
              },
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: -7,
              horizontal: 190,
            }}
          >
            <h5>Wallet connect</h5>
            <MenuItem
              style={{
                justifyContent: "space-between",
                padding: "0.3rem 0",
              }}
            >
              <Button
                variant="primary"
                className="login-btn"
                style={{
                  fontSize: "0.8rem",
                  backgroundColor: "transparent",
                  color: "#fff",
                  border: "none",
                  padding: "0",
                }}
                label="MetaMask"
                onClick={() =>
                  authStore.blockchainStore.login(AuthType.INJECTED)
                }
              />
              <ListItemIcon style={{ minWidth: "1.2rem" }}>
                <img src={MetamaskIcon} alt="icon" />
              </ListItemIcon>
            </MenuItem>
            <Divider
              style={{
                borderTop: "0.5px solid rgba(255, 255, 255, 0.5)",
                margin: "0",
              }}
            />
            <MenuItem
              style={{
                justifyContent: "space-between",
                padding: "0.3rem 0",
              }}
            >
              <Button
                variant="primary"
                className="login-btn"
                style={{
                  fontSize: "0.8rem",
                  backgroundColor: "transparent",
                  color: "#fff",
                  border: "none",
                  padding: "0",
                }}
                label="Wallet connect"
                onClick={() =>
                  authStore.blockchainStore.login(AuthType.INJECTED)
                }
              />
              <ListItemIcon style={{ minWidth: "1.2rem" }}>
                <img src={CircleIcone} alt="icon" />
              </ListItemIcon>
            </MenuItem>
          </Menu>
        </>
      </div>
    </div>
  );
};

export default observer(Header);
