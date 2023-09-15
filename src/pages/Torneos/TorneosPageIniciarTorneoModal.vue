<template>

    <q-dialog v-model="inciarTorneoModalShow">
<q-card>
    <q-card-section>
        <p class="q-my-none">Deseas iniciar el Torneo <strong># {{ torneoAIniciar}}</strong> ?</p>
    </q-card-section>
    <q-card-actions>
        <q-btn @click="iniciarTorneo">
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

const torneosStore = useTorneosStore()

const inciarTorneoModalShow = inject('inciarTorneoModalShow');
const torneoAIniciar = inject('torneoAIniciar');
const torneoPendienteModalShow = inject("torneoPendienteModalShow");

const iniciarTorneo = async () => {
    try {
       await torneosStore.iniciarTorneo(torneoAIniciar.value)
    } catch (error) {
        console.log(error)
    }
    finally {
        inciarTorneoModalShow.value = false
        torneoPendienteModalShow.value = false
    }
}

</script> 