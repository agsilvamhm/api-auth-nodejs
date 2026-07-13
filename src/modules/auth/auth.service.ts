import { supabase } from '../../config/supabase';
import { AuthRepository } from './auth.repository';
import { CriarUsuarioDTO, LoginUsuarioDTO, SessaoUsuario } from './auth.types';

export class AuthService {
  // Injeção de dependência pelo construtor (Clean Code)
  constructor(private authRepository: AuthRepository) {}

  async registrar(dados: CriarUsuarioDTO): Promise<void> {
    const { error } = await supabase.auth.signUp({
      email: dados.email,
      password: dados.password,
    });

    if (error) {
      throw new Error(`Erro no cadastro: ${error.message}`);
    }
  }

  async autenticar(dados: LoginUsuarioDTO): Promise<SessaoUsuario> {
    // 1. Faz o login usando a SDK nativa do Supabase (Valida e descriptografa a senha)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: dados.email,
      password: dados.password,
    });

    if (error || !data.user) {
      throw new Error('Credenciais inválidas ou usuário inexistente.');
    }

    // 2. Registra o timestamp exato do login atual do usuário
    await this.authRepository.registrarUltimoAcesso(data.user.id);

    // 3. Busca a informação atualizada para compor o retorno do usuário
    const ultimoAcesso = await this.authRepository.obterUltimoAcesso(data.user.id);

    return {
      id: data.user.id,
      email: data.user.email || '',
      token: data.session?.access_token,
      ultimoAcesso: ultimoAcesso || new Date(),
    };
  }
}