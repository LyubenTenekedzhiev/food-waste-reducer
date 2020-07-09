import { Router } from "express";
import { AppError } from "../model/errors";
import { UserRepository } from "../dao/mongo-repository";
import { ObjectId } from "mongodb";
// import { User } from './../../../client/src/models/user';

const router = Router();

router.get("/", (req, res, next) =>
  (<UserRepository>req.app.locals.userRepo)
    .findAll()
    .then((users) => res.json(users))
    .catch(next)
);

// router.get("/:id", async (req, res, next) => {
//   try {
//     const found = await (<UserRepository>req.app.locals.userRepo).findById(req.params.id);
//     res.json(found); //200 OK with deleted post in the body
//   } catch (err) {
//     next(err);
//   }
// });

router.get("/:role", async (req, res, next) => {
  try {
    const found = await (<UserRepository>req.app.locals.userRepo).findByRole(+req.params.role);
    res.json(found); //200 OK with deleted post in the body
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newUser = req.body;
    //TODO set correct author
    // const defaultUser = await (<UserRepository>req.app.locals.userRepo).findByUsername("trayan");
    // newUser.authorId = defaultUser._id;

    // Create new user
    const created = await (<UserRepository>req.app.locals.userRepo).add(newUser);

    res.status(201).location(`/api/users/${newUser.id}`).json(created);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async function (req, res, next) {
  try {
    const userId = req.params.id;
    const user = req.body;
    if (userId !== user._id) {
      next(new AppError(400, `IDs in the URL and message body are different.`));
      return;
    }
    const found = await (<UserRepository>req.app.locals.userRepo).findById(req.params.id);

    // if(user.authorId && user.authorId.length > 0 && found.authorId !== user.authorId) {
    //     throw new AppError(400, `Can not change Post's author.`);
    // }

    // _id and authorId are unmodifiable
    user._id = found._id;
    // user.authorId =  found.authorId;
    const updated = await (<UserRepository>req.app.locals.userRepo).edit(user);
    res.json(updated); //200 OK with post in the body
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    const userId = req.params.id;
    const deleted = await (<UserRepository>req.app.locals.userRepo).deleteById(userId);
    res.json(deleted); //200 OK with deleted post in the body
  } catch (err) {
    next(err);
  }
});

export default router;
