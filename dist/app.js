"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("./modules/auth/auth.routes");
const app = (0, express_1.default)();
exports.app = app;
// Middleware para o Express entender JSON
app.use(express_1.default.json());
// Importação das rotas de autenticação (quando criá-las no passo anterior)
app.use('/auth', auth_routes_1.authRouter);
