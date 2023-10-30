"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceTemplateRoutes = void 0;
const commons_1 = require("@ipcortex/commons");
const ServiceTemplateController_1 = require("../controllers/ServiceTemplateController");
class ServiceTemplateRoutes extends commons_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "ServiceTemplateRoutes");
    }
    // 1. get helloworld. Returns 'helloworld' as a string
    // 2. post helloworld. Expects a name...saves this name to the database with an id.
    // responds with the appropriate status code for 'created'
    // 3. get helloworld/id. Returns 'helloworld' + name associated with this id
    // 4. post helloworld/id. Updates the name associated with the given id in the database.
    // In order to carry out the above requests, you will need to edit the DAOs, model and controller.
    // You will need to delete and redo the UpsertDTO
    // You will also need to create a prismaschema for the database
    // update the docs to be in line with these end points you are creating
    // make each request a pull request. Take one by one
    configureRoutes() {
        const serviceTemplateController = new ServiceTemplateController_1.ServiceTemplateController();
        // below are some examples of route handlers
        this.app.route("/helloworld").get(serviceTemplateController.helloWorld);
        /*
            this.app
                .route('/endpoints')
                .post(
                    validateRequest(UpsertDTO),
                    serviceController.upsert
                );
    
            this.app.route('/endpoints/:enpointId')
                .get(
                    serviceController.get
            );
            */
        return this.app;
    }
}
exports.ServiceTemplateRoutes = ServiceTemplateRoutes;
