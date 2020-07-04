export class Restaurant {
  static nextId = 0;
  id = ++Restaurant.nextId;

  constructor(public name: string, public menuId: number, public imageURL: string) {}
}