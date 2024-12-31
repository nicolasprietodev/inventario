import { createCategoriaRouter } from "./categoriaRouter.js";
import { createLoginRouter } from "./loginRouter.js";
import { createUserRouter } from "./userRouter.js";
import { createProveedoresRouter } from "./proveedoresRouter.js";
import { createProductosRouter } from "./productosRouter.js";
import { createMovimientosRouter } from "./movimientosRouter.js";

export const createRouters = (models) => {
  return {
    loginRouter: createLoginRouter({ loginModel: models.LoginModel }),
    userRouter: createUserRouter({ userModel: models.UserModel }),
    categoriaRouter: createCategoriaRouter({ categoriaModel: models.CategoriaModel }),
    proveedoresRouter: createProveedoresRouter({ proveedoresModel: models.ProveedoresModel }),
    productosRouter: createProductosRouter({ productosModel: models.ProductosModel }),
    movimientosRouter: createMovimientosRouter({ movimientosModel: models.MovimientosModel })
  };
};
