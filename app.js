import express, { json } from 'express';
import { corsMiddleware } from './middlewares/corsMiddleware.js';
import { createRouters } from './routes/index.js';
import cookieParser from 'cookie-parser';

export const createApp =   (models) => {
    const app = express();

    app.use(corsMiddleware());
    app.disable('x-powered-by');
    app.use(json());
    app.use(cookieParser());

    const { loginRouter } = createRouters(models);

    app.use('/v1', loginRouter);

    return app;
}