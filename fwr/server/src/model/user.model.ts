import { Indentifiable, IdType } from "./shared-types";

export interface IUser extends Indentifiable {
  email: string;
  username: string;
  password: string;
  roles: Role;
  bookedMeals?: string[];
  favouriteRestaurants?: string[];
  description?: string;
  keywords?: string;
  imageUrl?: string;
  street?: string;
  zipCode?: string;
  city?: string;
  phone?: string;
  pickUp?: string;
}

export enum Role {
  RESTAURANT,
  CUSTOMER,
  ADMIN,
}

export class User implements IUser {
  static typeId = "User";
  constructor(
    public _id: IdType,
    public email: string,
    public username: string,
    public password: string,
    public roles: Role,
    public bookedMeals?: string[],
    public favouriteRestaurants?: string[],
    public description?: string,
    public keywords?: string,
    public imageUrl?: string,
    public street?: string,
    public zipCode?: string,
    public city?: string,
    public phone?: string,
    public pickUp?: string
  ) {}
}