import { Router } from 'express';
import { MovimientosController } from '../controllers/movimientosController.js';

export const createMovimientosRouter = ({ movimientosModel }) => {

  const router = Router();
  const movimientosController = new MovimientosController({ movimientosModel });

  router.post('/movimientos', movimientosController.createMovimiento);
  router.get('/movimientos', movimientosController);

  return router;
};
