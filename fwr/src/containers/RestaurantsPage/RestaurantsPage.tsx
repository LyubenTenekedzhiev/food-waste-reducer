import React, { ReactElement, useState } from "react";

import classes from "./RestaurantsPage.module.css";
import Navigation from "./../../components/UI/Navigation/Navigation";
import AppsIcon from "@material-ui/icons/Apps";
import ViewCompactIcon from "@material-ui/icons/ViewCompact";
import { MOCK_RESTAURANTS } from "../../models/mock-restaurants";
import Restaurant from "./Restaurant/Restaurant";
import Footer from "../../components/UI/Footer/Footer";
import { useHistory } from "react-router-dom";

interface Props {
  location: any;
}

function RestaurantsPage({ location }: Props): ReactElement {
  const history = useHistory();
  const [gridLayout, setGridLayout] = useState<boolean>(true);

  const setGridLayoutHandler = () => {
    setGridLayout(true);
  };

  const setColumnLayoutHandler = () => {
    setGridLayout(false);
  };

  const showRestaurantHandler = (restaurantName: string) => {
    history.push(`/${restaurantName}`, {restaurantName: restaurantName});
  };

  const restaurants = MOCK_RESTAURANTS.map((restaurant) => {
    return (
      <Restaurant
        key={restaurant.id}
        name={restaurant.name}
        image={restaurant.imageURL}
        gridLayout={gridLayout}
        showRestaurant={() => showRestaurantHandler(restaurant.name)}
      />
    );
  });

  return (
    <div className={classes.RestaurantsPage}>
      <div className={classes.RestaurantsPage_Header}>
        <Navigation />
      </div>
      <div className={classes.RestaurantsPage_Restaurants}>
        <header className={classes.RestaurantsPage_TitleContainer}>
          <h2 className={classes.RestaurantsPage_Title}>{location.state.foodCategory} in Burgas</h2>
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
        </header>
        <h2 className={classes.RestaurantsPage_GridTitle}>Restaurants open & online</h2>
        <main className={gridLayout ? classes.RestaurantsPage_Grid : classes.RestaurantsPage_Column}>{restaurants}</main>
      </div>
      <Footer />
    </div>
  );
}

export default RestaurantsPage;
