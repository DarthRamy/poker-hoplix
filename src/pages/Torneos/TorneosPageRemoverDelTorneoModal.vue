<template>

    <q-dialog v-model="removerDelTorneoModalShow">
<q-card>
    <q-card-section>
        <p class="q-my-none">Deseas sacar a <strong>{{ participanteARemoverDelTorneo.nombre }}</strong>  del torneo ?</p>
    </q-card-section>
    <q-card-actions>
        <q-btn @click="removerDelTorneo">
            Aceptar
        </q-btn>
        <q-btn v-close-popup>Cancelar</q-btn>
    </q-card-actions>
</q-card>
    </q-dialog>
</template>
<script setup>
import {inject} from 'vue'
import { useTorneosStore } from "stores/Torneos";

const torneosStore = useTorneosStore();


const removerDelTorneoModalShow = inject('removerDelTorneoModalShow')
const participanteARemoverDelTorneo = inject('participanteARemoverDelTorneo')
const torneoPendiente = inject('torneoPendiente');
const pozo = inject('pozo');

const removerDelTorneo = async () => {
    pozo.value = torneoPendiente.value.pozo - Number(torneoPendiente.value.entrada)
    try {
        await torneosStore.removerDelTorneo(participanteARemoverDelTorneo.value, String(torneoPendiente.value.numero), pozo.value)
        
    } catch (error) {
        console.log(error)
    }
    finally {
        removerDelTorneoModalShow.value = false
    }
}
</script> 