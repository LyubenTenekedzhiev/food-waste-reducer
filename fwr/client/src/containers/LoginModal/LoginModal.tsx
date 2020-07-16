import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../app/rootReducer";
import { setRestaurantsUsername, setRestaurantsPassword } from "../../features/restaurants/restaurantsSlice";
import { setCustomersUsername, setCustomersPassword, setIsAdmin } from "../../features/customer/customerSlice";
import debouncedSearch from "../../shared-types/shared-functions";

import ButtonTertiary from "../../components/UI/Button/ButtonTertiary";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import classes from "./LoginModal.module.css";

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

  const setUsernameRestaurant = () => {
    return debouncedSearch((text) => dispatch(setRestaurantsUsername(text)));
  };
  const setPasswordRestaurant = () => {
    return debouncedSearch((text) => dispatch(setRestaurantsPassword(text)));
  };

  const setUsernameCustomer = () => {
    return debouncedSearch((text) => dispatch(setCustomersUsername(text)));
  };
  const setPasswordCustomer = () => {
    return debouncedSearch((text) => dispatch(setCustomersPassword(text)));
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
    dispatch(setIsAdmin());
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
      window.location.reload();
    }
  };

  const usernameRestaurantHandler = setUsernameRestaurant();
  const passwordRestaurantHandler = setPasswordRestaurant();
  const usernameCustomerHandler = setUsernameCustomer();
  const passwordCustomerHandler = setPasswordCustomer();

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
                value={openRestaurant ? usernameRestaurantHandler.inputText : usernameCustomerHandler.inputText}
                onChange={
                  openRestaurant
                    ? (e) => usernameRestaurantHandler.setInputText(e.target.value)
                    : (e) => usernameCustomerHandler.setInputText(e.target.value)
                }
              />
              <TextField
                required
                autoComplete='off'
                type='password'
                error={passwordError ? true : false}
                helperText={passwordError ? "Wrong password." : " "}
                id='standard-required'
                label='Password'
                value={openRestaurant ? passwordRestaurantHandler.inputText : passwordCustomerHandler.inputText}
                onChange={
                  openRestaurant
                    ? (e) => passwordRestaurantHandler.setInputText(e.target.value)
                    : (e) => passwordCustomerHandler.setInputText(e.target.value)
                }
              />
              <ButtonTertiary disabled={usernameError || passwordError}>Sign In</ButtonTertiary>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
