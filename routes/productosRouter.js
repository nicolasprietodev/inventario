import { Router } from 'express';
import { ProductosController } from '../controllers/productosController.js';

export const createProductosRouter = ({ productosModel }) => {
    const router = Router();
    const productosController = new ProductosController({ productosModel });

    router.post("/producto", productosController.createProducto);

    return router;
}