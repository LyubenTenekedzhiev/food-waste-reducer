import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../app/rootReducer";

import classes from "./WelcomeSectionRestaurant.module.css";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import SearchIcon from "@material-ui/icons/Search";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Navigation from "../../../components/UI/Navigation/Navigation";
import { fetchRestaurantsByRole } from "../../../features/restaurants/restaurantsSlice";
import { buildSearchQuery } from "../../../features/meals/mealsSlice";
import { updateCustomer, fetchCustomersByRole } from "../../../features/customer/customerSlice";

interface Props {
  id: string;
}

const WelcomeSectionRestaurant = ({ id }: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const username = localStorage.getItem("usernameCustomer");
  const password = localStorage.getItem("passwordCustomer");
  const restaurant = useSelector((state: RootState) => state.restaurants.restaurants).filter((restaurant) => restaurant._id === id)[0];
  const customer = useSelector((state: RootState) => state.customers.customers).filter(
    (customer) => customer.username === username && customer.password === password
  )[0];

  useEffect(() => {
    dispatch(fetchRestaurantsByRole(0));
    dispatch(fetchCustomersByRole(1));
  }, []);

  const searchByKeywordHandler = (keyword: string) => {
    history.push(`/restaurants/${keyword?.toLowerCase()}`, {
      foodCategory: keyword,
    });
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  const buildQueryHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch(buildSearchQuery(event.target.value));
  };

  const addToFavourites = () => {
    dispatch(
      updateCustomer({
        _id: customer?._id,
        email: customer?.email,
        username: customer?.username,
        password: customer?.password,
        roles: customer?.roles,
        favouriteRestaurants: customer?.favouriteRestaurants ? [...customer?.favouriteRestaurants, id] : customer?.favouriteRestaurants,
      })
    );
  };

  const removeFromFavourites = () => {
    if (customer.favouriteRestaurants?.indexOf(id) === undefined) return;
    const updatedFavourites = customer?.favouriteRestaurants.filter((_id) => _id !== id);
    console.log(updatedFavourites);
    dispatch(
      updateCustomer({
        _id: customer?._id,
        email: customer?.email,
        username: customer?.username,
        password: customer?.password,
        roles: customer?.roles,
        favouriteRestaurants: customer?.favouriteRestaurants ? updatedFavourites : customer?.favouriteRestaurants,
      })
    );
  };

  return (
    <div className={classes.WelcomeSectionRestaurant} style={{ backgroundImage: restaurant ? `url(${restaurant.imageUrl})` : "" }}>
      <div className={classes.WelcomeSectionRestaurant_Content}>
        <div className={classes.WelcomeSectionRestaurant_Header}>
          <Navigation />
        </div>
        <div className={classes.WelcomeSectionRestaurant_TextContainer}>
          <h1 className={classes.WelcomeSectionRestaurant_Text}>{restaurant ? restaurant.username : ""}</h1>
          <p className={classes.WelcomeSectionRestaurant_Description}>{restaurant ? restaurant.description : ""}</p>
          <div className={classes.WelcomeSectionRestaurant_Keywords}>
            {restaurant
              ? restaurant.keywords?.split(",").map((keyword, index) => (
                  <span key={index} onClick={() => searchByKeywordHandler(keyword)}>
                    {keyword}
                  </span>
                ))
              : ""}
          </div>
        </div>
        <div className={classes.WelcomeSectionRestaurant_Favourites}>
          <p className={classes.WelcomeSectionRestaurant_AddToFavourites}>
            {customer &&
              (customer.favouriteRestaurants?.includes(id) ? (
                <>
                  <FavoriteIcon className={classes.WelcomeSectionRestaurant_Like} onClick={removeFromFavourites} />{" "}
                  <span>Remove from favourites</span>
                </>
              ) : (
                <>
                  <FavoriteBorderIcon className={classes.WelcomeSectionRestaurant_Like} onClick={addToFavourites} />{" "}
                  <span>Add to favourites</span>{" "}
                </>
              ))}
          </p>
          <div className={classes.WelcomeSectionRestaurant_Search}>
            <Input
              id='input-with-icon-adornment'
              className={classes.WelcomeSectionRestaurant_SearchBar}
              placeholder='Find your favourite meal'
              onChange={buildQueryHandler}
              startAdornment={
                <InputAdornment position='start'>
                  <SearchIcon className={classes.WelcomeSectionRestaurant_SearchIcon} />
                </InputAdornment>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSectionRestaurant;
