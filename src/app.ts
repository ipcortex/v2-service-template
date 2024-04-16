/* eslint-disable */
import express, { Express, json } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import cors from 'cors';
import { Logger, handleError } from '@ipcortex/commons';
import { TemplateRoutes } from './routes/TemplateRoutes';

const app: Express = express();

const logger = Logger('templates-service-v2:app.ts');

app.use(json());
app.use(cors());

try {

    app.get('/templates/health', (req, res) => {
        res.status(200).send('Templates service is alive!');
    });
    new TemplateRoutes(app);

} catch (err) {
    logger.error({
        message: 'Server error',
        error: err
    });
}

app.use(handleError());

export { app };