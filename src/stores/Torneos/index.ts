import { defineStore } from 'pinia';
import { state } from './state';
import { actions } from './actions';


export const useTorneosStore = defineStore('torneos', {
  state,
  actions,

});
