export class MovimientosController {
  constructor({ movimientosModel }) {
    this.movimientosModel = movimientosModel;
  }
  createMovimiento = async (req, res) => {
    try {
      const { id_producto, tipo_movimiento, cantidad, id_usuario } = req.body;

    if (!cantidad || cantidad <= 0) {
      return res.status(400).json({ error: "La cantidad debe ser un número mayor que 0." });
    }

    if (!["entrada", "salida"].includes(tipo_movimiento)) {
      return res.status(400).json({ error: "Tipo de movimiento inválido. Use 'entrada' o 'salida'." });
    }

      const movimiento = await this.movimientosModel.createMovimiento({
        id_producto,
        tipo_movimiento,
        cantidad,
        id_usuario,
      });

      res.status(201).json(movimiento);
    } catch (error) {
      console.error("Error al crear movimiento", error);
      res.status(500).json({ error: error.message });
    }
  };
  
  getMovimientos = async (req, res) => {
    try {
      const {
        id_producto,
        id_usuario,
        tipo_movimiento,
        fecha_inicio,
        fecha_fin,
        limit,
        offset,
      } = req.query;

      const movimientos = await this.movimientosModel.getMovimientos({
        id_producto,
        id_usuario,
        tipo_movimiento,
        fecha_inicio,
        fecha_fin,
        limit,
        offset,
      });

      res.status(200).json(movimientos);
    } catch (error) {
      console.error("Error al obtener movimientos", error);
      res.status(500).json({ error: error.message });
    }
  };
}
