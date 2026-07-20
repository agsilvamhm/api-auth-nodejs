"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const supabase_1 = require("../../config/supabase");
class AuthRepository {
    async registrarUltimoAcesso(usuarioId) {
        const dataAtual = new Date().toISOString();
        // Atualiza a coluna de último acesso na tabela 'profiles' conectada ao User ID
        const { error } = await supabase_1.supabase
            .from('profiles')
            .upsert({
            id: usuarioId,
            ultimo_acesso: dataAtual
        }, { onConflict: 'id' });
        if (error) {
            throw new Error(`Falha ao persistir último acesso: ${error.message}`);
        }
    }
    async obterUltimoAcesso(usuarioId) {
        const { data, error } = await supabase_1.supabase
            .from('profiles')
            .select('ultimo_acesso')
            .eq('id', usuarioId)
            .single();
        if (error || !data)
            return null;
        return new Date(data.ultimo_acesso);
    }
}
exports.AuthRepository = AuthRepository;
