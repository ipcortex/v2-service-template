import { ServiceTemplateController } from "./../../src/controllers/ServiceTemplateController";
import { expect } from "chai";
// import { Request, Response } from "express";
// import { Logger } from "@ipcortex/commons";
// import { Logger as LoggerType } from "winston";

describe("helloWorld", () => {
  let controller: ServiceTemplateController;
  //   let mockResponse: Partial<Response>;
  //   let mockRequest: Partial<Request>;
  //   let logger: LoggerType;

  before(() => {
    controller = new ServiceTemplateController();
    // logger = Logger("service-template-v2:ServiceTemplateController.ts");
  });

  it("should respond with 'Hello world'", () => {
    // Mock the logger to capture log messages (you may need to adjust this)
    // const originalLog = logger.info;
    // const loggedMessages: string[] = [];
    // logger.info = (message: string) => {
    //   loggedMessages.push(message);
    // };

    // mockResponse = {
    //   status: (code: number) => {
    //     return mockResponse;
    //   },
    //   send: (data: any) => {
    //     return data;
    //   },
    // } as Partial<Response>;

    const helloWorld = controller.helloWorld();

    console.log("------- OVER HERE -------");
    console.log(helloWorld);
    // console.log(mockResponse);

    // controller.helloWorld(mockRequest as Request, mockResponse as Response);

    expect(helloWorld).to.equal("Hello world");
    // expect(loggedMessages).to.deep.include("Responding with 'Hello world'");

    // Restore the original logger function
    // logger.info = originalLog;
  });
});
