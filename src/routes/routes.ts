import express from "express";

import { PostController } from "../controller/PostController";
import { UserController } from "../controller/UserController";

//Router musi byt Assynchroni jinak  at __awaiter (/Users/cyrils/Developer/Projects/RobotDreams/FullDevLekce12/src/controller/PostController.ts:4:12)

////Pro pouziti vytvor instanci v main.ts..
//Router pro PostController
export async function PostRouter(controller: PostController) {
  const router = express.Router();

  //add new post
  router.post("/", controller.createPost);

  //get All posts
  router.get("/", controller.getAllPost);

  //get single post
  router.get("/:id", controller.getPost);

  //update
  router.put("/:id", controller.updatePost);

  //delete
  router.delete("/:id", controller.deletePost);

  return router;
}
export async function UserRouter(controller: UserController) {
  //Routing pro Create User, Delete User atd.
}
