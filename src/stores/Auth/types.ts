import { Usuario } from 'src/common/models';

export interface AuthState {
  usuario: Usuario | null;
  usuarios: Usuario[];
  }