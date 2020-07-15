import { Router } from "express";
import { AppError } from "../model/errors";
import {  FoodCategoryRepository } from "../dao/mongo-repository";

const router = Router();

router.get("/", (req, res, next) =>
  (<FoodCategoryRepository>req.app.locals.foodCategoryRepo)
    .findAll()
    .then((foodCategorys) => res.json(foodCategorys))
    .catch(next)
);

router.get("/:id", async (req, res, next) => {
  try {
    const found = await (<FoodCategoryRepository>req.app.locals.foodCategoryRepo).findById(req.params.id);
    res.json(found); //200 OK with deleted post in the body
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newFoodCategory = req.body;
    const created = await (<FoodCategoryRepository>req.app.locals.foodCategoryRepo).add(newFoodCategory);

    res.status(201).location(`/api/foodCategorys/${newFoodCategory.id}`).json(created);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async function (req, res, next) {
  try {
    const foodCategoryId = req.params.id;
    const foodCategory = req.body;
    if (foodCategoryId !== foodCategory._id) {
      next(new AppError(400, `IDs in the URL and message body are different.`));
      return;
    }
    const found = await (<FoodCategoryRepository>req.app.locals.foodCategoryRepo).findById(req.params.id);

    // _id and authorId are unmodifiable
    foodCategory._id = found._id;
    // foodCategory.authorId =  found.authorId;
    const updated = await (<FoodCategoryRepository>req.app.locals.foodCategoryRepo).edit(foodCategory);
    res.json(updated); //200 OK with post in the body
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    const foodCategoryId = req.params.id;
    const deleted = await (<FoodCategoryRepository>req.app.locals.foodCategoryRepo).deleteById(foodCategoryId);
    res.json(deleted); //200 OK with deleted post in the body
  } catch (err) {
    next(err);
  }
});

export default router;
