import { Router } from "express";
import { AppError } from "../model/errors";
import { UserRepository, MealRepository } from "../dao/mongo-repository";
import { ObjectId } from "mongodb";
// import { Meal } from './../../../client/src/models/meal';

const router = Router();

router.get("/", (req, res, next) =>
  (<MealRepository>req.app.locals.mealRepo)
    .findAll()
    .then((meals) => res.json(meals))
    .catch(next)
);

router.get("/allMeals/:id", async (req, res, next) => {
  try {
    const found = await (<MealRepository>req.app.locals.mealRepo).findById(req.params.id);
    res.json(found); //200 OK with deleted post in the body
  } catch (err) {
    next(err);
  }
});

router.get("/:restaurantId", async (req, res, next) => {
  try {
    const found = await (<MealRepository>req.app.locals.mealRepo).findByRestaurantId(req.params.restaurantId);
    res.json(found); //200 OK with deleted post in the body
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newMeal = req.body;
    //TODO set correct author
    // const defaultUser = await (<UserRepository>req.app.locals.userRepo).findByUsername("trayan");
    // newMeal.authorId = defaultUser._id;

    // Create new meal
    const created = await (<MealRepository>req.app.locals.mealRepo).add(newMeal);

    res.status(201).location(`/api/meals/${newMeal.id}`).json(created);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async function (req, res, next) {
  try {
    const mealId = req.params.id;
    const meal = req.body;
    if (mealId !== meal._id) {
      next(new AppError(400, `IDs in the URL and message body are different.`));
      return;
    }
    const found = await (<MealRepository>req.app.locals.mealRepo).findById(req.params.id);

    // if(meal.authorId && meal.authorId.length > 0 && found.authorId !== meal.authorId) {
    //     throw new AppError(400, `Can not change Post's author.`);
    // }

    // _id and authorId are unmodifiable
    meal._id = found._id;
    // meal.authorId =  found.authorId;
    const updated = await (<MealRepository>req.app.locals.mealRepo).edit(meal);
    res.json(updated); //200 OK with post in the body
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    const mealId = req.params.id;
    const deleted = await (<MealRepository>req.app.locals.mealRepo).deleteById(mealId);
    res.json(deleted); //200 OK with deleted post in the body
  } catch (err) {
    next(err);
  }
});

export default router;
