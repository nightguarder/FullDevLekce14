import { UserService } from "../services/UserService";
import { Request, Response } from "express";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  // ... CRUD methods similar to PostController ...
}
