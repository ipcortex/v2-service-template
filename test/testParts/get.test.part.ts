import { expect } from 'chai';
import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import { app } from '../../src/app';
import { template2 } from '../testingData/TemplatesData';
import { createTestingTemplate } from '../testingHelpers/createTestingTemplate';
import { createdTemplates } from '../testingHelpers/cleanup';
import { cleanup } from '../testingHelpers/cleanup';

describe('Testing Get Templates', () => {
    after(async () => {
        await cleanup();
    });

    it('getTemplate -- should return an template', async () => {
        const addedTemplate = await createTestingTemplate(template2);

        createdTemplates.push(addedTemplate.id);

        const { body } = await request(app)
            .get(`/templates/${addedTemplate.id}`)
            .send()
            .expect(200);

        expect(body.name).to.equal('Template 2');
    });

    it('getTemplate -- should return 404 "Not Found"', async () => {
        const nonExistentId = uuidv4();

        await request(app)
            .get(`/templates/${nonExistentId}`)
            .send()
            .expect(404);
    });
});