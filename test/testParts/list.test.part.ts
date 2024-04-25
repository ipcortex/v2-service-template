import { expect } from 'chai';
import request from 'supertest';
import { app } from '../../src/app';

describe('Testing List Templates', () => {
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
});