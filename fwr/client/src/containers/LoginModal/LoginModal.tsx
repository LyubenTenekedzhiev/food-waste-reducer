import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";

import classes from "./LoginModal.module.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/rootReducer";
import { setRestaurantsUsername, setRestaurantsPassword } from "../../features/restaurants/restaurantsSlice";
import { setCustomersUsername, setCustomersPassword } from "../../features/customer/customerSlice";

interface Props {
  openRestaurant: boolean;
  openCustomer: boolean;
  handleClose: () => void;
}

export default function LoginModal({ openRestaurant, openCustomer, handleClose }: Props) {
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const dispatch = useDispatch();
  const restaurants = useSelector((state: RootState) => state.restaurants.restaurants);
  const customers = useSelector((state: RootState) => state.customers.customers);
  const usernamesRestaurant = useSelector((state: RootState) => state.restaurants.restaurants).map((restaurant) => restaurant.username);
  const usernamesCustomer = useSelector((state: RootState) => state.customers.customers).map((customer) => customer.username);
  const usernameRestaurant = useSelector((state: RootState) => state.restaurants.username);
  const passwordRestaurant = useSelector((state: RootState) => state.restaurants.password);
  const usernameCustomer = useSelector((state: RootState) => state.customers.username);
  const passwordCustomer = useSelector((state: RootState) => state.customers.password);

  const setUsernameRestaurant = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch(setRestaurantsUsername(e.target.value));
  };
  const setPasswordRestaurant = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch(setRestaurantsPassword(e.target.value));
  };

  const setUsernameCustomer = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch(setCustomersUsername(e.target.value));
  };
  const setPasswordCustomer = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch(setCustomersPassword(e.target.value));
  };

  useEffect(() => {
    if (!usernamesRestaurant.includes(usernameRestaurant)) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
      restaurants.map((restaurant) => {
        if (restaurant.username === usernameRestaurant) {
          if (restaurant.password === passwordRestaurant) {
            setPasswordError(false);
          } else {
            setPasswordError(true);
          }
        }
        return null;
      });
    }
    if (!usernameRestaurant) setUsernameError(false);
    if (!passwordRestaurant) setPasswordError(false);
  }, [usernameRestaurant, passwordRestaurant]);

  useEffect(() => {
    if (!usernamesCustomer.includes(usernameCustomer)) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
      customers.map((customer) => {
        if (customer.username === usernameCustomer) {
          if (customer.password === passwordCustomer) {
            setPasswordError(false);
          } else {
            setPasswordError(true);
          }
        }
        return null;
      });
    }
    if (!usernameCustomer) setUsernameError(false);
    if (!passwordCustomer) setPasswordError(false);
  }, [usernameCustomer, passwordCustomer]);

  const submitFormRestaurant = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!usernameError && !passwordError && usernameRestaurant && passwordRestaurant) {
      handleClose();
      localStorage.setItem("username", usernameRestaurant);
      localStorage.setItem("password", passwordRestaurant);
    }
  };

  const submitFormCustomer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!usernameError && !passwordError && usernameCustomer && passwordCustomer) {
      handleClose();
      localStorage.setItem("usernameCustomer", usernameCustomer);
      localStorage.setItem("passwordCustomer", passwordCustomer);
    }
  };

  return (
    <div>
      <Modal
        className={classes.Modal_Container}
        open={openRestaurant ? openRestaurant : openCustomer}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 750,
        }}
      >
        <Fade in={openRestaurant ? openRestaurant : openCustomer}>
          <div className={classes.Modal}>
            <h2 className={classes.Modal_Title}>{openRestaurant ? "Sign In as Restaurant" : "Sing In as Customer"}</h2>
            <form className={classes.Modal_Form} onSubmit={openRestaurant ? submitFormRestaurant : submitFormCustomer}>
              <TextField
                required
                autoComplete='off'
                error={usernameError ? true : false}
                helperText={usernameError ? "Username not found." : " "}
                id='standard-required'
                label='Username'
                onChange={openRestaurant ? setUsernameRestaurant : setUsernameCustomer}
                value={openRestaurant ? usernameRestaurant : usernameCustomer}
              />
              <TextField
                required
                autoComplete='off'
                type='password'
                error={passwordError ? true : false}
                helperText={passwordError ? "Wrong password." : " "}
                id='standard-required'
                label='Password'
                onChange={openRestaurant ? setPasswordRestaurant : setPasswordCustomer}
                value={openRestaurant ? passwordRestaurant : passwordCustomer}
              />

              <button className={`${classes.button} ${classes.from_right}`} disabled={usernameError || passwordError}>
                Sign in
              </button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
