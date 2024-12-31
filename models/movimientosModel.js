import pool from "../connection/pool.js";

export class MovimientosModel {
  static async createMovimiento({
    id_producto,
    tipo_movimiento,
    cantidad,
    id_usuario,
  }) {
    const connection = await pool.getConnection();

    try {
      const [producto] = await connection.query(
        `SELECT id_producto, cantidad FROM productos WHERE id_producto = ?`,
        [id_producto]
      );
      if (producto.length === 0) {
        throw new Error(`El producto con id ${id_producto} no existe.`);
      }

      const stockActual = producto[0].cantidad;

      let nuevoStock;
      if (tipo_movimiento === "entrada") {
        nuevoStock = stockActual + cantidad;
      } else if (tipo_movimiento === "salida") {
        if (cantidad > stockActual) {
          throw new Error(
            `No hay suficiente stock. Stock actual: ${stockActual}, cantidad solicitada: ${cantidad}.`
          );
        }
        nuevoStock = stockActual - cantidad;
      } else {
        throw new Error(`Tipo de movimiento inválido: ${tipo_movimiento}`);
      }

      await connection.beginTransaction();

      const [result] = await connection.query(
        `
        INSERT INTO movimientos_inventario 
        (id_producto, tipo_movimiento, cantidad, id_usuario) 
        VALUES (?, ?, ?, ?)`,
        [id_producto, tipo_movimiento, cantidad, id_usuario]
      );

      await connection.query(
        `
        UPDATE productos
        SET cantidad = ?
        WHERE id_producto = ?`,
        [nuevoStock, id_producto]
      );

      await connection.commit();

      return {
        id_movimiento: result.insertId,
        id_producto,
        tipo_movimiento,
        cantidad,
        nuevoStock,
        id_usuario,
      };
    } catch (error) {
      await connection.rollback();
      console.error("Error al crear movimiento", error);
      throw error;
    } finally {
      connection.release();
    }
  }

  static async getMovimientos({
    id_producto,
    id_usuario,
    tipo_movimiento,
    fecha_inicio,
    fecha_fin,
    limit,
    offset,
  }) {
    let query = `
      SELECT 
        m.id_movimiento,
        m.id_producto,
        p.nombre_producto,
        m.tipo_movimiento,
        m.cantidad,
        m.fecha_movimiento,
        m.id_usuario,
        u.usuario AS nombre_usuario
      FROM movimientos_inventario m
      INNER JOIN productos p ON m.id_producto = p.id_producto
      INNER JOIN usuarios u ON m.id_usuario = u.id_usuario
      WHERE 1 = 1
    `;
    const params = [];

    if (id_producto) {
      query += ` AND m.id_producto = ?`;
      params.push(id_producto);
    }

    if (id_usuario) {
      query += ` AND m.id_usuario = ?`;
      params.push(id_usuario);
    }

    if (fecha_inicio) {
      query += ` AND DATE(m.fecha_movimiento) >= DATE(?)`;
      params.push(fecha_inicio);
    }

    if (fecha_fin) {
      query += ` AND DATE(m.fecha_movimiento) <= DATE(?)`;
      params.push(fecha_fin);
    }

    if (fecha_fin) {
      query += ` AND m.fecha_movimiento <= ?`;
      params.push(fecha_fin);
    }

    query += ` ORDER BY m.fecha_movimiento DESC`;

    if (limit) {
      query += ` LIMIT ?`;
      params.push(parseInt(limit, 10));
    }

    if (offset) {
      query += ` OFFSET ?`;
      params.push(parseInt(offset, 10));
    }

    const [rows] = await pool.query(query, params);
    return rows;
  }
}
