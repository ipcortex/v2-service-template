import { expect } from 'chai';
import request from 'supertest';
import { app } from '../../src/app';
import { template1, template2 } from '../testingData/TemplatesData';
import { createDeepCopy } from '../testingHelpers/createDeepCopy';
import { createdTemplates } from '../testingHelpers/cleanup';
import { cleanup } from '../testingHelpers/cleanup';

describe('Testing Add Templates', () => {
    after(async () => {
        await cleanup();
    });

    it('addTemplate -- should add a template and return the added template', async () => {
        const postRequestData = template1;

        const { body } = await request(app)
            .post('/templates')
            .send(postRequestData)
            .expect(201);

        createdTemplates.push(body.id);
    
        expect(body.name).to.equal('Template 1');
    });

    it('addTemplate -- broken data -- should return 400 "Bad Request" ', async () => {
        const postRequestData = createDeepCopy(template2);
        // non existent id
        postRequestData.parentId = "03b0320c-9344-4f63-a041-1501b9f052c7";

        await request(app)
            .post('/templates')
            .send(postRequestData)
            .expect(400);
    });
});