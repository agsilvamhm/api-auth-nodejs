import 'dotenv/config';
import express from 'express';
import { authRouter } from './modules/auth/auth.routes'

const app = express();

// Middleware para o Express entender JSON
app.use(express.json());

// Importação das rotas de autenticação (quando criá-las no passo anterior)
app.use('/auth', authRouter);

export { app };