// Reference: https://v4-9-14.material-ui.com/components/menus/
import React from "react";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Grow from "@material-ui/core/Grow";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";

import { makeStyles } from "@material-ui/core/styles";

import { useAuth } from "../contexts/auth";
import { useUser } from "../contexts/user";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

function NavMenu() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const { setAuthTokens } = useAuth();
  const { setUserData } = useUser();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const logout = (event) => {
    setAuthTokens("");
    setUserData(null);
    handleClose(event);
  };

  const MENU_ITEMS = [
    { name: "Profile", icon: <AccountBoxIcon />, onClick: handleClose },
    { name: "Logout", icon: <ExitToAppIcon />, onClick: logout },
  ];

  const generateMenuItems = (menuItems) => {
    return menuItems.map((item, index) => {
      const key = `$(item.name)-${index}`;
      return (
        <MenuItem key={key} onClick={item.onClick} dense>
          <Grid
            container
            justify="center"
            alignItems="center"
            alignContent="center"
            spacing={2}
          >
            <Grid item>{item.icon}</Grid>
            <Grid item>{item.name}</Grid>
          </Grid>
        </MenuItem>
      );
    });
  };

  return (
    <div className={classes.root}>
      <div>
        <IconButton
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          placement="bottom-end"
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    {generateMenuItems(MENU_ITEMS)}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}

export default NavMenu;
