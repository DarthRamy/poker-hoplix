<template>
  <q-dialog v-model="torneoPendienteModalShow">
    <q-card>
      <q-card-section class="q-py-none">
        <h6 class="q-my-none">Torneo nro. {{ torneoPendiente.numero }}</h6>
      </q-card-section>
      <hr />
      <q-card-section class="q-py-none flex column">
        <p class="q-my-none">
          Creado por: <strong> {{ torneoPendiente.createdBy }}</strong>
        </p>
        <p class="q-my-none">
          Fecha del torneo: <strong>{{ torneoPendiente.fecha }}</strong>
        </p>
        <p class="q-my-none">
          Monto de la entrada: $ <strong>{{ formatCurrency(torneoPendiente.entrada) }}</strong>
        </p>
        <p class="q-my-none">
          Comision para el Dealer:
          <strong>$ {{ formatCurrency(torneoPendiente.comisionDealer) }}</strong>
        </p>
        <p v-if="torneoPendiente.pozo >= 0" class="q-my-none">
          Pozo: <strong>$ {{ formatCurrency(torneoPendiente.pozo) }}</strong>
        </p>
        <p v-else class="q-my-none">Pozo: $ <strong>0</strong></p>
       
      </q-card-section>
      <hr />
      <q-card-section class="q-py-none">
        <p class="q-my-none">Participantes:</p>
        <div>
          <div
            class="participante-en-torneo-pendiente"
            v-for="participante in torneoPendiente.participantes"
          >
            <p class="q-my-none">{{ participante.nombre }}</p>
            <p class="q-my-none">Saldo: <strong>$ {{ formatCurrency(participante.saldo) }}</strong></p>
            <q-icon
              @click="setRemoverDelTorneoModal(participante)"
              v-if="usuarioEsCreador"
              name="cancel"
              color="red"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn v-if="usuarioEsParticipante" @click="setIngresarATorneoModal"
          >Ingresar</q-btn
        >
        <q-btn @click="setIniciarTorneoModal" v-if="usuarioEsCreador"
          >Iniciar</q-btn
        >
        <q-btn @click="setEliminarTorneoModal" v-if="usuarioEsCreador"
          >Eliminar</q-btn
        >
      </q-card-actions>
    </q-card>
  </q-dialog>
  <torneos-page-iniciar-torneo-modal />
  <torneos-page-remover-del-torneo-modal />
  <torneos-page-ingresar-a-torneo-modal />
  <torneos-page-eliminar-torneo-modal />
</template>
<script setup>
import { ref, inject, provide, computed } from "vue";
import TorneosPageIngresarATorneoModal from "./TorneosPageIngresarATorneoModal.vue";
import TorneosPageRemoverDelTorneoModal from "./TorneosPageRemoverDelTorneoModal.vue";
import TorneosPageEliminarTorneoModal from "./TorneosPageEliminarTorneoModal.vue";
import TorneosPageIniciarTorneoModal from "./TorneosPageIniciarTorneoModal.vue";
import { useAuthStore } from "stores/Auth";
import { useTorneosStore } from "stores/Torneos";
import { storeToRefs } from "pinia";


const torneosStore = useTorneosStore();
const auth = useAuthStore();

const { usuario } = storeToRefs(auth);
const { torneos } = storeToRefs(torneosStore);

const ingresarATorneoModalShow = ref(false);
const removerDelTorneoModalShow = ref(false);
const participanteARemoverDelTorneo = ref({});
const participanteAIngresarAlTorneo = ref({});
const eliminarTorneoModalShow = ref(false);
const torneoAEliminar = ref("");
const torneoAIniciar = ref("");
const inciarTorneoModalShow = ref(false);

const setIngresarATorneoModal = () => {
  ingresarATorneoModalShow.value = true;
  participanteAIngresarAlTorneo.value = {
    nombre: usuario.value.displayName,
    email: usuario.value.email,
    photo: usuario.value.photoURL,
    saldo: -torneoPendiente.value.entrada,
    eliminado: null,
  };
};

const setEliminarTorneoModal = () => {
  eliminarTorneoModalShow.value = true;
  torneoAEliminar.value = String(torneoPendiente.value.numero);
};
const setRemoverDelTorneoModal = (participante) => {
  removerDelTorneoModalShow.value = true;
  participanteARemoverDelTorneo.value = participante;
};

const setIniciarTorneoModal = () => {
  inciarTorneoModalShow.value = true;
  torneoAIniciar.value = String(torneoPendiente.value.numero);
};
const torneoPendienteModalShow = inject("torneoPendienteModalShow");
const torneoPendiente = inject("torneoPendiente");
const formatCurrency = inject('formatCurrency')

provide("inciarTorneoModalShow", inciarTorneoModalShow);
provide("torneoAIniciar", torneoAIniciar);
provide("participanteARemoverDelTorneo", participanteARemoverDelTorneo);
provide("removerDelTorneoModalShow", removerDelTorneoModalShow);
provide("ingresarATorneoModalShow", ingresarATorneoModalShow);
provide("eliminarTorneoModalShow", eliminarTorneoModalShow);
provide("torneoAEliminar", torneoAEliminar);
provide("participanteAIngresarATorneo", participanteAIngresarAlTorneo);

const usuarioEsCreador = computed(() => {
  const usuarioCreadorEncontrado =
    torneoPendiente.value.createdBy == usuario.value.displayName;
  if (usuarioCreadorEncontrado) {
    return true;
  } else {
    return false;
  }
});

const usuarioEsParticipante = computed(() => {
  if (torneoPendiente.value.participantes) {
    const participantesEnTorneoEncontrado =
      torneoPendiente.value.participantes.find(
        (participante) => participante.email == usuario.value.email
      );
    if (participantesEnTorneoEncontrado) {
      return false;
    } else {
      return true;
    }
  }
});
</script>

<style scoped>
.participante-en-torneo-pendiente {
  display: flex;

  justify-content: space-between;
}
</style>
