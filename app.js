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

    const { loginRouter, userRouter, categoriaRouter, proveedoresRouter, productosRouter, movimientosRouter } = createRouters(models);

    app.use('/v1', loginRouter);
    app.use('/v1', userRouter);
    app.use('/v1', categoriaRouter);
    app.use('/v1', proveedoresRouter);
    app.use('/v1', productosRouter);
    app.use('/v1', movimientosRouter);

    return app;
}