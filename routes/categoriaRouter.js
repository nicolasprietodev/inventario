import { Router } from "express";
import { CategoriaController } from "../controllers/categoriaController.js";

export const createCategoriaRouter = ({ categoriaModel }) => {
    const router = Router();
    const categoriaController = new CategoriaController({ categoriaModel });

    router.post("/categoria", categoriaController.createCategoria);
    router.get("/categorias", categoriaController.getCategorias);
    router.get("/categorias/:categoriaId", categoriaController.getCategoriaById);
    router.patch("/categorias/:categoriaId", categoriaController.updateCategoria);
    router.delete("/categorias/:categoriaId", categoriaController.deleteCategoria);

    return router;
}