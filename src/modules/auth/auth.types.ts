export interface CriarUsuarioDTO {
  email: string;
  password: string;
}

export interface LoginUsuarioDTO {
  email: string;
  password: string;
}

export interface SessaoUsuario {
  id: string;
  email: string;
  token?: string;
  ultimoAcesso: Date;
}