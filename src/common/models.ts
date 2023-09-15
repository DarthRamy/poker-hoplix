export interface Torneo {
  participantes: Usuario[] | null;
  entrada: number | null;
  pozo: number | null;
  dealer: string | null;
  fecha: string | null;
  status: string | null;
  createdBy: string | null;
  comisionDealer: number | null;
  fichasPorEntrada: number | null;
  numero: number | null;
  puestosPremiados: number | null;
  totalDeFichas: number | null
}

export interface Usuario {
  displayName: string | null;
  photoURL: string | null;
  email: string | null
  balance: number | null;
  puntosGanadosEnTorneos: number | null,
}
