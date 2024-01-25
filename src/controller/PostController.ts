import { PostService } from "../services/PostService";
import { Request, Response } from "express";
import { PostschemaValidate } from "../api/postSchema";
import { Date } from "mongoose";
import { date } from "joi";

// TO use this controller create new instances in your main Express file..
//const postServices = new CRUDService();
//const postController = new CRUDController(postServices);

//TODO: Metody teto tridy budou automaticky vázat this na instance v kazde metode
//Controller + Router
export class PostController {
  private postServices: PostService;

  constructor(postServices: PostService) {
    this.postServices = postServices;
    this.createPost = this.createPost.bind(this);
    this.getAllPost = this.getAllPost.bind(this);
    this.getPost = this.getPost.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    //Timto omezime ze kontext 'this' uvnitr metod getAllPost,create... bude vzdy ukazovat na Service kterou potrebujeme.
    //Pravdepodobne neni idealnim resenim, ale funguje.
  }

  //*CREATE*
  async createPost(req: Request, res: Response) {
    try {
      //Extract data from the request body
      const data = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        published: req.body.published,
        createdAt: new Date().toISOString(), //Odpovida validaci v Joi schema
      };

      //Validation with Joi Schema
      const { error, value } = PostschemaValidate.validate(data);

      if (error) {
        return res.status(400).send(error.message);
      }

      //Finally call the postService to create new post with data
      const post = await this.postServices.createPost(value);
      res.status(201).send(post);
    } catch (error) {
      console.error("Error when creating new post.", error);
      return res.status(500);
    }
  }
  async getAllPost(req: Request, res: Response) {
    try {
      const allPosts = await this.postServices.getAllPost();
      res.send(allPosts);
    } catch (error) {
      console.error("Unknown error.", error);
      return res.status(500);
    }
  }
  //*READ
  //Vratit pouzze jeden post s _id
  async getPost(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const onePost = await this.postServices.getPost(id);
      res.send(onePost);
    } catch (error) {
      console.error("Post not found..", error);
      return res.status(500);
    }
  }
  //*UPDATE
  async updatePost(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const data = req.body; ////BUG:Ziskat data z body ne params...
      const updatePost = await this.postServices.updatePost(id, data);

      res.send(updatePost);
    } catch (error) {
      console.error("Error when updating post.", error);
      return res.status(500);
    }
  }
  //*DELETE
  async deletePost(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await this.postServices.deletePost(id);
      res.status(200).send("Post deleted succesfully.");
    } catch (error) {
      console.error("Uh oh! Unknown error.", error);
      return res.status(500);
    }
  }
}
