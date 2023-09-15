import { Torneo } from 'src/common/models';

export interface TorneosState {
  torneo: Torneo | null;
  torneos: Torneo[] | null;
  }