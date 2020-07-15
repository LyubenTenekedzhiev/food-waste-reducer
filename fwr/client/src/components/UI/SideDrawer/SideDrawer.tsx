import React from "react";
import { NavLink } from "react-router-dom";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import MenuIcon from "@material-ui/icons/Menu";
import { ListItemText } from "@material-ui/core";

import styles from "./SideDrawer.module.css";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

interface Props {
  handleOpenCustomer: () => void;
  handleOpenRestaurant: () => void;
  usernameCustomer: string | null;
  passwordCustomer: string | null;
  username: string | null;
  password: string | null;
  isAdmin: boolean;
  logoutHandler: () => void;
  id: string;
}

type Anchor = "right";

export default function TemporaryDrawer({
  handleOpenCustomer,
  handleOpenRestaurant,
  usernameCustomer,
  passwordCustomer,
  username,
  password,
  isAdmin,
  logoutHandler,
  id,
}: Props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <div className={clsx(classes.list)} role='presentation' onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
      <List>
        {["Home", "About"].map((text, index) => (
          <NavLink key={text} to={text === "Home" ? `/` : `/about`} className={styles.SideDrawer_Link}>
            <ListItem button>
              <ListItemText primary={text} />
            </ListItem>
          </NavLink>
        ))}
      </List>
      <Divider />
      {!usernameCustomer && !passwordCustomer && !username && !password ? (
        <>
          <List>
            {["Register as Restaurant", "Register as Customer"].map((text, index) => (
              <NavLink
                key={text}
                to={
                  text === "Register as Customer"
                    ? { pathname: "/register", state: "customer" }
                    : { pathname: "/register", state: "restaurant" }
                }
                className={styles.SideDrawer_Link}
              >
                <ListItem button>
                  <ListItemText primary={text} />
                </ListItem>
              </NavLink>
            ))}
          </List>
          <Divider />
          <List>
            {["Log in as Restaurant", "Log in as Customer"].map((text, index) => (
              <ListItem
                button
                key={text}
                onClick={text === "Log in as Restaurant" ? () => handleOpenRestaurant() : () => handleOpenCustomer()}
              >
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <List>
          {["Your Profile", "Logout"].map((text, index) => (
            <NavLink
              key={text}
              to={
                text === "Your Profile" && usernameCustomer && passwordCustomer
                  ? {
                      pathname: isAdmin ? `/admin` : `/profile`,
                      state: { username: usernameCustomer, password: passwordCustomer },
                    }
                  : text === "Your Profile" && username && password
                  ? {
                      pathname: `/edit/${username?.toLowerCase()}`,
                      state: { username: username, password: password, id: id },
                    }
                  : "/"
              }
              className={styles.SideDrawer_Link}
              onClick={text === "Logout" ? () => logoutHandler() : () => {}}
            >
              <ListItem button>
                <ListItemText primary={text} />
              </ListItem>
            </NavLink>
          ))}
        </List>
      )}
    </div>
  );

  return (
    <div>
      {(["right"] as Anchor[]).map((anchor) => (
        <React.Fragment key={anchor}>
          <MenuIcon className={styles.SideDrawer_MenuIcon} onClick={toggleDrawer(anchor, true)} />
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}