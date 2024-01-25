import { ObjectId } from "mongodb";

export class UserService {
  private collection: any;

  constructor(collection: any) {
    this.collection = collection;
  }

  // ... CRUD methods similar to PostService ...
}
