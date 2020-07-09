import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import classes from "./Navigation.module.css";
import LoginModal from "../../../containers/LoginModal/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantsByRole } from "../../../features/restaurants/restaurantsSlice";
import { RootState } from "../../../app/rootReducer";

interface Props {}

// interface RouteProps {

// }

const Navigation = (props: Props): JSX.Element => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const dispatch = useDispatch();
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  const restaurant = useSelector((state: RootState) => state.restaurants.restaurants).filter(
    (restaurant) => restaurant.username === username && restaurant.password === password
  )[0];

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

  const handleOpen = () => {
    setOpenModal(true);
    dispatch(fetchRestaurantsByRole(0));
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const logoutHandler = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    // window.location.reload();
  };

  return (
    <>
      <header className={classes.Header}>
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
          {!username && !password ? (
            <>
              <p className={classes.Navigation_Link} onMouseOver={openRegisterMenuHandler} onMouseOut={closeRegisterMenuHandler}>
                Register
                <span className={openRegister ? classes.Navigation_LoginVissible : classes.Navigation_Login}>
                  <NavLink to={{ pathname: "/register", state: "user" }} className={classes.Navigation_RegisterLinks}>
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
                  <span onClick={() => console.log("User")}>User</span>
                  <span onClick={handleOpen}>Restaurant</span>
                </span>
              </p>
            </>
          ) : (
            <>
              {" "}
              <NavLink
                className={classes.Navigation_Link}
                to={{
                  pathname: `/edit/${username?.toLowerCase()}`,
                  state: { username: username, password: password, id: restaurant ? restaurant._id : "" },
                }}
              >
                Your profile
              </NavLink>{" "}
              <NavLink className={classes.Navigation_Link} to={"/"} onClick={logoutHandler}>
                Logout
              </NavLink>
            </>
          )}
        </nav>
      </header>
      <LoginModal open={openModal} handleClose={handleClose} />
    </>
  );
};

export default Navigation;
