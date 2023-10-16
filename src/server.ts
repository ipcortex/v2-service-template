import { app } from "./app";
import { Logger } from "@ipcortex/commons";
import { config } from "./config/ServiceConfig";

const logger = Logger("service-template-v2:server.ts");
const port = config.PORT;

try {
  app.listen(port, () => {
    logger.info(`Server is running at http://localhost:${port}`);
  });
} catch (err) {
  logger.error({
    message: "Could not start server",
    error: err,
  });
}
