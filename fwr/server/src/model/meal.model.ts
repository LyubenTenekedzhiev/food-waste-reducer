import { Indentifiable, IdType } from "./shared-types";
export interface IMeal extends Indentifiable {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  restaurantId: IdType;
  foodCategory: string;
  amount: string;
  initialAmount: string;
  active: boolean;
}

export class Meal implements IMeal {
  static typeId = "Meal";
  constructor(
    public _id: IdType,
    public name: string,
    public description: string,
    public price: number,
    public imageUrl: string,
    public restaurantId: IdType,
    public foodCategory: string,
    public amount: string,
    public initialAmount: string,
    public active: boolean
  ) {}
}
