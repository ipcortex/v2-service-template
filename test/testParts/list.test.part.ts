import { expect } from 'chai';
import request from 'supertest';
import { app } from '../../src/app';
import { createTestingTemplate } from '../testingHelpers/createTestingTemplate';
import { cleanup } from '../testingHelpers/cleanup';
import { template1, template2 } from '../testingData/TemplatesData';

describe('Testing List Templates', () => {
    after(async () => {
        await cleanup();
    });

    it('listTemplates -- should return a list of templates', async () => {
        await createTestingTemplate(template1);
        await createTestingTemplate(template2);

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
});