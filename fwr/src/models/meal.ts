export class Meal {
  static nextId = 0;
  id = ++Meal.nextId;

  constructor(
    public name: string,
    public imageURL: string,
    public foodCategory: string,
    public description: string,
    public price: number,
    public menuId: number
  ) {}
}
