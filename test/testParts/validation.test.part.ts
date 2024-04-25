import request from 'supertest';
import { app } from '../../src/app';
import { template1 } from '../testingData/TemplatesData';
import { createDeepCopy } from '../testingHelpers/createDeepCopy';

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