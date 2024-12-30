import { Router } from "express";
import { ProveedoresController } from "../controllers/proveedoresController..js";

export const createProveedoresRouter = ({ proveedoresModel }) => {
    const router = Router();
    const proveedoresController = new ProveedoresController({ proveedoresModel });

    router.post("/proveedor", proveedoresController.createProveedor);
    router.get("/proveedores", proveedoresController.getProveedores);
    router.get("/proveedores/:proveedorId", proveedoresController.getProveedoresById);
    router.patch("/proveedores/:proveedorId", proveedoresController.updateProveedor);
    router.delete("/proveedores/:proveedorId", proveedoresController.deleteProveedor);

    return router;
}