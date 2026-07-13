import { supabase } from '../../config/supabase';

export class AuthRepository {
  async registrarUltimoAcesso(usuarioId: string): Promise<void> {
    const dataAtual = new Date().toISOString();

    // Atualiza a coluna de último acesso na tabela 'profiles' conectada ao User ID
    const { error } = await supabase
      .from('profiles')
      .upsert({ 
        id: usuarioId, 
        ultimo_acesso: dataAtual 
      }, { onConflict: 'id' });

    if (error) {
      throw new Error(`Falha ao persistir último acesso: ${error.message}`);
    }
  }

  async obterUltimoAcesso(usuarioId: string): Promise<Date | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('ultimo_acesso')
      .eq('id', usuarioId)
      .single();

    if (error || !data) return null;
    return new Date(data.ultimo_acesso);
  }
}