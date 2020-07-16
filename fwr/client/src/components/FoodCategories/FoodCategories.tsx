import React, { ReactElement, useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";

import { fetchFoodCategories } from "../../features/foodCategories/foodCategorySlice";
import { RootState } from "../../app/rootReducer";
import { fetchRestaurantsByRole } from "../../features/restaurants/restaurantsSlice";
import FoodCategory from "./FoodCategory/FoodCategory";
import classes from "./FoodCategories.module.css";

function FoodCategories(): ReactElement {
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
      return restaurantsCount;
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

  // Adjusting the pagination according to the screen width
  const updateWindowDimensions = useCallback(() => {
    const width = window.innerWidth;
    if (width < 650) {
      setItemsPerPage(4);
    } else if ((width >= 650 && width < 1400) || itemsPerPage < 7) {
      setItemsPerPage(6);
    } else if ((width >= 1400 && width < 2400) || itemsPerPage < 8) {
      setItemsPerPage(8);
    } else if (width >= 2400 || itemsPerPage === 8) {
      setItemsPerPage(6);
    }
  }, [itemsPerPage]);

  useEffect(() => {
    dispatch(fetchRestaurantsByRole(0));
    dispatch(fetchFoodCategories());
    window.addEventListener("resize", updateWindowDimensions);
    updateWindowDimensions();
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, [dispatch, updateWindowDimensions]);

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
