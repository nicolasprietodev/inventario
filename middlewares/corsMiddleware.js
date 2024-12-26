import cors from 'cors'

export const corsMiddleware = () => cors({
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200,
        credentials: true
    });
