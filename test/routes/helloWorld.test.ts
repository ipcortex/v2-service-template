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

  it('should return a name based on a specific id', async () => {
    const postRequestExample = { name: 'some specific name' };

    const { body: createdBody } = await request(app)
      .post('/helloWorld')
      .send(postRequestExample);

    const { body: getBody } = await request(app).get(
      `/helloWorld/${createdBody.data.id}`,
    );

    expect(getBody.data.name).to.equal('some specific name');
  });

  it('should update an existing name based on a specific id', async () => {
    const postRequestExample = { name: 'update me please' };

    const { body: createdBody } = await request(app)
      .post('/helloWorld')
      .send(postRequestExample);

    const updatedName = { name: 'updated name' };

    await request(app)
      .patch(`/helloWorld/${createdBody.data.id}`)
      .send(updatedName);

    const { body: getBody } = await request(app).get(
      `/helloWorld/${createdBody.data.id}`,
    );

    expect(getBody.data.name).to.equal('updated name');
  });
});
