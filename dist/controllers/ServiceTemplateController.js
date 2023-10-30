"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceTemplateController = void 0;
const commons_1 = require("@ipcortex/commons");
const ServiceModel_1 = require("../model/ServiceModel");
class ServiceTemplateController {
    constructor() {
        this.logger = (0, commons_1.Logger)("service-template-v2:ServiceTemplateController.ts");
        this.helloWorld = (_, res) => {
            this.logger.info(`Responding with 'Hello world'`);
            res.status(200).send("Hello world!");
        };
        this.serviceModel = new ServiceModel_1.ServiceModel();
    }
}
exports.ServiceTemplateController = ServiceTemplateController;
