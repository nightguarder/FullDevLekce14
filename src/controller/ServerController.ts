import express from "express";
import pino from "pino";

//Use pino logger to display the healthcheck message.
export default class ServerController {
  private logger: pino.Logger;
  private router: express.Router;

  constructor(logger: any) {
    this.logger = logger;
    this.router = express.Router();

    this.router.get("/", (req, res) => {
      const status = {
        status: "healthy",
      };
      this.logger.debug(status, "healthcheck");

      res.send(status);
    });
  }
}
