"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const commons_1 = require("@ipcortex/commons");
const ServiceTemplateConfig_1 = require("./config/ServiceTemplateConfig");
const logger = (0, commons_1.Logger)("service-template-v2:server.ts");
const port = ServiceTemplateConfig_1.config.PORT;
try {
    app_1.app.listen(port, () => {
        logger.info(`Server is running at http://localhost:${port}`);
    });
}
catch (err) {
    logger.error({
        message: "Could not start server",
        error: err,
    });
}
