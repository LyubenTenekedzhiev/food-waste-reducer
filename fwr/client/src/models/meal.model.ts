import { Indentifiable, IdType } from '../shared-types/shared-types';
export interface IMeal extends Indentifiable {
    name: string;
    description: string;
    price: string;
    imageUrl: string;
    restaurantId: IdType;
    foodCategory: string;
    active: boolean;
}

export class Meal implements IMeal {
    static typeId = 'Meal';
    constructor(
        public _id: IdType,
        public name: string,
        public description: string,
        public price: string,
        public imageUrl: string,
        public restaurantId: IdType,
        public foodCategory: string,
        public active: boolean,
        ) {}
}