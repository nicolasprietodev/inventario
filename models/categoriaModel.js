import pool from "../connection/pool.js";
export class CategoriaModel {
  static async createCategoria({ nombre_categoria, descripcion }) {
    const connection = await pool.getConnection();

    console.log({
      "Datos recibidos": {
        nombre_categoria,
        descripcion,
      },
    });

    try {
      const [result] = await connection.query(
        `
                INSERT INTO
                        categorias (nombre_categoria, descripcion)
                VALUES
                        (?, ?)
                `,
        [nombre_categoria, descripcion]
      );

      return {
        id: result.insertId,
        nombre_categoria,
        descripcion,
      };
    } catch (error) {
      console.error("Error al crear categoria", error);
      throw error;
    }
  }

  static async getCategorias() {
    try {
      const [rows] = await pool.query(
        `
                    SELECT
                        id_categoria,
                        nombre_categoria,
                        descripcion
                    FROM
                        categorias
        `
      );

      return rows;
    } catch (error) {
      console.error("Error al obtener las categorias", error);
      throw error;
    }
  }

  static async getCategoriaById({ categoriaId }) {
    try {
      const [rows] = await pool.query(
        `
                    SELECT
                        id_categoria,
                        nombre_categoria,
                        descripcion
                    FROM
                        categorias
                    WHERE
                        id_categoria = ?
        `,
        [categoriaId]
      );
      if (rows.length === 0) {
        throw new Error("Categoria no encontrada");
      }
      console.log("Categoria encontrada", rows[0]);
      return rows[0];
    } catch (error) {
      console.error("Error al obtener la categoria", error);
      throw error;
    }
  }

  static async updateCategoria({ categoriaId, nombre_categoria, descripcion }) {
    try {
      const [result] = await pool.query(
        `
                    UPDATE
                        categorias
                    SET
                        nombre_categoria = ?,
                        descripcion = ?
                    WHERE
                        id_categoria = ?
        `,
        [nombre_categoria, descripcion, categoriaId]
      );

      if (result.affectedRows === 0) {
        throw new Error("Categoria no encontrada");
      }

      return {
        categoriaId,
        nombre_categoria,
        descripcion,
      };
    } catch (error) {
      console.error("Error al actualizar la categoria", error);
      throw error;
    }
  }

  static async deleteCategoria({ categoriaId }) {
    try {
      const [result] = await pool.query(
        `
                    DELETE FROM
                        categorias
                    WHERE
                        id_categoria = ?
        `,
        [categoriaId]
      );

      if (result.affectedRows === 0) {
        throw new Error("Categoria no encontrada");
      }

      return { categoriaId };
    } catch (error) {
      console.error("Error al eliminar la categoria", error);
      throw error;
    }
  }


}
