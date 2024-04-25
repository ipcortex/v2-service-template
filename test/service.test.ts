import { expect } from 'chai';
import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import { app } from '../src/app';
import { template1, template2 } from './testingData/TemplatesData';
import { createDeepCopy } from './testingHelpers/createDeepCopy';
import { disconnectPrisma } from './testingHelpers/dbConnection';
import { createTestingTemplate } from './testingHelpers/createTestingTemplate';
import { deleteTemplates } from './testingHelpers/deleteTemplates';


describe('Templates Service', () => {
    const createdTemplates: string[] = [];

    after(async () => {
        await deleteTemplates(createdTemplates);
        disconnectPrisma();
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

    it('listTemplates -- should return a list of templates', async () => {
        const { body } = await request(app)
            .get(`/templates`)
            .send({pageSize: 100})
            .expect(200);

        expect(body).to.have.property('templates').to.be.an('array');
        expect(body).to.have.property('resultCount').to.be.a('number');
        expect(body).to.have.property('pagesAvailable').to.be.a('number');
        expect(body.templates.length).to.be.greaterThanOrEqual(body.resultCount);
    });

    it('listTemplates -- should return 404 "Not Found"', async () => {
        await request(app)
            .get(`/templates`)
            .send({
                // page not available
                page: 999999,
                pageSize: 100
            })
            .expect(404);
    });

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

    it('addTemplate -- broken data -- should return 400 "Bad Request" ', async () => {
        const postRequestData = createDeepCopy(template2);
        // non existent id
        postRequestData.parentId = "03b0320c-9344-4f63-a041-1501b9f052c7";

        await request(app)
            .post('/templates')
            .send(postRequestData)
            .expect(400);
    });

    describe('Testing Validation', () => {
        const requiredFieldsTemplate = [
            'parentId',
            'type',
            'name'
        ];

        requiredFieldsTemplate.forEach((field) => {
            it(`should return 400 "Bad Request" for missing field ${field}`, async () => {
                const clonedTemplate = createDeepCopy(template1);
                eval('delete clonedTemplate.'+field);
                await request(app)
                    .post('/templates')
                    .send(clonedTemplate)
                    .expect(400);
            });
        });
    });
});