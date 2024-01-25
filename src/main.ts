//Dependencies
import express from "express";
import helmet from "helmet";
import cors from "cors";
import pino from "pino";
import pinoHttp from "pino-http";
//Mongo API
import { MongoConnect } from "./services/MongoConnect";
//Middleware
import errorHandler from "./middleware/exceptions";
//Services
import { PostService } from "./services/PostService";
//Controllers
import { PostController } from "./controller/PostController";
//Server Router
import { PostRouter } from "./routes/routes";

//Dotenv
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1";
const URI = process.env.MONGO_URI || "mongo://";
const DBNAME = process.env.DB_NAME || "database";

//Main function...
async function run() {
  //Express config
  const app = express();
  app.use(express.json());
  app.use(helmet());
  app.use(cors());

  //Logger conf
  const loggerConf = pino({
    level: process.env.NODE_ENV === "development" ? "debug" : "info",
    transport: {
      targets: [
        {
          target: "pino-pretty",
        },
        {
          target: "pino/file",
          options: {
            destination: "logs/app.log",
          },
        },
        {
          level: "error",
          target: "pino/file",
          options: {
            destination: "logs/app-error.log",
          },
        },
      ],
    },
  });
  //Starting the app
  try {
    const pinoLogger = pinoHttp(loggerConf);

    app.use(pinoLogger);

    const mongoConnection = new MongoConnect(URI, DBNAME);
    await mongoConnection.connectDB();
    console.log("Succesfully connected to MongoDB!");
    console.log("Using database:", DBNAME);

    const postCollection = mongoConnection.getCollection("posts");
    //Services & Controller
    const PostServices = new PostService(postCollection);
    const postController = new PostController(PostServices);

    //Routing
    const postRouter = await PostRouter(postController);
    app.use("/api/v1/posts", postRouter);
  } catch (error) {
    console.error(
      "Starting the server failed. Problem with configuration occured.",
      error
    );
    process.exit(1); //Exiting now
  }

  //Services & Controller

  app.listen(PORT, () => {
    console.log(`Server is running on port http://${HOST}:${PORT}.`);
  });

  //Middleware
  app.use(errorHandler);
}

run();
