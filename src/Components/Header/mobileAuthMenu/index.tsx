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
import { Button, OpiumLink, ETheme } from "@opiumteam/react-opium-components";
import authStore from "../../../Services/Stores/AuthStore";
import { getScanLink } from "../../../Services/Utils/transaction";
import { shortenAddress } from "../../../Services/Utils/helpers";
import { dropdownItems, walletConnect } from "../constants";
import { MenuItem } from "@mui/material";

import DiamondIcon from "../../../images/diamond-purple.svg";
import "../../../styles/main.scss";
import "./style.scss";

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
    console.log(activeWallet);
    console.log(shortAddress);
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
    <div className="btn-wrapper">
      <ListItemIcon
        style={{
          minWidth: "0.625rem",
          position: "absolute",
          top: "50%",
          transform: "translate(0, -50%)",
          left: "0.93rem",
        }}
      >
        <img src={DiamondIcon} alt="icon" />
      </ListItemIcon>
      <Button
        variant="primary"
        className="login-btn"
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: "0.8rem",
          backgroundColor: "transparent",
          color: "#fff",
          padding: "0.125rem 0.93rem 0.125rem 1.87rem",
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
              borderLeft: "0.62rem solid transparent",
              borderRight: "0.62rem solid transparent",
              borderBottom: "1.1rem solid #222234",
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
              borderLeft: "0.62rem solid transparent",
              borderRight: "0.62rem solid transparent",
              borderBottom: "1.1rem solid #fff",
              zIndex: 1,
            },
            "& .MuiList-root": {
              padding: 0,
            },
          },
        }}
        anchorOrigin={{
          horizontal: "left",
          vertical: "bottom",
        }}
        transformOrigin={{
          vertical: -20,
          horizontal: 80,
        }}
      >
        <Accordion
          defaultExpanded
          style={{
            padding: 0,
            border: "none",
            background: "transparent",
            boxShadow: "none",
            color: "#fff",
          }}
          sx={{
            "&.MuiAccordion-root": {
              "&.Mui-expanded": {
                "&:first-of-type": {
                  marginBottom: "2.4rem",
                },
              },
            },
            "& .MuiButtonBase-root": {
              width: "fit-content",
              "&.Mui-expanded": {
                width: "fit-content",
              },
            },
            "& .MuiAccordionSummary-content": {
              position: "relative",
              "&::before": {
                content: `""`,
                width: 0,
                height: 0,
                position: "absolute",
                top: "50%",
                right: "0",
                transform: "translate(0, -50%)",
                borderLeft: "0.2rem solid transparent",
                borderRight: "0.2rem solid transparent",
                borderTop: "0.35rem solid #fff",
                transition: "transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              },
              "&.Mui-expanded": {
                "&::before": {
                  transform: "translate(0, -50%) rotate(180deg)",
                  transition:
                    "transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                },
              },
            },
          }}
        >
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{
              minHeight: "auto",
              padding: 0,
              marginBottom: "0.43rem",
            }}
            sx={{
              "& .MuiAccordionSummary-content": {
                margin: "0",
                paddingRight: "0.81rem",
                "&.Mui-expanded": {
                  margin: "0",
                  paddingRight: "0.81rem",
                },
              },
            }}
          >
            <Typography>Network</Typography>
          </AccordionSummary>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={dropdownItems[0].value}
            name="radio-buttons-group"
            onChange={(e) => changeNetworkTitle(e, "Network")}
          >
            {dropdownItems?.map((item) => (
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
                label={
                  <div className="title_wrapper">
                    {item.title}
                    <ListItemIcon style={{ minWidth: "1.2rem" }}>
                      <img src={item.iconUrl} alt="icon" />
                    </ListItemIcon>
                  </div>
                }
                style={{
                  fontSize: "0.75rem",
                  padding: "0.37rem 0",
                  margin: "0 0 0.18rem 0",
                }}
              />
            ))}
            <Divider
              style={{
                borderTop: "0.5px solid rgba(255, 255, 255, 0.5)",
                margin: "0",
              }}
            />
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
              color: "#fff",
            }}
          >
            <AccordionSummary
              aria-controls="panel2a-content"
              id="panel2a-header"
              style={{
                width: "fit-content",
                minHeight: "auto",
                padding: 0,
                marginBottom: "0.43rem",
              }}
              sx={{
                "& .MuiAccordionSummary-content": {
                  margin: "0",
                  paddingRight: "0.81rem",
                  width: "fit-content",
                  position: "relative",

                  "&::before": {
                    content: `""`,
                    width: 0,
                    height: 0,
                    position: "absolute",
                    top: "50%",
                    right: "0",
                    transform: "translate(0, -50%)",
                    borderLeft: "0.2rem solid transparent",
                    borderRight: "0.2rem solid transparent",
                    borderTop: "0.35rem solid #fff",
                    transition:
                      "transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  },
                  "&.Mui-expanded": {
                    margin: "0",
                    paddingRight: "0.81rem",
                    "&::before": {
                      transform: "translate(0, -50%) rotate(180deg)",
                      transition:
                        "transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                    },
                  },
                },
              }}
            >
              <Typography>Wallet connect</Typography>
            </AccordionSummary>
            <MenuItem style={{ padding: 0 }}>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={walletConnect[0].value}
                name="radio-buttons-group"
                onChange={(e) => changeNetworkTitle(e, "Wallet")}
              >
                {walletConnect?.map((item) => (
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
                    label={
                      <div className="title_wrapper">
                        {item.title}
                        <ListItemIcon style={{ minWidth: "1.2rem" }}>
                          <img src={item.iconUrl} alt="icon" />
                        </ListItemIcon>
                      </div>
                    }
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.37rem 0",
                      margin: "0 0 0.18rem 0",
                    }}
                  />
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
              width: "100%",
              backgroundColor: "transparent",
              color: "#fff",
              marginTop: "1.06rem",
              padding: "0.125rem 0",
            }}
            label="log in"
            onClick={logInHandler}
          />
        ) : (
          <Button
            variant="primary"
            className="login-btn"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              color: "#fff",
              marginTop: "1.06rem",
              padding: "0.125rem 0",
            }}
            label="log out"
            onClick={() => authStore.blockchainStore.logout()}
          />
        )}
      </Menu>
    </div>
  );
};
