"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async cadastrar(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ mensagem: 'E-mail e senha são obrigatórios.' });
            }
            await this.authService.registrar({ email, password });
            return res.status(201).json({ mensagem: 'Usuário pré-cadastrado! Verifique seu e-mail.' });
        }
        catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ mensagem: 'Credenciais incompletas.' });
            }
            const sessaoValida = await this.authService.autenticar({ email, password });
            return res.status(200).json(sessaoValida);
        }
        catch (error) {
            // Captura o erro disparado pela regra de negócio e envia um 401 (Não Autorizado)
            return res.status(401).json({ erro: error.message });
        }
    }
}
exports.AuthController = AuthController;
