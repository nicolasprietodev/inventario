export class ProductosController {
  constructor({ productosModel }) {
    this.productosModel = productosModel;
  }

  createProducto = async (req, res) => {
    try {
      const {
        nombre_producto,
        descripcion,
        precio,
        cantidad,
        idCategoria,
        idProveedor,
      } = req.body;

      const producto = await this.productosModel.createProducto({
        nombre_producto,
        descripcion,
        precio,
        cantidad,
        idCategoria,
        idProveedor,
      });

      res.status(201).json(producto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getProductos = async (req, res) => {
    try {
      const productos = await this.productosModel.getProductos();
      res.status(200).json(productos);
    } catch (error) {
      console.error("Error al obtener los productos: ", error);
      res.status(500).json({ error: error.message });
    }
  };

  getProductosById = async (req, res) => {
    try {
      const { productoId } = req.params;
      const producto = await this.productosModel.getProductosById({
        productoId,
      });
      res.status(200).json(producto);
    } catch (error) {
      if (error.message === "Producto no encontrado") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  };

  updateProducto = async (req, res) => {
    try {
      const { productoId } = req.params;
      const {
        nombre_producto,
        descripcion,
        precio,
        cantidad,
        idCategoria,
        idProveedor,
      } = req.body;

      console.log({
        "Datos recibidos": {
          productoId,
          nombre_producto,
          descripcion,
          precio,
          cantidad,
          idCategoria,
          idProveedor,
        },
      });

      const updatedProducto = await this.productosModel.updateProducto({
        productoId,
        nombre_producto,
        descripcion,
        precio,
        cantidad,
        idCategoria,
        idProveedor,
      });

      res.status(200).json(updatedProducto);
    } catch (error) {
      if (error.message === "Producto no encontrado") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  };

  deleteProducto = async (req, res) => {
    try {
      const { productoId } = req.params;
      const deleteProducto = await this.productosModel.deleteProducto({
        productoId,
      });
      res.status(200).json(deleteProducto);
    } catch (error) {
      if (error.message === "Producto no encontrado") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  };
}
