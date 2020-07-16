import React, { ReactElement, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchCustomersByRole } from "../../features/customer/customerSlice";
import { fetchRestaurantsByRole } from "../../features/restaurants/restaurantsSlice";
import { RootState } from "../../app/rootReducer";
import { fetchAllMeals } from "../../features/meals/mealsSlice";
import { IdType } from "../../shared-types/shared-types";

import Restaurant from "../RestaurantsPage/Restaurant/Restaurant";
import Navigation from "../../components/UI/Navigation/Navigation";
import Meal from "../SingleRestaurant/Meal/Meal";
import Footer from "../../components/UI/Footer/Footer";
import classes from "./CustomersProfile.module.css";

function CustomersProfile(): ReactElement {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const username = localStorage.getItem("usernameCustomer");
  const password = localStorage.getItem("passwordCustomer");

  const customer = useSelector((state: RootState) => state.customers.customers).filter(
    (customer) => customer.username === username && customer.password === password
  )[0];
  const restaurants = useSelector((state: RootState) => state.restaurants.restaurants);
  const favouriteRestaurants = customer?.favouriteRestaurants
    ?.map((id) => restaurants.filter((restaurant) => restaurant._id === id))
    .map((favRestaurant) => {
      return (
        <Restaurant
          key={favRestaurant[0]._id}
          name={favRestaurant[0].username}
          image={favRestaurant[0].imageUrl}
          description={favRestaurant[0].description}
          pickUp={favRestaurant[0].pickUp}
          keywords={favRestaurant[0].keywords}
          gridLayout={true}
          showRestaurant={() => showRestaurantHandler(favRestaurant[0].username, favRestaurant[0]._id)}
        />
      );
    });

  const meals = useSelector((state: RootState) => state.meals.meals).filter((meal) => customer?.bookedMeals?.includes(meal._id));

  const matchingIds = meals
    .map((meal) => restaurants.filter((restaurant) => meal.restaurantId === restaurant._id).map((restaurant) => restaurant._id))
    .flat()
    .filter((category, index, array) => array.indexOf(category) === index);

  const matchingRestaurants = matchingIds
    .map((id) => restaurants.filter((restaurant) => restaurant._id === id))
    .flat()
    .filter((category, index, array) => array.indexOf(category) === index);
  const bookedMeals = matchingRestaurants.map((restaurant) => {
    return (
      <>
        <h2 className={classes.CustomersProfile_BookedMealsTitle}>From {restaurant.username}</h2>
        <div className={classes.CustomersProfile_BookedMeals}>
          {meals
            .filter((meal) => meal.active === true)
            .map((meal) => {
              if (meal.restaurantId === restaurant._id) {
                return (
                  <>
                    {meal ? (
                      <Meal
                        key={`${meal._id}-${meal.initialAmount}`}
                        _id={meal._id}
                        name={meal.name}
                        imageUrl={meal.imageUrl}
                        price={meal.price}
                        description={meal.description}
                        amount={meal.amount}
                        initialAmount={meal.initialAmount}
                        restaurantId={meal.restaurantId}
                        foodCategory={meal.foodCategory}
                        active={meal.active}
                        previewMenu={false}
                        editMenu={false}
                        customersProfile={true}
                      />
                    ) : null}
                  </>
                );
              }
            })}
        </div>
      </>
    );
  });

  useEffect(() => {
    if (!location.state) history.push("/");
    dispatch(fetchAllMeals());
    dispatch(fetchCustomersByRole(1));
    dispatch(fetchRestaurantsByRole(0));
  }, [dispatch, history, location.state]);

  const showRestaurantHandler = (restaurantName: string, id: IdType) => {
    history.push(`/restaurant/${restaurantName}`, { id: id });
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  return (
    <div className={classes.CustomersProfile}>
      <div className={classes.CustomersProfile_Header}>
        <Navigation />
      </div>
      <h2 className={classes.CustomersProfile_Title}>Booked Meals</h2>
      {bookedMeals}
      <h2 className={classes.CustomersProfile_Title}>Favourite Restaurants</h2>
      <div className={classes.CustomersProfile_Grid}>{favouriteRestaurants}</div>
      <Footer />
    </div>
  );
}

export default React.memo(CustomersProfile);
