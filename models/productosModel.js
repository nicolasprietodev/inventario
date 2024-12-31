import pool from "../connection/pool.js";

export class ProductosModel {
  static async createProducto({
    nombre_producto,
    descripcion,
    precio,
    cantidad,
    idCategoria,
    idProveedor,
  }) {
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
      const [categoria] = await connection.query(
        `SELECT id_categoria FROM categorias WHERE id_categoria = ?`,
        [idCategoria]
      );

      if (categoria.length === 0) {
        throw new Error(`La categoría con id ${idCategoria} no existe.`);
      }

      const [proveedor] = await connection.query(
        `SELECT id_proveedor FROM proveedores WHERE id_proveedor = ?`,
        [idProveedor]
      );

      if (proveedor.length === 0) {
        throw new Error(`El proveedor con id ${idProveedor} no existe.`);
      }

      const [result] = await connection.query(
        `
                INSERT INTO
                        productos (nombre_producto, descripcion, precio, cantidad, id_categoria, id_proveedor)
                VALUES
                        (?, ?, ?, ?, ?, ?)
                `,
        [
          nombre_producto,
          descripcion,
          precio,
          cantidad,
          idCategoria,
          idProveedor,
        ]
      );

      return {
        id: result.insertId,
        nombre_producto,
        descripcion,
        precio,
        cantidad,
        idCategoria,
        idProveedor,
      };
    } catch (error) {
      console.error("Error al crear producto", error);
      throw error;
    }
  }

  static async getProductos() {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(`
                SELECT 
                        id_producto, nombre_producto, descripcion, precio, cantidad, id_categoria, id_proveedor
                FROM 
                        productos
                `);
      return result;
    } catch (error) {
      console.error("Error al obtener los productos", error);
      throw error;
    }
  }

  static async getProductosById({ productoId }) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        `
                SELECT 
                        id_producto, nombre_producto, descripcion, precio, cantidad, id_categoria, id_proveedor
                FROM 
                        productos
                WHERE
                        id_producto = ?
                `,
        [productoId]
      );
      if (result.length === 0) {
        throw new Error("Producto no encontrado");
      }
      return result[0];
    } catch (error) {
      console.error("Error al obtener los productos", error);
      throw error;
    }
  }

  static async updateProducto({
    productoId,
    nombre_producto,
    descripcion,
    precio,
    cantidad,
    idCategoria,
    idProveedor
  }) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        `
                UPDATE productos
                SET
                        nombre_producto = ?,
                        descripcion = ?,
                        precio = ?,
                        cantidad = ?,
                        id_categoria = ?,
                        id_proveedor = ?
                WHERE
                        id_producto = ?
                `,
        [
          nombre_producto,
          descripcion,
          precio,
          cantidad,
          idCategoria,
          idProveedor,
          productoId
        ]
      );

      if (result.affectedRows === 0) {
        throw new Error("Producto no encontrado");
      }

      return {
        nombre_producto,
        descripcion,
        precio,
        cantidad,
        idCategoria,
        idProveedor,
      };
    } catch (error) {
      console.error("Error al actualizar el producto", error);
      throw error;
    }
  }
  static async deleteProducto({ productoId }) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        `
                DELETE FROM
                        productos
                WHERE
                        id_producto = ?
                `,
        [productoId]
      );

      if (result.affectedRows === 0) {
        throw new Error("Producto no encontrado");
      }

      return { productoId };
    } catch (error) {
      console.error("Error al eliminar el producto", error);
      throw error;
    }
  }
}
