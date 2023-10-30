import { ServiceTemplateController } from './../../src/controllers/ServiceTemplateController';
import { expect } from 'chai';

describe('helloWorld', () => {
  let controller: ServiceTemplateController;

  before(() => {
    controller = new ServiceTemplateController();
  });

  it('should respond with Hello world', () => {
    const helloWorld = controller.helloWorld();

    expect(helloWorld).to.equal('Hello world');
  });
});
