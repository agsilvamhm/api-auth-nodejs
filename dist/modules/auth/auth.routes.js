"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_repository_1 = require("./auth.repository");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
// Montando o fluxo através da Injeção de Dependências
const repository = new auth_repository_1.AuthRepository();
const service = new auth_service_1.AuthService(repository);
const controller = new auth_controller_1.AuthController(service);
authRouter.post('/registrar', (req, res) => controller.cadastrar(req, res));
authRouter.post('/login', (req, res) => controller.login(req, res));
