
import { IdType } from '../shared-types/shared-types';
import { handleErrorStausCodes } from './service-utils';
import { Meal } from '../models/meal.model';

export const API_BASE = 'http://localhost:9000/api';

class MealService {
    constructor(private apiUrl: string) {}

    async getAllMeals() {
        const resp = await fetch(`${this.apiUrl}/meals`);
        return handleErrorStausCodes<Meal[]>(resp);
    }

    async getMealsById(id: IdType) {
        const resp = await fetch(`${this.apiUrl}/meals/${id}`);
        return handleErrorStausCodes<Meal>(resp);
    }

    async getMealsByRestaurantId(restaurantId: IdType) {
        const resp = await fetch(`${this.apiUrl}/meals/${restaurantId}`);
        return handleErrorStausCodes<Meal[]>(resp);
    }

    async createNewMeal(meal: Meal, authToken: string | undefined) {
        const resp = await fetch(`${this.apiUrl}/meals`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken || ''}`
        },
            body: JSON.stringify(meal),
        });
        return handleErrorStausCodes<Meal>(resp);
    }

    async updateMeal(meal: Meal) {
        const resp = await fetch(`${this.apiUrl}/meals/${meal._id}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(meal),
        });
        return handleErrorStausCodes<Meal>(resp);
    }

    async deleteMeal(mealId: IdType) {
        const resp = await fetch(`${this.apiUrl}/meals/${mealId}`, {
            method: 'DELETE',
            mode: 'cors'
        });
        return handleErrorStausCodes<Meal>(resp);
    }

}



export default new MealService(API_BASE);
