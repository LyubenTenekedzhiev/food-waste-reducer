import { Indentifiable, IdType } from "./shared-types";

export interface IUser extends Indentifiable {
  email: string;
  username: string;
  password: string;
  imageUrl?: string;
  raiting?: number | 0;
  mealId?: string;
  roles: Role[];
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
    public imageUrl?: string,
    public raiting?: number | 0,
    public mealId?: string,
    public roles: Role[] = []
  ) {}
}
