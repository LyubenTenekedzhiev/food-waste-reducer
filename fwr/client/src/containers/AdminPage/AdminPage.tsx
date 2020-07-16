import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import classes from "./AdminPage.module.css";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Navigation from "../../components/UI/Navigation/Navigation";
import { fetchRestaurantsByRole, deleteRestaurant } from "../../features/restaurants/restaurantsSlice";
import { RootState } from "../../app/rootReducer";
import EditCustomersProfile from "./EditCustomersProfile/EditCustomersProfile";
import EditProfile from "../RestaurantsProfile/EditProfile/EditProfile";
import EditFoodCategory from "./EditFoodCategory/EditFoodCategory";
import { fetchCustomersByRole, deleteCustomer } from "../../features/customer/customerSlice";
import { fetchFoodCategories, deleteFoodCategory } from "../../features/foodCategories/foodCategorySlice";
import Footer from "../../components/UI/Footer/Footer";

function AdminPage(): ReactElement {
  const [restaurantsId, setRestaurantsId] = useState("");
  const [customersId, setCustomersId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const isAdmin = useSelector((state: RootState) => state.customers.isAdmin);
  
  const restaurants = useSelector((state: RootState) => state.restaurants.restaurants).map((restaurant) => {
    return (
      <div className={classes.AdminPage_User} key={restaurant._id}>
        <h2 className={classes.AdminPage_UserInfo}>{restaurant.username}</h2>
        <h2 className={classes.AdminPage_UserInfo}>{restaurant.email}</h2>
        <div className={classes.AdminPage_UserIcons}>
          <EditIcon className={classes.AdminPage_Edit} onClick={() => setRestaurantsId(restaurant._id)} />
          <DeleteIcon className={classes.AdminPage_Delete} onClick={() => deleteRestaurantHandler(restaurant._id)} />
        </div>
      </div>
    );
  });
  const customers = useSelector((state: RootState) => state.customers.customers).map((customer) => {
    return (
      <div className={classes.AdminPage_User} key={customer._id}>
        <h2 className={classes.AdminPage_UserInfo}>{customer.username}</h2>
        <h2 className={classes.AdminPage_UserInfo}>{customer.email}</h2>
        <div className={classes.AdminPage_UserIcons}>
          <EditIcon className={classes.AdminPage_Edit} onClick={() => setCustomersId(customer._id)} />
          <DeleteIcon className={classes.AdminPage_Delete} onClick={() => deleteCustomerHandler(customer._id)} />
        </div>
      </div>
    );
  });

  const foodCategories = useSelector((state: RootState) => state.foodCategories.foodCategories).map((category) => {
    return (
      <div className={classes.AdminPage_User} key={category._id}>
        <h2 className={classes.AdminPage_UserInfo}>{category.name}</h2>
        <div className={classes.AdminPage_UserIcons}>
          <EditIcon className={classes.AdminPage_Edit} onClick={() => setCategoryId(category._id)} />
          <DeleteIcon className={classes.AdminPage_Delete} onClick={() => deleleCategoryHandler(category._id)} />
        </div>
      </div>
    );
  });

  useEffect(() => {
    if (!isAdmin) history.push("/");
    dispatch(fetchRestaurantsByRole(0));
    dispatch(fetchCustomersByRole(1));
    dispatch(fetchFoodCategories());
  }, []);

  const deleteRestaurantHandler = (id: string) => {
    dispatch(deleteRestaurant(id));
  };

  const deleteCustomerHandler = (id: string) => {
    dispatch(deleteCustomer(id));
  };

  const deleleCategoryHandler = (id: string) => {
    dispatch(deleteFoodCategory(id));
  };

  return (
    <div className={classes.AdminPage}>
      <div className={classes.AdminPage_Header}>
        <Navigation />
      </div>
      <h2 className={classes.AdminPage_Title}>Restaurants</h2>
      <div className={classes.AdminPage_RestaurantsSection}>
        <div className={classes.AdminPage_Restaurants}>{restaurants}</div>
        <div className={classes.AdminPage_RestaurantsForm}>
          <EditProfile _id={restaurantsId} />
        </div>
      </div>
      <h2 className={classes.AdminPage_Title}>Customers</h2>
      <div className={classes.AdminPage_CustomersSection}>
        <div className={classes.AdminPage_Customers}>{customers}</div>
        <div className={classes.AdminPage_CustomersForm}>
          <EditCustomersProfile _id={customersId} />
        </div>
      </div>
      <h2 className={classes.AdminPage_Title}>Food Categories</h2>
      <div className={classes.AdminPage_CustomersSection}>
        <div className={classes.AdminPage_Customers}>{foodCategories}</div>
        <div className={classes.AdminPage_CustomersForm}>
          <EditFoodCategory _id={categoryId} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminPage;
