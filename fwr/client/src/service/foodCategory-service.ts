
import { IdType } from '../shared-types/shared-types';
import { handleErrorStausCodes } from './service-utils';
import { FoodCategory } from '../models/foodCategory.model';

export const API_BASE = 'http://localhost:9000/api';

class FoodCategoryService {
    constructor(private apiUrl: string) {}

    async getAllFoodCategorys() {
        const resp = await fetch(`${this.apiUrl}/foodCategories`);
        return handleErrorStausCodes<FoodCategory[]>(resp);
    }

    async getFoodCategorysById(id: IdType) {
        const resp = await fetch(`${this.apiUrl}/foodCategories/${id}`);
        return handleErrorStausCodes<FoodCategory>(resp);
    }
    
    async createNewFoodCategory(foodCategory: FoodCategory, authToken: string | undefined) {
        const resp = await fetch(`${this.apiUrl}/foodCategories`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken || ''}`
        },
            body: JSON.stringify(foodCategory),
        });
        return handleErrorStausCodes<FoodCategory>(resp);
    }

    async updateFoodCategory(foodCategory: FoodCategory) {
        const resp = await fetch(`${this.apiUrl}/foodCategories/${foodCategory._id}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(foodCategory),
        });
        return handleErrorStausCodes<FoodCategory>(resp);
    }

    async deleteFoodCategory(foodCategoryId: IdType) {
        const resp = await fetch(`${this.apiUrl}/foodCategories/${foodCategoryId}`, {
            method: 'DELETE',
            mode: 'cors'
        });
        return handleErrorStausCodes<FoodCategory>(resp);
    }

}



export default new FoodCategoryService(API_BASE);
