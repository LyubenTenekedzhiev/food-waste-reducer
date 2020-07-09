import { Indentifiable, IdType } from './shared-types';
export interface IFoodCategory extends Indentifiable {
    name: string;
    imageUrl: string;
}

export class FoodCategory implements IFoodCategory {
    static typeId = 'FoodCategory';
    constructor(
        public _id: IdType,
        public name: string,
        public imageUrl: string,
        ) {}
}