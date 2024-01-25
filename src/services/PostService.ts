//Mongo Module for handling all CRUD operations
import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";
export class PostService {
  private collection: any;

  constructor(collection: any) {
    this.collection = collection;
  }
  //*CREATE*
  async createPost(data: any) {
    try {
      const newPost = await this.collection.insertOne(data);
      return console.log("New Post Created!", newPost);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  //*READ*
  async getAllPost() {
    try {
      const posts = await this.collection.find({}).toArray();
      return console.log("Found all posts:", posts);
    } catch (error) {
      console.error(error);
    }
  }
  //*READ*
  //Find the Post Using _ObjectId
  async getPost(id: string) {
    try {
      const post = await this.collection.findOne({ _id: new ObjectId(id) });
      if (!post) {
        return console.log("Post not found!", post);
      }
      return console.log("Found post:", post);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  //*UPDATE*
  //find a matching document, updates it according to the update arg, passing any options, and returns the found document (if any) to the callback.
  async updatePost(id: string, data: any) {
    try {
      console.log("Updating post with id:", id);
      console.log("Data:", data);

      const updatePost = await this.collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: data },
        { returnOriginal: false } //vraceni puvodniho dokumentu
      );
      if (!updatePost) {
        return console.log("Cannot edit post");
      }

      console.log("Updated Post:", updatePost);
      return updatePost;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  //*DELETE*
  async deletePost(id: string) {
    try {
      const deletePost = await this.collection.findOneAndDelete({
        _id: new ObjectId(id),
      });
      if (!deletePost || !deletePost.value) {
        return console.log("Post not found.");
      }
      console.log("Post deleted.");
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
////Moved to main.ts export const PostServices = new CRUDService()
