import { createLoginRouter } from "./loginRouter.js";

export const createRouters = (models) => {
    return {
        loginRouter: createLoginRouter({ loginRouter: models.LoginModel })
    }
}