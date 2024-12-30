import { SALT_ROUNDS } from "../config/config.js";
import pool from "../connection/pool.js";
import bcrypt from "bcrypt";

export class UserModel {
  static async createUser({ usuario, password, nombre, roleId }) {
    const connection = await pool.getConnection();

    console.log({
      "Datos recibidos": {
        usuario,
        password,
        nombre,
        roleId,
      },
    });

    try {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const [result] = await connection.query(
        `
                INSERT INTO
                        usuarios (usuario, password, nombre_completo, id_rol, estado)
                VALUES
                        (?, ?, ?, ?, ?)
                `,
        [usuario, hashedPassword, nombre, roleId, 1]
      );

      return {
        id: result.insertId,
        usuario,
        nombre,
        roleId,
      };
    } catch (error) {
      console.error("Error al crear usuario", error);
      throw error;
    }
  }

  static async getUsers() {
    try {
      const [rows] = await pool.query(
        `
                SELECT
                    u.id_usuario,
                    u.usuario,
                    u.nombre_completo,
                    r.nombre_rol AS rol
                FROM
                    usuarios u
                INNER JOIN
                    roles r
                ON
                    u.id_rol = r.id_rol
                `
      );

      return rows;
    } catch (error) {
      console.error("Error al obtener usuarios", error);
      throw error;
    }
  }

  static async getUserById({ userId }) {
    try {
      const [rows] = await pool.query(
        `
                SELECT
                    u.id_usuario,
                    u.usuario,
                    u.nombre_completo,
                    r.nombre_rol AS rol
                FROM
                    usuarios u
                INNER JOIN
                    roles r
                ON
                    u.id_rol = r.id_rol
                WHERE
                    u.id_usuario = ?
                `,
        [userId]
      );
      if (rows.length === 0) {
        throw new Error("Usuario no encontrado");
      }
      return rows[0];
    } catch (error) {
      console.error("Error al obtener usuario", error);
      throw error;
    }
  }

  static async updateUser({ userId, password, usuario, nombre, roleId }) {
    try {
      const [result] = await pool.query(
        `
                UPDATE
                    usuarios
                SET
                    usuario = ?,
                    password = ?,
                    nombre_completo = ?,
                    id_rol = ?
                WHERE
                    id_usuario = ?
                `,
        [usuario, password, nombre, roleId, userId]
      );

      if (result.affectedRows === 0) {
        throw new Error("Usuario no encontrado");
      }

      return { userId, password, usuario, nombre, roleId };
    } catch (error) {
      console.error("Error al actualizar usuario", error);
      throw error;
    }
  }
  static async deleteUser({ userId }) {
    try {
      const [result] = await pool.query(
        `
                DELETE FROM
                    usuarios
                WHERE
                    id_usuario = ?
                `,
        [userId]
      );

      if (result.affectedRows === 0) {
        throw new Error("Usuario no encontrado");
      }

      return { message: "Usuario eliminado exitosamente", userId };
    } catch (error) {
      console.error("Error al eliminar usuario", error);
      throw error;
    }
  }
}
