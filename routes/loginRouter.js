import { Router } from 'express';
import { LoginController } from '../controllers/loginController.js';

export const createLoginRouter = ({ loginModel }) => {
    const router = Router();
    const loginController = new LoginController({ loginModel });

    router.post('/login', loginController.login);
    router.post('/logout', loginController.logout);

    return router;
}