import { Router } from 'express';
import { ProductosController } from '../controllers/productosController.js';

export const createProductosRouter = ({ productosModel }) => {
    const router = Router();
    const productosController = new ProductosController({ productosModel });

    router.post("/producto", productosController.createProducto);
    router.get("/productos", productosController.getProductos);
    router.get("/productos/:productoId", productosController.getProductosById);
    router.patch("/productos/:productoId", productosController.updateProducto);
    router.delete("/productos/:productoId", productosController.deleteProducto);

    return router;
}