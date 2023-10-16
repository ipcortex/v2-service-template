/* eslint-disable */
import express, { Express, json } from "express";
import "express-async-errors";
import cors from "cors";
import {
  Logger,
  handleError,
  type CommonRoutesConfig,
} from "@ipcortex/commons";
import { ServiceRoutes } from "./routes/ServiceRoutes";

const app: Express = express();

const logger = Logger("service-template-v2:app.ts");

const routes: CommonRoutesConfig[] = [];

app.use(json());
app.use(cors());

try {
  app.get("/", (req, res) => {
    res.status(200).send("Service template is alive!");
  });

  routes.push(new ServiceRoutes(app));
} catch (err) {
  logger.error({
    message: "Server error",
    error: err,
  });
}

app.use(handleError);

export { app };
