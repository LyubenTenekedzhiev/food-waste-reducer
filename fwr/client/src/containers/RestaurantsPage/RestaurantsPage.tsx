import React, { ReactElement, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import classes from "./RestaurantsPage.module.css";
import Navigation from "./../../components/UI/Navigation/Navigation";
import AppsIcon from "@material-ui/icons/Apps";
import ViewCompactIcon from "@material-ui/icons/ViewCompact";
import Restaurant from "./Restaurant/Restaurant";
import Footer from "../../components/UI/Footer/Footer";
import { RootState } from "../../app/rootReducer";
import { fetchRestaurantsByRole } from "../../features/restaurants/restaurantsSlice";
import { IdType } from "../../shared-types/shared-types";

interface LocationState {
  state: {
    foodCategory: string;
  };
}
interface Props {
  location: LocationState;
}

function RestaurantsPage({ location }: Props): ReactElement {
  const [gridLayout, setGridLayout] = useState<boolean>(true);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRestaurantsByRole(0));
    if (!location.state) history.push("/");
  }, []);

  const restaurants = useSelector((state: RootState) => state.restaurants.restaurants);
  const filteredRestaurants = restaurants
    .filter((restaurant) => restaurant.keywords?.includes(location.state.foodCategory.toLowerCase()))
    .map((restaurant) => {
      return (
        <Restaurant
          key={restaurant._id}
          name={restaurant.username}
          image={restaurant.imageUrl}
          description={restaurant.description}
          pickUp={restaurant.pickUp}
          keywords={restaurant.keywords}
          gridLayout={gridLayout}
          showRestaurant={() => showRestaurantHandler(restaurant.username, restaurant._id)}
        />
      );
    });
  const allRestaurants = restaurants.map((restaurant) => {
    return (
      <Restaurant
        key={restaurant._id}
        name={restaurant.username}
        image={restaurant.imageUrl}
        description={restaurant.description}
        pickUp={restaurant.pickUp}
        keywords={restaurant.keywords}
        gridLayout={gridLayout}
        showRestaurant={() => showRestaurantHandler(restaurant.username, restaurant._id)}
      />
    );
  });

  const setGridLayoutHandler = () => {
    setGridLayout(true);
  };

  const setColumnLayoutHandler = () => {
    setGridLayout(false);
  };

  const showRestaurantHandler = (restaurantName: string, id: IdType) => {
    history.push(`/restaurant/${restaurantName}`, { id: id });
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  return (
    <div className={classes.RestaurantsPage}>
      <div className={classes.RestaurantsPage_Header}>
        <Navigation />
      </div>
      <div className={classes.RestaurantsPage_Restaurants}>
        <div className={classes.RestaurantsPage_TitleContainer}>
          <h2 className={classes.RestaurantsPage_Title}>{location.state ? location.state.foodCategory : ""} in Burgas</h2>
          <div className={classes.RestaurantsPage_Icons}>
            <AppsIcon
              className={`${classes.RestaurantsPage_Icon} ${gridLayout ? classes.RestaurantsPage_IconActive : null}`}
              onClick={setGridLayoutHandler}
            />
            <ViewCompactIcon
              className={`${classes.RestaurantsPage_Icon} ${!gridLayout ? classes.RestaurantsPage_IconActive : null}`}
              onClick={setColumnLayoutHandler}
            />
          </div>
        </div>
        {filteredRestaurants[0] ? (
          // Filtered restaurants
          <div className={classes.RestaurantsPage_FilteredRestaurants}>
            <h2 className={classes.RestaurantsPage_GridTitle}>Restaurants open & online</h2>
            <main className={gridLayout ? classes.RestaurantsPage_Grid : classes.RestaurantsPage_Column}>{filteredRestaurants}</main>
          </div>
        ) : (
          <h2 className={classes.RestaurantsPage_NoRestaurants}>Aw, snap. There aren't any restaurants for this category yet.</h2>
        )}
        {/* All restaurants */}
        {allRestaurants[0] ? (
          <>
            {" "}
            <div className={classes.RestaurantsPage_TitleContainer}>
              <h2 className={classes.RestaurantsPage_Title}>All restaurants in Burgas</h2>
            </div>
            <h2 className={classes.RestaurantsPage_GridTitle}></h2>
            <main className={gridLayout ? classes.RestaurantsPage_Grid : classes.RestaurantsPage_Column}>{allRestaurants}</main>
          </>
        ) : (
          <h2 className={classes.RestaurantsPage_NoRestaurants}>There aren't any restaurants yet.</h2>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default RestaurantsPage;
