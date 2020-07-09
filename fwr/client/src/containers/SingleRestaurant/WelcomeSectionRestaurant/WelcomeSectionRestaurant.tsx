import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../app/rootReducer";

import classes from "./WelcomeSectionRestaurant.module.css";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import SearchIcon from "@material-ui/icons/Search";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Navigation from "../../../components/UI/Navigation/Navigation";
import { fetchRestaurantsByRole } from "../../../features/restaurants/restaurantsSlice";

interface Props {
  id: string;
  // buildSearchQueryHandler?: (e: string) => void; 
}

const WelcomeSectionRestaurant = ({ id }: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const restaurant = useSelector((state: RootState) => state.restaurants.restaurants).filter((restaurant) => restaurant._id === id)[0];

  useEffect(() => {
    dispatch(fetchRestaurantsByRole(0));
  }, []);

  const searchByKeywordHandler = (keyword: string) => {
    history.push(`/restaurants/${keyword?.toLowerCase()}`, {
      foodCategory: keyword,
    });
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  const buildQueryHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    // if(!buildSearchQueryHandler) return;
    // buildSearchQueryHandler(event.target.value)
  }

  return (
    <div className={classes.WelcomeSectionRestaurant}>
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
            {" "}
            <FavoriteBorderIcon className={classes.WelcomeSectionRestaurant_Like} /> Add to favourites
          </p>
          <div className={classes.WelcomeSectionRestaurant_Search}>
            <Input
              id='input-with-icon-adornment'
              className={classes.WelcomeSectionRestaurant_SearchBar}
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
