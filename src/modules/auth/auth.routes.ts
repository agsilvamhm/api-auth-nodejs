import { Router } from 'express';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

const authRouter = Router();

// Montando o fluxo através da Injeção de Dependências
const repository = new AuthRepository();
const service = new AuthService(repository);
const controller = new AuthController(service);

authRouter.post('/registrar', (req, res) => controller.cadastrar(req, res));
authRouter.post('/login', (req, res) => controller.login(req, res));

export { authRouter };