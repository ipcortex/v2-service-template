import { expect } from 'chai';
import request from 'supertest';
import { app } from '../../src/app';
import { template2 } from '../testingData/TemplatesData';
import { createdTemplates } from '../testingHelpers/cleanup';
import { createDeepCopy } from '../testingHelpers/createDeepCopy';
import { createTestingTemplate } from '../testingHelpers/createTestingTemplate';

describe('Testing Update Template', () => {
    it('updateTemplate -- should update an template and return the updated template', async () => {
        const addedTemplate = await createTestingTemplate(template2);

        createdTemplates.push(addedTemplate.id);

        const updatedTemplate = createDeepCopy(addedTemplate);
        updatedTemplate.name = 'Template 2 updated';

        const { body: updatedBody } = await request(app)
            .post(`/templates/${addedTemplate.id}`)
            .send(updatedTemplate)
            .expect(200);

        expect(updatedBody.name).to.equal('Template 2 updated');
    });

    it('updateTemplate -- should return 404 "Not Found"', async () => {
        const nonExistentId = "2f96cab2-475d-475d-8699-38afe2b6623a";

        const updatedTemplate = createDeepCopy(template2);
        updatedTemplate.id = nonExistentId;
        
        await request(app)
            .post(`/templates/${nonExistentId}`)
            .send(updatedTemplate)
            .expect(404);
    });
});