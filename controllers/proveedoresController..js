export class ProveedoresController {
    constructor ({ proveedoresModel }) {
        this.proveedoresModel = proveedoresModel
    }

    createProveedor = async (req, res) => {
        try {
            const { nombre_proveedor, telefono, email, direccion } = req.body
            console.log("Datos recibidos para crear proveedor", {
                nombre_proveedor,
                telefono,
                email,
                direccion,
            })

            const newProveedor = await this.proveedoresModel.createProveedor({
                nombre_proveedor,
                telefono,
                email,
                direccion,
            })

            res.status(201).json(newProveedor)
        } catch (error) {
            console.error("Error al crear el proveedor: ", error)
            res.status(500).json({ error: error.message })
        }
    }

    getProveedores = async (req, res) => {
        try {
            const proveedores = await this.proveedoresModel.getProveedores()
            res.status(200).json(proveedores)
        } catch (error) {
            console.error("Error al obtener los proveedores: ", error)
            res.status(500).json({ error: error.message })
        }
    }
    getProveedoresById = async (req, res) => {
        try {
            const { proveedorId } = req.params
            const proveedores = await this.proveedoresModel.getProveedoresById({ proveedorId })
            res.status(200).json(proveedores)
        } catch (error) {
            if (error.message === "Proveedor no encontrado") {
                res.status(404).json({ error: error.message });
              } else {
                res.status(500).json({ error: "Internal server error" });
              }
        }
    }

    updateProveedor = async (req, res) => {
        try {
            const { proveedorId } = req.params
            const { nombre_proveedor, telefono, email, direccion } = req.body
            const updatedProveedor = await this.proveedoresModel.updateProveedor({
                proveedorId,
                nombre_proveedor,
                telefono,
                email,
                direccion,
            })

            res.status(200).json(updatedProveedor)
        } catch (error) {
            if (error.message === "Proveedor no encontrado") {
                res.status(404).json({ error: error.message });
              } else {
                res.status(500).json({ error: "Internal server error" });
              }
        }
    }

    deleteProveedor = async (req, res) => {
        try {
            const { proveedorId } = req.params
            const deletedProveedor = await this.proveedoresModel.deleteProveedor({ proveedorId })
            res.status(200).json(deletedProveedor)
        } catch (error) {
            if (error.message === "Proveedor no encontrado") {
                res.status(404).json({ error: error.message });
              } else {
                res.status(500).json({ error: "Internal server error" });
              }
        }
    }
}