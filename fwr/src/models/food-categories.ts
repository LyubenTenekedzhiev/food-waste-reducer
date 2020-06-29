export class FoodCategory {
  static nextId = 0;
  id = ++FoodCategory.nextId;
  constructor(public name: string, public restaurants: number, public imageURL: string) {}
}
