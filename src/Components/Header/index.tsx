import { FC, useState, lazy, Suspense } from "react";
import { observer } from "mobx-react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import { Button, OpiumLink, ETheme } from "@opiumteam/react-opium-components";
import { getScanLink } from "../../Services/Utils/transaction";
import { shortenAddress } from "../../Services/Utils/helpers";
import { dropdownItems } from "./constants";
import MetamaskIcon from "../../images/metamask_icon.svg";
import WalletConnect from "../../images/walletConnectLogo.png";

import "../../styles/main.scss";
import "./styles.scss";

const MobileAuthMenu = lazy(() => import("./mobileAuthMenu"));
const MuiDropDown = lazy(() => import("../DropDown"));

interface IHeader {
  networkhandler: (network: string) => void;
  authStore?: any;
  appStore?: any;
  AuthType?: any;
}

const Header: FC<IHeader> = ({
  networkhandler,
  authStore,
  appStore,
  AuthType,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { address } = authStore.blockchainStore;
  const shortAddress = shortenAddress(address);
  const isloggedIn = authStore.loggedIn && address;
  const isWalletConnect = Boolean(
    authStore.blockchain.providerName === "WalletConnect" && isloggedIn
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeNetworkList = (data: { title: string; value: number }) => {
    let networkName = "";
    if (data?.value === 1) {
      networkhandler("eth");
      networkName = "mainnet";
    } else if (data?.value === 56) {
      networkhandler("bcs");
      networkName = "binance";
    } else if (data?.value === 137) {
      networkName = "matic";
      networkhandler("polygon");
    }
    authStore.changeNetwork(networkName, data?.value);
  };

  return (
    <div className="header-wrapper">
      <div className="header-title">Oh my Opium</div>
      <Suspense fallback={""}>
        <MobileAuthMenu
          networkhandler={networkhandler}
          shortAddress={shortAddress}
          isWalletConnect={isWalletConnect}
          authStore={authStore}
          appStore={appStore}
          AuthType={AuthType}
        />
      </Suspense>
      <div className="BrowserView-wrapper">
        <div className="header-buttons-wrapper">
          <div className="dropdown-wrapper">
            <Suspense fallback={"Loading ..."}>
              <MuiDropDown
                data={dropdownItems}
                header="Network"
                handleNetworkList={handleChangeNetworkList}
                disabled={isWalletConnect}
                isAlowed={appStore.requestsAreNotAllowed}
                isloggedIn={isloggedIn}
              />
            </Suspense>
          </div>
          <div className="opium-link-wrapper">
            {isloggedIn && (
              <OpiumLink
                theme={ETheme.DARK}
                newTab={true}
                label={shortenAddress(address)}
                href={getScanLink(address, authStore.networkId)}
              />
            )}
          </div>
          <>
            {!isloggedIn ? (
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
                onClick={() =>
                  authStore.blockchainStore.login(AuthType.INJECTED)
                }
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
                  onClick={() => {}}
                />
                <ListItemIcon style={{ minWidth: "1.2rem" }}>
                  <img width="17" height="14" src={MetamaskIcon} alt="icon" />
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
                onClick={() =>
                  authStore.blockchainStore.login(AuthType.WALLET_CONNECT)
                }
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
                  onClick={() => {}}
                />
                <ListItemIcon style={{ minWidth: "1.2rem", height: "1.2rem" }}>
                  <img
                    width="17"
                    height="14"
                    src={WalletConnect}
                    alt="icon"
                    style={{ minWidth: "1.2rem", height: "1.2rem" }}
                  />
                </ListItemIcon>
              </MenuItem>
            </Menu>
          </>
        </div>
      </div>
    </div>
  );
};

export default observer(Header);
