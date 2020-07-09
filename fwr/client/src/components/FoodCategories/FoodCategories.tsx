import React, { ReactElement, useState, useEffect } from "react";

import FoodCategory from "./FoodCategory/FoodCategory";
import { withRouter, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoodCategories } from "../../features/foodCategories/foodCategorySlice";
import { RootState } from "../../app/rootReducer";
import { fetchRestaurantsByRole } from "../../features/restaurants/restaurantsSlice";
import classes from "./FoodCategories.module.css";

interface Props {}

function FoodCategories({}: Props): ReactElement {
  const history = useHistory();
  const dispatch = useDispatch();

  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [firstCategory, setFirstCategory] = useState(0);
  let restaurantsCount = 0;

  const restaurants = useSelector((state: RootState) => state.restaurants.restaurants);
  const allFoodCategories = useSelector((state: RootState) => state.foodCategories.foodCategories);
  const foodCategories = allFoodCategories.slice(firstCategory, firstCategory + itemsPerPage).map((category) => {
    restaurantsCount = 0;
    restaurants.map((restaurant) => {
      if (restaurant.keywords?.includes(category.name.toLowerCase())) {
        restaurantsCount++;
      }
    });
    return (
      <FoodCategory
        key={category._id}
        name={category.name}
        restaurants={restaurantsCount}
        imageURL={category.imageUrl}
        showRestaurants={() => showRestaurantsHandler(category.name)}
      />
    );
  });

  
  useEffect(() => {
    dispatch(fetchRestaurantsByRole(0));
    dispatch(fetchFoodCategories());
  }, []);

  // "Pagination"
  const nextPageClickHandler = () => {
    if (allFoodCategories.length - itemsPerPage < firstCategory + itemsPerPage) {
      if (firstCategory + itemsPerPage > allFoodCategories.length) return;
      setFirstCategory(Math.max(firstCategory + itemsPerPage, allFoodCategories.length - itemsPerPage)); 
    } else {
      setFirstCategory(Math.min(firstCategory + itemsPerPage, allFoodCategories.length - itemsPerPage)); 
    }
  };
  const prevPageClickHandler = () => {
    setFirstCategory(Math.max(firstCategory - itemsPerPage, 0));
  };

  const showRestaurantsHandler = (name: string | undefined) => {
    history.push(`/restaurants/${name?.toLowerCase()}`, { foodCategory: name });
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  return (
    <div className={classes.FoodCategories} id='FoodCategories'>
      <div className={classes.FoodCategories_TitleContainer}>
        <h1 className={classes.FoodCategories_Title}>Categories</h1>
        <div className={classes.FoodCategories_Arrows}>
          <span onClick={prevPageClickHandler}>&lt;</span>
          <span onClick={nextPageClickHandler}>&gt;</span>
        </div>
      </div>
      <div className={classes.FoodCategories_Grid}>{foodCategories}</div>
    </div>
  );
}

export default withRouter(FoodCategories);
