<template>
  <q-dialog v-model="eliminarParticipanteDelTorneoModalShow">
    <q-card>
      <q-card-section>
        <p class="q-my-none">
          El participante
          <strong>{{ participanteAEliminarDelTorneo.nombre }}</strong>
          a quedado elimiando del torneo
        </p>
      </q-card-section>
      <q-card-actions>
        <q-btn @click="eliminarParticipanteDelTorneo"> Aceptar </q-btn>
        <q-btn v-close-popup>Cancelar</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { inject, computed, ref } from "vue";
import { useTorneosStore } from "stores/Torneos";
import { serverTimestamp } from "firebase/firestore";
import { useAuthStore } from "src/stores/Auth";
import { storeToRefs } from "pinia";

const torneosStore = useTorneosStore();

const auth = useAuthStore();
const { usuario, usuarios } = storeToRefs(auth);

const participanteAEliminarDelTorneo = inject("participanteAEliminarDelTorneo");
const eliminarParticipanteDelTorneoModalShow = inject(
  "eliminarParticipanteDelTorneoModalShow"
);
const torneoEnCurso = inject("torneoEnCurso");
const premios = inject("premios");
const participantesActivosEnTorneo = inject("participantesActivosEnTorneo");

const premiosSorteados = computed(() => {
  if (premios.value) {
    return Object.values(premios.value).sort((a, b) => b - a);
  }
});

const usuarioAActualizarBalance = ref({})
const verficiarSiParticipanteAEliminarCobra = computed(() => {
  if (
    participantesActivosEnTorneo.value.length <= premiosSorteados.value.length
  ) {
    return true;
  } else {
    return false;
  }
});

const posicionDeUsuarioAlSerEliminado = computed(() => {
    if(participantesActivosEnTorneo.value.length){

        return participantesActivosEnTorneo.value.length + 1 
    }
    else {
        return 1
    }
}) 
  
const puntosGanadosEnTorneo = computed(() => {
    if(torneoEnCurso.value.participantes.length) {
        return torneoEnCurso.value.participantes.length / posicionDeUsuarioAlSerEliminado.value
    }
   
}) 
  


const eliminarParticipanteDelTorneo = async () => {
  torneoEnCurso.value.participantes.forEach((p) => {
    if (p.email === participanteAEliminarDelTorneo.value.email) {
      p.eliminado = new Date();

      if (verficiarSiParticipanteAEliminarCobra.value) {
          p.saldo = p.saldo + premiosSorteados.value[participantesActivosEnTorneo.value.length]
      }
      const usuarioEncontrado = usuarios.value.find((u) => u.email === p.email)

      usuarioAActualizarBalance.value = {
        email: usuarioEncontrado.email,
        balance: usuarioEncontrado.balance = usuarioEncontrado.balance + p.saldo,
        puntosGanadosEnTorneos: usuarioEncontrado.puntosGanadosEnTorneos = usuarioEncontrado.puntosGanadosEnTorneos + puntosGanadosEnTorneo.value
      } 
      console.log(posicionDeUsuarioAlSerEliminado.value)
    console.log(puntosGanadosEnTorneo.value)
    }
  });
 
  try {
    await torneosStore.eliminarParticipanteDelTorneo(
      String(torneoEnCurso.value.numero),
      torneoEnCurso.value.participantes,
      usuarioAActualizarBalance.value.email,
      usuarioAActualizarBalance.value.balance,
      usuarioAActualizarBalance.value.puntosGanadosEnTorneos
    );

  } catch (error) {
    console.log(error);
  } finally {
    eliminarParticipanteDelTorneoModalShow.value = false;
  }
};
</script>
