<template>
  <q-dialog v-model="ingresarATorneoModalShow">
    <q-card>
      <q-card-section>
        <p class="q-my-none">
          Seguro deseas participar en el Torneo #
         <strong>{{ torneoPendiente.numero }}</strong>  ?
        </p>
        <p class="q-my-none">
          Una vez registrado en el Torneo, solo
        <strong>{{ torneoPendiente.createdBy }}</strong> podra sacarte de el.
        </p>
        <q-btn @click="ingresarATorneo">Aceptar</q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { inject, ref, watch } from "vue";
import { useTorneosStore } from "src/stores/Torneos";
import { useAuthStore } from 'src/stores/Auth';
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const torneosStore = useTorneosStore()
const {usuario} = storeToRefs(authStore)


const torneoPendiente = inject("torneoPendiente");
const ingresarATorneoModalShow = inject("ingresarATorneoModalShow");
const participanteAIngresarAlTorneo = inject('participanteAIngresarATorneo');
const pozo = inject('pozo');
const totalDeFichas = inject('totalDeFichas')

const ingresarATorneo = async () => {
    const numeroDeTorneo = String(torneoPendiente.value.numero)
     pozo.value = torneoPendiente.value.pozo + Number(torneoPendiente.value.entrada)
     totalDeFichas.value = torneoPendiente.value.totalDeFichas + Number(torneoPendiente.value.fichasPorEntrada)
try {
   await torneosStore.ingresarATorneo(participanteAIngresarAlTorneo.value, numeroDeTorneo, pozo.value, totalDeFichas.value)
} catch (error) {
    console.log(error)
}
finally{
    ingresarATorneoModalShow.value = false
  
 
}
}



</script>
