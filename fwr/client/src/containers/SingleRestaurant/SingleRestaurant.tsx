import React, { ReactElement, useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/rootReducer";
import { useHistory } from "react-router-dom";

import classes from "./SingleRestaurant.module.css";
import Menu from "./Menu/Menu";
import WelcomeSectionRestaurant from "./WelcomeSectionRestaurant/WelcomeSectionRestaurant";
import Footer from "../../components/UI/Footer/Footer";
import { fetchRestaurantsByRole } from "../../features/restaurants/restaurantsSlice";

interface LocationState {
  state: {
    id: string;
  };
}
interface Props {
  location: LocationState;
}

function SingleRestaurant({ location }: Props): ReactElement {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const history = useHistory();
  const dispatch = useDispatch();

  const restaurant = useSelector((state: RootState) => state.restaurants.restaurants).filter(
    (restaurant) => restaurant._id === location.state.id
  )[0];

  useEffect(() => {
    if (!location.state) history.push("/");
    dispatch(fetchRestaurantsByRole(0));
  }, [dispatch, location.state, history]);

  const updateWindowDimensions = useCallback(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, [updateWindowDimensions]);

  return (
    <div>
      {location.state ? <WelcomeSectionRestaurant id={location.state.id} /> : ""}
      {screenWidth < 1000 ? (
        <div className={classes.SingleRestaurant_Info}>
          <div className={classes.SingleRestaurant_Address}>
            <h4 className={classes.SingleRestaurant_InfoTitle}>Address</h4>
            <p>{restaurant ? restaurant.street : ""}</p>
            <p>
              {restaurant ? restaurant.zipCode : ""} {restaurant ? restaurant.city : ""}
            </p>
            <a
              href={`https://www.google.com/maps/place/${restaurant ? restaurant.street : ""} ${restaurant ? restaurant.city : ""}`}
              target='blank'
            >
              See map
            </a>
          </div>
          <div className={classes.SingleRestaurant_PickUp}>
            <h4 className={classes.SingleRestaurant_InfoTitle}>Pick Up</h4>
            <span>{restaurant ? restaurant.pickUp : ""}</span>
          </div>
          <div className={classes.SingleRestaurant_Contact}>
            <h4 className={classes.SingleRestaurant_InfoTitle}>Contact</h4>
            <span>{restaurant ? restaurant.phone : ""}</span>
            <span>{restaurant ? restaurant.email : ""}</span>
          </div>
        </div>
      ) : null}
      <main className={classes.SingleRestaurant_Main}>
        {screenWidth >= 1000 ? (
          <>
            {" "}
            {location.state ? <Menu id={location.state.id} /> : null}
            <div className={classes.SingleRestaurant_Info}>
              <h3 className={classes.SingleRestaurant_InformationTitle}>Venue Information</h3>
              <div className={classes.SingleRestaurant_Address}>
                <h4 className={classes.SingleRestaurant_InfoTitle}>Address</h4>
                <p>{restaurant ? restaurant.street : ""}</p>
                <p>
                  {restaurant ? restaurant.zipCode : ""} {restaurant ? restaurant.city : ""}
                </p>
                <a
                  href={`https://www.google.com/maps/place/${restaurant ? restaurant.street : ""} ${restaurant ? restaurant.city : ""}`}
                  target='blank'
                >
                  See map
                </a>
              </div>
              <div className={classes.SingleRestaurant_PickUp}>
                <h4 className={classes.SingleRestaurant_InfoTitle}>Pick Up</h4>
                <span>{restaurant ? restaurant.pickUp : ""}</span>
              </div>
              <div className={classes.SingleRestaurant_Contact}>
                <h4 className={classes.SingleRestaurant_InfoTitle}>Contact</h4>
                <span>{restaurant ? restaurant.phone : ""}</span>
                <span>{restaurant ? restaurant.email : ""}</span>
              </div>
            </div>
          </>
        ) : (
          <>{location.state ? <Menu id={location.state.id} /> : null}</>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default SingleRestaurant;
