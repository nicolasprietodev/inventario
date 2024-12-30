export class CategoriaController {
  constructor({ categoriaModel }) {
    this.categoriaModel = categoriaModel;
  }

  createCategoria = async (req, res) => {
    try {
      const { nombre_categoria, descripcion } = req.body;
      console.log("Datos recibidos para crear categoria", {
        nombre_categoria,
        descripcion,
      });

      const newCategoria = await this.categoriaModel.createCategoria({
        nombre_categoria,
        descripcion,
      });

      res.status(201).json(newCategoria);
    } catch (error) {
      console.error("Error al crear la categoria: ", error);
      res.status(500).json({ error: error.message });
    }
  };

  getCategorias = async (req, res) => {
    try {
      const categorias = await this.categoriaModel.getCategorias();
      res.status(200).json(categorias);
    } catch (error) {
      console.error("Error al obtener categorias: ", error);
      res.status(500).json({ error: error.message });
    }
  };

  getCategoriaById = async (req, res) => {
    try {
      const { categoriaId } = req.params;
      const categoria = await this.categoriaModel.getCategoriaById({
        categoriaId,
      });
      res.status(200).json(categoria);
    } catch (error) {
      if (error.message === "Categoria no encontrada") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  };

  updateCategoria = async (req, res) => {
    try {
      const { categoriaId } = req.params;
      const { nombre_categoria, descripcion } = req.body;
      const updatedCategoria = await this.categoriaModel.updateCategoria({
        categoriaId,
        nombre_categoria,
        descripcion,
      });
      res.status(200).json(updatedCategoria);
    } catch (error) {
      if (error.message === "Categoria no encontrada") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  };

  deleteCategoria = async (req, res) => {
    try {
      const { categoriaId } = req.params;
      const deletedCategoria = await this.categoriaModel.deleteCategoria({
        categoriaId,
      });
      res.status(200).json(deletedCategoria);
    } catch (error) {
      if (error.message === "Categoria no encontrada") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }
}
