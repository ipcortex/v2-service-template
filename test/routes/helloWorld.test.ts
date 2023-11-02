import { isValidUUID } from './../../src/lib/uuid';
import { expect } from 'chai';
import { ServiceTemplateController } from '../../src/controllers/ServiceTemplateController';
import request from 'supertest';
import { app } from '../../src/app';

describe('helloWorld', () => {
  let controller: ServiceTemplateController;

  before(() => {
    controller = new ServiceTemplateController();
  });

  it('should respond with Hello world', () => {
    const helloWorld = controller.getHelloWorld();

    expect(helloWorld).to.equal('Hello world');
  });

  it('should store a given name to the database with a UUID and respond with 201', async () => {
    const helloWorldRequest = { name: 'some name' };

    const { body } = await request(app)
      .post('/helloWorld')
      .send(helloWorldRequest)
      .expect(201);

    expect(body.data.name).to.equal('some name');
    expect(isValidUUID(body.data.id)).to.equal(true);
  });
});
