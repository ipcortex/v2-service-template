/* eslint-disable */
import express, { Express, json } from "express";
import "express-async-errors";
import cors from "cors";
import { Logger, handleError } from "@ipcortex/commons";
import { ServiceTemplateRoutes } from "./routes/ServiceTemplateRoutes";

const app: Express = express();

const logger = Logger("service-template-v2:app.ts");

app.use(json());
app.use(cors());

try {
  app.get("/", (req, res) => {
    res.status(200).send("Service template is alive!");
  });

  new ServiceTemplateRoutes(app);
} catch (err) {
  logger.error({
    message: "Server error",
    error: err,
  });
}

app.use(handleError);

export { app };
