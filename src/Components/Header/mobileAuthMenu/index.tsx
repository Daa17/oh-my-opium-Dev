import { useState } from "react";
import { AuthType } from "@opiumteam/mobx-web3";
import Menu from "@mui/material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { SelectChangeEvent } from "@mui/material/Select";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import {
  Button,
  OpiumLink,
  ETheme,
  Popup,
} from "@opiumteam/react-opium-components";
import authStore from "../../../Services/Stores/AuthStore";
import { getScanLink } from "../../../Services/Utils/transaction";
import { shortenAddress } from "../../../Services/Utils/helpers";
import { dropdownItems, walletConnect } from "../constants";
import { MenuItem } from "@mui/material";

export const MobileAuthMenu = ({ shortAddress }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeNetwork, setActiveNetwork] = useState<string>();
  const [activeWallet, setActiveWallet] = useState<string>();
  const open = Boolean(anchorEl);
  const { address } = authStore.blockchainStore;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const changeNetworkTitle = (
    event: SelectChangeEvent<typeof activeNetwork>,
    title: string
  ) => {
    if (title === "Wallet") {
      setActiveWallet(event.target.value as string);
    } else setActiveNetwork(event.target.value as string);
  };

  const logInHandler = () => {
    authStore.blockchainStore.login(AuthType.INJECTED);
  };

  return (
    <div>
      <Button
        variant="primary"
        className="login-btn"
        style={{
          backgroundColor: "transparent",
          color: "#fff",
        }}
        label={
          (authStore.loggedIn &&
            authStore.blockchainStore.address &&
            shortenAddress(address)) ||
          "log in"
        }
        onClick={handleClick}
      />
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={() => null}
        PaperProps={{
          elevation: 0,
          sx: {
            minWidth: "13.8rem",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            bgcolor: "#222234",
            left: "auto",
            right: "20px",

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
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <Accordion
          defaultExpanded
          style={{
            padding: 0,
            border: "none",
            background: "transparent",
            boxShadow: "none",
          }}
        >
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography>Network</Typography>
          </AccordionSummary>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={dropdownItems[0].value}
            name="radio-buttons-group"
            onChange={(e) => changeNetworkTitle(e, "Network")}
          >
            {dropdownItems?.map((item) => (
              <div>
                <FormControlLabel
                  key={item.title}
                  value={item.value}
                  control={
                    <Radio
                      style={{
                        padding: 0,
                        color: "#fff",
                        transform: "scale(0.7)",
                      }}
                      size="small"
                    />
                  }
                  label={item.title}
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.37rem 0",
                    margin: "0 0 0.3rem 0",
                  }}
                />
                <ListItemIcon style={{ minWidth: "1.2rem" }}>
                  <img src={item.iconUrl} alt="icon" />
                </ListItemIcon>
              </div>
            ))}
          </RadioGroup>
        </Accordion>
        {!(authStore.loggedIn && address) && (
          <Accordion
            defaultExpanded
            style={{
              padding: 0,
              border: "none",
              background: "transparent",
              boxShadow: "none",
            }}
          >
            <AccordionSummary
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Wallet connect</Typography>
            </AccordionSummary>
            <MenuItem>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={walletConnect[0].value}
                name="radio-buttons-group"
                onChange={(e) => changeNetworkTitle(e, "Wallet")}
              >
                {walletConnect?.map((item) => (
                  <div>
                    <FormControlLabel
                      key={item.title}
                      value={item.title}
                      control={
                        <Radio
                          style={{
                            padding: 0,
                            color: "#fff",
                            transform: "scale(0.7)",
                          }}
                          size="small"
                        />
                      }
                      label={item.title}
                      style={{
                        fontSize: "0.75rem",
                        padding: "0.37rem 0",
                        margin: "0 0 0.3rem 0",
                      }}
                    />
                    <ListItemIcon style={{ minWidth: "1.2rem" }}>
                      <img src={item.iconUrl} alt="icon" />
                    </ListItemIcon>
                  </div>
                ))}
                <Divider
                  style={{
                    borderTop: "0.5px solid rgba(255, 255, 255, 0.5)",
                    margin: "0",
                  }}
                />
              </RadioGroup>
            </MenuItem>
          </Accordion>
        )}
        {authStore.loggedIn && authStore.blockchainStore.address && (
          <OpiumLink
            theme={ETheme.DARK}
            newTab={true}
            label={shortenAddress(address)}
            href={getScanLink(address, authStore.networkId)}
          />
        )}
        {!(authStore.loggedIn && address) ? (
          <Button
            variant="primary"
            className="login-btn"
            style={{
              backgroundColor: "transparent",
              color: "#fff",
            }}
            label="log in"
            onClick={logInHandler}
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
      </Menu>
    </div>
  );
};
