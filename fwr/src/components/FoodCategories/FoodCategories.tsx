import React, { ReactElement, useState } from "react";

import { MOCK_CATEGORIES } from "./../../models/mock-categories";
import FoodCategory from "./FoodCategory/FoodCategory";
import classes from "./FoodCategories.module.css";
import { withRouter, useHistory } from "react-router-dom";

interface Props {}

function FoodCategories({}: Props): ReactElement {
  const history = useHistory();

  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [firstCategory, setFirstCategory] = useState(0);

  // "Pagination"
  const nextPageClickHandler = () => {
    // if (firstCategory + itemsPerPage >= MOCK_CATEGORIES.length - itemsPerPage) {
    //   setItemsPerPage(MOCK_CATEGORIES.length - firstCategory);
    // }
    setFirstCategory(Math.min(firstCategory + itemsPerPage, MOCK_CATEGORIES.length - itemsPerPage));
  };

  const prevPageClickHandler = () => {
    setFirstCategory(Math.max(firstCategory - itemsPerPage, 0));
  };

  const showRestaurantsHandler = (name: string | undefined) => {
    history.push(`/restaurants/${name?.toLowerCase()}`, { foodCategory: name });
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  const foodCategories = MOCK_CATEGORIES.slice(firstCategory, firstCategory + itemsPerPage).map((category) => {
    return (
      <FoodCategory
        key={category.id}
        name={category.name}
        restaurants={category.restaurants}
        imageURL={category.imageURL}
        showRestaurants={() => showRestaurantsHandler(category.name)}
      />
    );
  });

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
