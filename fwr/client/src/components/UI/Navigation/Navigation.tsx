import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { fetchRestaurantsByRole } from "../../../features/restaurants/restaurantsSlice";
import { RootState } from "../../../app/rootReducer";
import { fetchCustomersByRole } from "../../../features/customer/customerSlice";

import LoginModal from "../../../containers/LoginModal/LoginModal";
import SideDrawer from "../SideDrawer/SideDrawer";
import classes from "./Navigation.module.css";

const Navigation = (): JSX.Element => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openModalRestaurant, setOpenModalRestaurant] = React.useState(false);
  const [openModalCustomer, setOpenModalCustomer] = React.useState(false);
  const dispatch = useDispatch();
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  const usernameCustomer = localStorage.getItem("usernameCustomer");
  const passwordCustomer = localStorage.getItem("passwordCustomer");

  const restaurant = useSelector((state: RootState) => state.restaurants.restaurants).filter(
    (restaurant) => restaurant.username === username && restaurant.password === password
  )[0];
  const isAdmin = useSelector((state: RootState) => state.customers.isAdmin);

  const updateWindowDimensions = useCallback(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, [updateWindowDimensions]);

  const openLoginMenuHandler = () => {
    setOpenLogin(true);
  };

  const closeLoginMenuHandler = () => {
    setOpenLogin(false);
  };

  const openRegisterMenuHandler = () => {
    setOpenRegister(true);
  };

  const closeRegisterMenuHandler = () => {
    setOpenRegister(false);
  };

  const handleOpenRestaurant = () => {
    setOpenModalRestaurant(true);
    dispatch(fetchRestaurantsByRole(0));
  };

  const handleOpenCustomer = () => {
    setOpenModalCustomer(true);
    dispatch(fetchCustomersByRole(1));
  };

  const handleClose = () => {
    setOpenModalCustomer(false);
    setOpenModalRestaurant(false);
  };

  const logoutHandler = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("usernameCustomer");
    localStorage.removeItem("passwordCustomer");
  };

  return (
    <>
      <header className={classes.Header}>
        {screenWidth <= 600 ? (
          <>
            <h3 className={classes.Navigation_Logo}>fwr</h3>
            <SideDrawer
              handleOpenCustomer={handleOpenCustomer}
              handleOpenRestaurant={handleOpenRestaurant}
              usernameCustomer={usernameCustomer}
              passwordCustomer={passwordCustomer}
              username={username}
              password={password}
              isAdmin={isAdmin}
              logoutHandler={logoutHandler}
              id={restaurant ? restaurant._id : ""}
            />
          </>
        ) : (
          <>
            <nav className={classes.Navigation}>
              <NavLink className={classes.Navigation_Link} to={"/"}>
                Home
              </NavLink>
              <NavLink className={classes.Navigation_Link} to={"/about"}>
                About
              </NavLink>
            </nav>
            <h3 className={classes.Navigation_Logo}>fwr</h3>
            <nav className={classes.Navigation}>
              {!username && !password && !usernameCustomer && !passwordCustomer ? (
                <>
                  <p className={classes.Navigation_Link} onMouseOver={openRegisterMenuHandler} onMouseOut={closeRegisterMenuHandler}>
                    Register
                    <span className={openRegister ? classes.Navigation_LoginVissible : classes.Navigation_Login}>
                      <NavLink to={{ pathname: "/register", state: "customer" }} className={classes.Navigation_RegisterLinks}>
                        User
                      </NavLink>
                      <NavLink to={{ pathname: "/register", state: "restaurant" }} className={classes.Navigation_RegisterLinks}>
                        Restaurant
                      </NavLink>
                    </span>
                  </p>
                  <p className={classes.Navigation_Link} onMouseOver={openLoginMenuHandler} onMouseOut={closeLoginMenuHandler}>
                    Login
                    <span className={openLogin ? classes.Navigation_LoginVissible : classes.Navigation_Login}>
                      <span onClick={handleOpenCustomer}>User</span>
                      <span onClick={handleOpenRestaurant}>Restaurant</span>
                    </span>
                  </p>
                </>
              ) : (
                <>
                  {usernameCustomer && passwordCustomer ? (
                    <NavLink
                      className={classes.Navigation_Link}
                      to={{
                        pathname: isAdmin ? `/admin` : `/profile`,
                        state: { username: usernameCustomer, password: passwordCustomer },
                      }}
                    >
                      Your profile
                    </NavLink>
                  ) : (
                    <NavLink
                      className={classes.Navigation_Link}
                      to={{
                        pathname: `/edit/${username?.toLowerCase()}`,
                        state: { username: username, password: password, id: restaurant ? restaurant._id : "" },
                      }}
                    >
                      Your profile
                    </NavLink>
                  )}
                  <NavLink className={classes.Navigation_Link} to={"/"} onClick={logoutHandler}>
                    Logout
                  </NavLink>
                </>
              )}
            </nav>
          </>
        )}
      </header>
      <LoginModal openRestaurant={openModalRestaurant} openCustomer={openModalCustomer} handleClose={handleClose} />
    </>
  );
};

export default Navigation;
