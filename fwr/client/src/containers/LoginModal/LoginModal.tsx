import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";

import classes from "./LoginModal.module.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/rootReducer";
import { setRestaurantsUsername, setRestaurantsPassword } from "../../features/restaurants/restaurantsSlice";

interface Props {
  open: boolean;
  handleClose: () => void;
}

export default function LoginModal({ open, handleClose }: Props) {
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const dispatch = useDispatch();
  const restaurants = useSelector((state: RootState) => state.restaurants.restaurants);
  const usernames = useSelector((state: RootState) => state.restaurants.restaurants).map((restaurant) => restaurant.username);
  const username = useSelector((state: RootState) => state.restaurants.username);
  const password = useSelector((state: RootState) => state.restaurants.password);

  const setUsername = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch(setRestaurantsUsername(e.target.value));
  };

  const setPassword = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch(setRestaurantsPassword(e.target.value));
  };

  useEffect(() => {
    if (!usernames.includes(username)) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
      restaurants.map((restaurant) => {
        if (restaurant.username === username) {
          if (restaurant.password === password) {
            setPasswordError(false);
          } else {
            setPasswordError(true);
          }
        }
        return null;
      });
    }
    if (!username) setUsernameError(false);
    if (!password) setPasswordError(false);
  }, [username, password]);

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!usernameError && !passwordError && username && password) {
      handleClose();
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
    }
    // if (!username || !password) return;
    // props.history.push({ pathname: "tasks", state: [username, password] });
  };

  return (
    <div>
      <Modal
        className={classes.Modal_Container}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 750,
        }}
      >
        <Fade in={open}>
          <div className={classes.Modal}>
            <h2 className={classes.Modal_Title}>Sign In as Restaurant</h2>
            <form className={classes.Modal_Form} onSubmit={submitForm}>
              <TextField
                required
                autoComplete='off'
                error={usernameError ? true : false}
                helperText={usernameError ? "Username not found." : " "}
                id='standard-required'
                label='Username'
                onChange={(e) => setUsername(e)}
                value={username}
              />
              <TextField
                required
                autoComplete='off'
                type='password'
                error={passwordError ? true : false}
                helperText={passwordError ? "Wrong password." : " "}
                id='standard-required'
                label='Password'
                onChange={(e) => setPassword(e)}
                value={password}
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
