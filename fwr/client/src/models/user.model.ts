import { Indentifiable, IdType } from "../shared-types/shared-types";

export interface IUser extends Indentifiable {
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
  workingHours?: { Monday: string; Tuesday: string; Wednesday: string; Thursday: string; Friday: string; Weekend: string };
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
    public description?: string,
    public keywords?: string[],
    public raiting?: number | 0,
    public imageUrl?: string,
    public street?: string,
    public zipCode?: string,
    public city?: string,
    public phone?: string,
    public workingHours?: { Monday: string; Tuesday: string; Wednesday: string; Thursday: string; Friday: string; Weekend: string },
  ) {}
}
