import pool from "../connection/pool.js";

export class ProveedoresModel {
  static async createProveedor({
    nombre_proveedor,
    telefono,
    email,
    direccion,
  }) {
    const connection = await pool.getConnection();

    console.log({
      "Datos recibidos": {
        nombre_proveedor,
        telefono,
        email,
        direccion,
      },
    });

    try {
      const [result] = await connection.query(
        `INSERT INTO 
                proveedores (nombre_proveedor, telefono, email, direccion)
            VALUES
                (?, ?, ?, ?)`,
        [nombre_proveedor, telefono, email, direccion]
      );

      return {
        id: result.insertId,
        nombre_proveedor,
        telefono,
        email,
        direccion,
      };
    } catch (error) {
      console.error("Error al crear el proveedor", error);
      throw error;
    }
  }
  static async getProveedores() {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(`
                SELECT 
                        nombre_proveedor, telefono, email, direccion
                FROM 
                        proveedores
                `);
      return result;
    } catch (error) {
      console.error("Error al obtener los proveedores", error);
      throw error;
    }
  }
  static async getProveedoresById({ proveedorId }) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        `
                    SELECT 
                            nombre_proveedor, telefono, email, direccion
                    FROM 
                            proveedores
                    WHERE
                            id_proveedor = ?
                    `,
        [proveedorId]
      );
      if (result.length === 0) {
        throw new Error("Proveedor no encontrado");
      }

      console.log("Proveedor encontrado", result[0]);
      return result[0];
    } catch (error) {
      console.error("Error al obtener los proveedores", error);
      throw error;
    }
  }

  static async updateProveedor({
    proveedorId,
    nombre_proveedor,
    telefono,
    email,
    direccion,
  }) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        `
                    UPDATE 
                            proveedores
                    SET
                            nombre_proveedor = ?,
                            telefono = ?,
                            email = ?,
                            direccion = ?
                    WHERE
                            id_proveedor = ?
                    `,
        [nombre_proveedor, telefono, email, direccion, proveedorId]
      );

      if (result.affectedRows === 0) {
        throw new Error("Proveedor no encontrado");
      }

      return {
        proveedorId,
        nombre_proveedor,
        telefono,
        email,
        direccion,
      };
    } catch (error) {
      console.error("Error al actualizar el proveedor", error);
      throw error;
    }
  }

  static async deleteProveedor({ proveedorId }) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        `
                    DELETE FROM 
                            proveedores
                    WHERE
                            id_proveedor = ?
                    `,
        [proveedorId]
      );

      if (result.affectedRows === 0) {
        throw new Error("Proveedor no encontrado");
      }

      return { message: "Proveedor eliminado correctamente" };
    } catch (error) {
      console.error("Error al eliminar el proveedor", error);
      throw error;
    }
  }
}
