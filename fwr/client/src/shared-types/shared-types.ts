import { Role } from "../models/user.model";

export type IdType = string;

export interface Indentifiable {
  _id?: IdType;
}

export interface RestaurantEditProfile {
  _id: string;
  email: string;
  username: string;
  password: string;
  description?: string;
  keywords?: string;
  imageUrl?: string;
  street?: string;
  zipCode?: string;
  city?: string;
  phone?: string;
  pickUp?: string;
}

export interface RestaurantRegister {
  _id: string;
  email: string;
  username: string;
  password: string;
  roles: Role;
  description?: string;
  keywords?: string[];
  imageUrl?: string;
  raiting?: number | 0;
  street?: string;
  zipCode?: string;
  city?: string;
  phone?: string;
  pickUp?: string;
}

export interface CustomerRegister {
  _id: string;
  email: string;
  username: string;
  password: string;
  roles: Role;
  favouriteRestaurants: string[];
  bookedMeals: string[];
}

export interface CustomerEditProfile {
  _id: string;
  email: string;
  username: string;
  password: string;
  favouriteRestaurants?: string[];
  bookedMeals?: string[];
}

export interface FoodCategories {
  _id: string;
  name: string;
  imageUrl: string;
}
