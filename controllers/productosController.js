
export class ProductosController {

    constructor ({ productosModel }) {
        this.productosModel = productosModel;
    }

    createProducto = async (req, res) => {
        try {
            const { nombre_producto, descripcion, precio, cantidad, idCategoria, idProveedor } = req.body;

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
    }
}