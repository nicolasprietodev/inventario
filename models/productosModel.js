import pool from '../connection/pool.js'


export class ProductosModel {

    static async createProducto({ nombre_producto, descripcion, precio, cantidad, idCategoria, idProveedor, }) {
        const connection = await pool.getConnection();

        console.log({
            "Datos recibidos": {
                nombre_producto,
                descripcion,
                precio,
                cantidad,
                idCategoria,
                idProveedor,
            },
        });

        try {


            const [result] = await connection.query(
                `
                INSERT INTO
                        productos (nombre_producto, descripcion, precio, cantidad, id_categoria, id_proveedor)
                VALUES
                        (?, ?, ?, ?, ?, ?)
                `,
                [nombre_producto, descripcion, precio, cantidad, idCategoria, idProveedor]
            );

            return {
                id: result.insertId,
                nombre_producto,
                descripcion,
                precio,
                cantidad,
                idCategoria,
                idProveedor
            };
        } catch (error) {
            console.error("Error al crear producto", error);
            throw error;
        }
    }
}