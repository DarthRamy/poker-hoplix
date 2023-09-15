<template>

    <q-dialog v-model="eliminarTorneoModalShow">
<q-card>
    <q-card-section>
        <p class="q-my-none">Deseas eliminar el torneo <strong># {{ torneoAEliminar}}</strong> ?</p>
    </q-card-section>
    <q-card-actions>
        <q-btn @click="eliminarTorneo">
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

const torneoAEliminar = inject('torneoAEliminar');
const eliminarTorneoModalShow = inject('eliminarTorneoModalShow')
const torneoPendienteModalShow = inject("torneoPendienteModalShow");

const eliminarTorneo = async () => {
    try {
       await torneosStore.eliminarTorneo(torneoAEliminar.value)
        
    } catch (error) {
        console.log(error)
    }
    finally {
        eliminarTorneoModalShow.value = false;
        torneoPendienteModalShow.value = false
    }
}
</script> 