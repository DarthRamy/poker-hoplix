<template>
  <q-page class="page">
    <!-- <div v-if="torneoPendiente[0]">
      <q-btn @click="torneoPendienteModalShow = true">Torneo Pendiente</q-btn>
    </div> -->

    <div class="torneo-en-curso" v-if="torneoEnCurso[0]">
      <div class="absolute-bottom asientos-bottom-container">
        <div class="asientos-bottom-column">
          <div
            class="participante-activo"
            v-if="participantesActivosEnTorneo[7]"
          >
            <div class="participante-activo-display-photo"></div>
            <div class="absolute-bottom participante-activo-display-info">
              <p class="q-my-none">
                {{participanteDisplayName(participantesActivosEnTorneo[7].nombre) }}
              </p>
              <p style="color: red" class="q-my-none">
                {{ participantesActivosEnTorneo[7].saldo }}
              </p>
            </div>
          </div>
          <div class="participante-activo" v-else>
            <div class="participante-activo-vertical-photo"></div>
            <div class="participante-inactivo-vertical-info absolute-bottom">
              <p class="q-my-none" >asiento libre</p>
            </div>
          </div>
          <div
            class="participante-activo"
            v-if="participantesActivosEnTorneo[8]"
          >
            <div class="participante-activo-display-photo"></div>
            <div class="absolute-bottom participante-activo-display-info">
              <p class="q-my-none">
                {{ participanteDisplayName(participantesActivosEnTorneo[8].nombre) }}
              </p>
              <p style="color: red"  class="q-my-none">
                {{ participantesActivosEnTorneo[8].saldo }}
              </p>
            </div>
          </div>
          <div class="participante-activo" v-else>
            <div class="participante-activo-vertical-photo"></div>
            <div class="participante-inactivo-vertical-info absolute-bottom">
              <p class="q-my-none">asiento libre</p>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute-left asientos-left-container">
        <div class="asientos-left-column">
          <div
            class="participante-activo-vertical"
            v-if="participantesActivosEnTorneo[4]"
          >
            <div class="participante-activo-vertical-photo"></div>
            <div class="participante-activo-vertical-info absolute-bottom">
              <p class="q-my-none">
                {{ participanteDisplayName(participantesActivosEnTorneo[4].nombre)}}
              </p>
              <p  style="color: red" class="q-my-none">
                {{ participantesActivosEnTorneo[4].saldo }}
              </p>
            </div>
          </div>
          <div class="participante-activo-vertical" v-else>
            <div class="participante-activo-vertical-photo"></div>
            <div class="participante-activo-vertical-info absolute-bottom">
              <p class="q-my-none">asiento libre</p>
            </div>
          </div>
          <div
            class="participante-activo-vertical"
            v-if="participantesActivosEnTorneo[5]"
          >
            <div class="participante-activo-vertical-photo"></div>
            <div class="participante-activo-vertical-info absolute-bottom">
              <p class="q-my-none">
                {{ participanteDisplayName(participantesActivosEnTorneo[5].nombre) }}
              </p>
              <p style="color: red" class="q-my-none">
                {{ participantesActivosEnTorneo[5].saldo }}
              </p>
            </div>
          </div>
          <div class="participante-activo-vertical" v-else>
            <div class="participante-activo-vertical-photo"></div>
            <div class="participante-activo-vertical-info absolute-bottom">
              <p class="q-my-none">asiento libre</p>
            </div>
          </div>
          <div
            class="participante-activo-vertical"
            v-if="participantesActivosEnTorneo[6]"
          >
            <div class="participante-activo-vertical-photo"></div>
            <div class="participante-activo-vertical-info absolute-bottom">
              <p class="q-my-none">
                {{ participanteDisplayName(participantesActivosEnTorneo[6].nombre) }}
              </p>
              <p style="color: red" class="q-my-none">
                {{ participantesActivosEnTorneo[6].saldo }}
              </p>
            </div>
          </div>
          <div class="participante-activo-vertical" v-else>
            <div class="participante-activo-vertical-photo"></div>
            <div class="participante-activo-vertical-info absolute-bottom">
              <p class="q-my-none">asiento libre</p>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute-right asientos-rigth-container">
        <div class="asientos-rigth-column">
          <div
            class="participante-activo-vertical"
            v-if="participantesActivosEnTorneo[1]"
          >
            <div class="participante-activo-vertical-photo"></div>
            <div class="participante-activo-vertical-info absolute-bottom">
              <p class="q-my-none">
                {{ participanteDisplayName(participantesActivosEnTorneo[1].nombre) }}
              </p>
              <p style="color: red" class="q-my-none">
                {{ participantesActivosEnTorneo[1].saldo }}
              </p>
            </div>
          </div>
          <div class="participante-activo-vertical" v-else>
            <div class="participante-activo-vertical-photo"></div>
            <div class="participante-activo-vertical-info absolute-bottom">
              <p class="q-my-none">asiento libre</p>
            </div>
          </div>
          <div
            class="participante-activo-vertical"
            v-if="participantesActivosEnTorneo[2]"
          >
            <div class="participante-activo-vertical-photo"></div>
            <div class="participante-activo-vertical-info absolute-bottom">
              <p class="q-my-none">
                {{ participanteDisplayName(participantesActivosEnTorneo[2].nombre) }}
              </p>
              <p style="color: red" class="q-my-none">
                {{ participantesActivosEnTorneo[2].saldo }}
              </p>
            </div>
          </div>
          <div class="participante-activo-vertical" v-else>
            <div class="participante-activo-vertical-photo"></div>
            <div class="participante-activo-vertical-info absolute-bottom">
              <p class="q-my-none">asiento libre</p>
            </div>
          </div>
          <div
            class="participante-activo-vertical"
            v-if="participantesActivosEnTorneo[3]"
          >
            <div class="participante-activo-vertical-photo"></div>
            <div class="participante-activo-vertical-info absolute-bottom">
              <p class="q-my-none">
                {{ participanteDisplayName(participantesActivosEnTorneo[3].nombre) }}
              </p>
              <p style="color: red" class="q-my-none">
                {{ participantesActivosEnTorneo[3].saldo }}
              </p>
            </div>
          </div>
          <div class="participante-activo-vertical" v-else>
            <div class="participante-activo-vertical-photo"></div>
            <div class="participante-activo-vertical-info absolute-bottom">
              <p class="q-my-none">asiento libre</p>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute-top asientos-top-container">
        <div class="asientos-top-column">
          <!-- <div
            class="participante-activo-top"
            v-if="participantesActivosEnTorneo[0]"
          >
            <div class="participante-activo-display-photo"></div>
            <div class="participante-activo-display-info absolute-bottom">
              <p class="q-my-none">
                {{ participanteDisplayName(participantesActivosEnTorneo[0].nombre) }}
              </p>
              <p style="color: red" class="q-my-none">
                {{ participantesActivosEnTorneo[0].saldo }}
              </p>
            </div>
          </div> -->
     
        <div   class="participante-activo-top">
          <div class="participante-activo-display-photo"></div>
          <div class="participante-activo-display-info absolute-bottom">
              <p class="q-my-none">
               Asiento libre
              </p>
           
            </div>
        </div>
      </div>
    </div>
      <div class="torneo-en-curso-info flex column">
        <h6 class="q-my-none q-pb-lg">
          Torneo #{{ torneoEnCurso[0].numero }}
          <q-icon style="color: rgb(255 0 0 / 43%)" name="info" />
        </h6>

        <div class="q-pb-lg flex flex-center">
          <h4 class="torneo-en-curso-pozo q-my-none">
            $ {{ formatCurrency(torneoEnCurso[0].pozo) }}
          </h4>
        </div>

        <div class="premios-row-divison-container q-pb-lg">
          <div
            class="flex justify-around premios-row"
            v-for="(premio, i) in puestosPremiadosTorneoEnCurso"
            :key="i"
          >
            <div class="premios-row-division left">
              <p class="q-my-none"># {{ i + 1 }}</p>
            </div>
            <div class="premios-row-division rigth">
              <p class="q-my-none">$ {{ formatCurrency(premio[1]) }}</p>
            </div>
          </div>
        </div>
        <div class="q-pt-sm historial-de-torneos-btn-container">
          <q-btn
            class="historial-de-torneos-btn"
            @click="historialTorneosModal = true"
          >
            Historial de Torneos
          </q-btn>
        </div>
      </div>

      <!-- <q-expansion-item
        expand-separator
        icon="info"
        label="Informacion del Torneo"
        >
        <q-card>
          <q-card-section>
            <div class="flex justify-center column items-center">
              <p class="q-my-none">
                Fecha: <strong>{{ torneoEnCurso.fecha }}</strong>
              </p>
              <p class="q-my-none">
                Precio de entrada/reenganche:
                <strong>$ {{ formatCurrency(torneoEnCurso.entrada) }}</strong>
              </p>
              <p class="q-my-none">
                Comision para el Dealer:
                <strong
                  >$ {{ formatCurrency(torneoEnCurso.comisionDealer) }}</strong
                >
              </p>

              <div class="flex justify-between">
                <p class="q-my-none">
                  Total de Fichas:
                  <strong>{{
                    formatCurrency(torneoEnCurso.totalDeFichas)
                  }}</strong>
                </p>
                <p v-if="promedioDeFichasPorParticipante" class="q-my-none">
                  Promedio:
                  <strong>{{
                    formatCurrency(promedioDeFichasPorParticipante)
                  }}</strong>
                </p>
              </div>
              <p v-if="torneoEnCurso.pozo >= 0" class="q-my-none">
                Pozo:
                <strong>$ {{ formatCurrency(torneoEnCurso.pozo) }}</strong>
              </p>
              <p v-else class="q-my-none">Pozo: <strong>$ 0</strong></p>
              <p class="q-my-none">Premios:</p>
              <p class="q-my-none">
                <strong v-if="premios?.primerPuesto >= 0"
                  >1ro. $ {{ formatCurrency(premios?.primerPuesto) }}</strong
                >
                <strong v-else>1ro. $ 0</strong>
              </p>
              <p class="q-my-none">
                <strong v-if="premios?.segundoPuesto >= 0"
                  >2do. $ {{ formatCurrency(premios?.segundoPuesto) }}</strong
                >
                <strong v-else>2do. $ 0</strong>
              </p>
              <p class="q-my-none">
                <strong v-if="premios?.tercerPuesto >= 0"
                  >3ro. $ {{ formatCurrency(premios?.tercerPuesto) }}</strong
                >
                <strong v-else>3ro. $ 0</strong>
              </p>
              <p v-if="premios?.cuartoPuesto">
                <strong v-if="premios?.cuartoPuesto >= 0"
                  >4to. $ {{ formatCurrency(premios?.cuartoPuesto) }}</strong
                >
                <strong v-else>3ro. $ 0</strong>
              </p>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

  
      <div>
        <div class="flex justify-center">
          <h6 class="q-my-none">Participantes:</h6>
        </div>

        <div>
          <div
            class="flex justify-between"
            v-for="participante in participantesActivosEnTorneo"
          >
            <p class="q-my-none">{{ participante.nombre }}</p>
            <div class="flex items-center">
              <q-icon
                v-if="usuarioEsCreador"
                @click="setParticipanteAAgregarEntrada(participante)"
                name="add_circle"
              />
              <p class="q-my-none">
                $ {{ formatCurrency(participante.saldo) }}
              </p>
              <q-icon
                v-if="usuarioEsCreador"
                @click="setEliminarParticipanteDelTorneo(participante)"
                name="person_remove"
              />
            </div>
          </div>
        </div>
      </div>

  
      <div>
        <div class="flex justify-center">
          <h6 class="q-my-none">Participantes Eliminados:</h6>
        </div>

        <div>
          <div
            class="flex justify-between"
            v-for="participante in participantesEliminadosEnTorneo"
          >
            <p class="q-my-none">{{ participante.nombre }}</p>
            <div class="flex items-center">
              <p class="q-my-none">
                $ {{ formatCurrency(participante.saldo) }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <q-btn @click="finalizarTorneo">Finalizar</q-btn> -->
    </div>

    <div v-else>
      <div>
        <q-btn @click="setCreateTournamentModal"> Crear Torneo </q-btn>
      </div>
      <div>
        <p>No hay ningun torneo creado</p>
      </div>
    </div>

    <torneos-page-crear-torneo-modal />
    <torneos-page-torneo-activo />
    <torneos-page-agregar-entrada-modal />
    <torneos-page-eliminar-participante-del-torneo />
    <torneos-page-historial-torneos />
  </q-page>
</template>

<script lang="ts" setup>
import TorneosPageCrearTorneoModal from "src/pages/Torneos/TorneosPageCrearTorneoModal.vue";
import TorneosPageTorneoActivo from "./TorneosPageTorneoActivo.vue";
import TorneosPageAgregarEntradaModal from "./TorneosPageAgregarEntradaModal.vue";
import TorneosPageEliminarParticipanteDelTorneo from "./TorneosPageEliminarParticipanteDelTorneo.vue";
import { onMounted, provide, ref, watch, computed } from "vue";
import { storeToRefs } from "pinia";
import { useTorneosStore } from "stores/Torneos";
import { useAuthStore } from "stores/Auth";
import TorneosPageHistorialTorneos from "./TorneosPageHistorialTorneos.vue";

const torneosStore = useTorneosStore();
const { torneos } = storeToRefs(torneosStore);
const auth = useAuthStore();
const { usuario, usuarios } = storeToRefs(auth);

const createTournamentModalShow = ref(false);
const torneoPendienteModalShow = ref(false);
const date = ref("");
const entrada = ref("");
const agregarEntradaModalShow = ref(false);
const participanteAAgregarEntrada = ref({});
const pozo = ref(0);
const puestosPremiados = ref("");
const comisionDealer = ref("");
const eliminarParticipanteDelTorneoModalShow = ref(false);
const participanteAEliminarDelTorneo = ref({});
const cantidadDeFichas = ref("");
const totalDeFichas = ref("");

const setParticipanteAAgregarEntrada = (participante) => {
  agregarEntradaModalShow.value = true;
  participanteAAgregarEntrada.value = participante;
};
const setCreateTournamentModal = () => {
  createTournamentModalShow.value = true;
  entrada.value = "";
  date.value = "";
  puestosPremiados.value = "";
  comisionDealer.value = "";
  cantidadDeFichas.value = "";
};

const setEliminarParticipanteDelTorneo = (participante) => {
  eliminarParticipanteDelTorneoModalShow.value = true;
  participanteAEliminarDelTorneo.value = participante;
};

const historialTorneosModal = ref(false);

provide('historialTorneosModal', historialTorneosModal)
provide("agregarEntradaModalShow", agregarEntradaModalShow);
provide("participanteAAgregarEntrada", participanteAAgregarEntrada);
provide("entrada", entrada);
provide("date", date);
provide("createTournamentModalShow", createTournamentModalShow);
provide("torneoPendienteModalShow", torneoPendienteModalShow);

provide("pozo", pozo);
provide("puestosPremiados", puestosPremiados);
provide("comisionDealer", comisionDealer);
provide(
  "eliminarParticipanteDelTorneoModalShow",
  eliminarParticipanteDelTorneoModalShow
);
provide("participanteAEliminarDelTorneo", participanteAEliminarDelTorneo);
provide("cantidadDeFichas", cantidadDeFichas);
provide("totalDeFichas", totalDeFichas);


const torneoEnCurso = computed(() => {
  if (torneos.value) {
    return torneos.value.filter((t) => t.status === 'en curso');
  }
});

const torneoPendiente = computed(() => {
  if (torneos.value) {
    return torneos.value.filter((t) => t.status === 'pendiente');
  }
});

function formatCurrency(number: number) {
  return new Intl.NumberFormat("es-CL").format(number);
}

const usuarioEsCreador = computed(() => {
  if (usuario.value) {
    const usuarioCreadorEncontrado =
      torneoEnCurso.value[0].createdBy == usuario.value.displayName;
    if (usuarioCreadorEncontrado) {
      return true;
    } else {
      return false;
    }
  }
});

provide("formatCurrency", formatCurrency);

const premios = computed(() => {
  if (torneoEnCurso.value[0].pozo) {
    if (
      torneoEnCurso.value[0].pozo >= 0 &&
      torneoEnCurso.value[0].pozo <= torneoEnCurso.value[0].puestosPremiados
    ) {
      return {
        primerPuesto: torneoEnCurso.value[0].pozo * 0.5,
        segundoPuesto: torneoEnCurso.value[0].pozo * 0.3,
        tercerPuesto: torneoEnCurso.value[0].pozo * 0.2,
      };
    } else {
      return {
        primerPuesto: Math.floor(torneoEnCurso.value[0].pozo * 0.45),
        segundoPuesto: Math.floor(torneoEnCurso.value[0].pozo * 0.275),
        tercerPuesto: Math.floor(torneoEnCurso.value[0].pozo * 0.175),
        cuartoPuesto: Math.floor(torneoEnCurso.value[0].pozo * 0.1),
      };
    }
  }
});

const finalizarTorneo = async () => {
  try {
    await torneosStore.finalizarTorneo(String(torneoEnCurso.value.numero));
  } catch (error) {
    console.log(error);
  }
};

const promedioDeFichasPorParticipante = computed(() => {
  if (participantesActivosEnTorneo.value.length) {
    return (
      torneoEnCurso.value[0].totalDeFichas /
      participantesActivosEnTorneo.value.length
    );
  }
});

provide("premios", premios);

const participantesActivosEnTorneo = computed(() => {
  if (torneoEnCurso.value[0].participantes) {
    return torneoEnCurso.value[0].participantes.filter((p) => !p.eliminado);
  } else {
    return [];
  }
});
const participantesEliminadosEnTorneo = computed(() => {
  if (torneoEnCurso.value.participantes) {
    return torneoEnCurso.value.participantes
      .filter((p) => p.eliminado)
      .sort((a, b) => b.eliminado - a.eliminado);
  } else {
    return [];
  }
});

const puestosPremiadosTorneoEnCurso = computed(() => {
  if (torneoEnCurso.value[0]) {
    return Object.entries(torneoEnCurso.value[0].puestosPremiados).sort(
      (a, b) => b[1] - a[1]
    );
  }
  else {
    return []
  }
});

provide("torneoPendiente", torneoPendiente);
provide("torneoEnCurso", torneoEnCurso);
provide("participantesActivosEnTorneo", participantesActivosEnTorneo);

function participanteDisplayName(nombreDeParticipante) {
  if (nombreDeParticipante.length > 12) {
    return nombreDeParticipante.substring(0, 12) + "...";
  } else {
    return nombreDeParticipante;
  }
}

</script>

<style scoped>
.page {
  height: 1vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-image: url("../../../public/icons/Futuristic2.jpg");
  background-position: center;
  background-size: contain;
}

.torneo-en-curso {
  width: 100%;
  display: flex;
  height: 100%;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.asientos-rigth-container {
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.asientos-rigth-column {
  height: 70%;
  width: 85%;
  display: flex;
  margin-bottom: 75px;
  flex-direction: column;
  justify-content: space-between;
}

.asientos-left-container {
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.asientos-left-column {
  height: 70%;
  width: 85%;
  margin-bottom: 75px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.asientos-top-container {
  display: flex;
  justify-content: center;
  height: 21%;
}

.asientos-top-column {
  width: 25%;

  height: 100%;
}

.asientos-bottom-container {
  display: flex;
  justify-content: center;
  height: 21%;
}

.asientos-bottom-column {
  width: 91%;

  height: 100%;
  display: flex;
  justify-content: space-evenly;
}



.participante-activo-display-info {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  background-color: black;
  color: white;
  height: 35%;
  box-shadow: 0px 0px 6px -1px white;
  border-radius: 10px;
  justify-content: center;
  height: 41%;
}
.participante-activo-display-photo {
  height: 50%;
  width: 54%;
  margin-bottom: 14px;
  box-shadow: 0px 0px 6px -1px white;
  border-radius: 27px;
  background-image: url(/icons/Futuristic2.jpg);
  background-position: center;
  background-size: cover;
}
.participante-activo {
  width: 28%;
  height: 83%;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  justify-content: center;
}
.participante-activo-top {
  width: 100%;
  height: 83%;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  justify-content: center;
}

.participante-activo-vertical {
  height: 25%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.participante-activo-vertical-photo {
  height: 50%;
  width: 54%;
  box-shadow: 0px 0px 6px -1px white;
  border-radius: 27px;
  background-image: url(/icons/Futuristic2.jpg);
  background-position: center;
  background-size: cover;
  margin-bottom: 15px;
}

.participante-inactivo-vertical-info {
 
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  justify-content: center;
  color: white;
  width: 100%;

  height: 42%;
  box-shadow: 0px 0px 6px -1px white;
  border-radius: 10px;
}
.participante-activo-vertical-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  color: white;
  width: 100%;
  justify-content: center;
  height: 42%;
  box-shadow: 0px 0px 6px -1px white;
  border-radius: 10px;
}

.historial-torneos-btn-container {
  margin-top: 20px;
}

.historial-torneos-btn {
  background-color: black;
  color: white;
}

.torneo-en-curso-info {
  width: 75%;
  display: flex;
  height: 90%;
  background-color: rgba(0, 0, 0, 0.909);
  color: white;
  border-radius: 125px;
  box-shadow: 0px 0px 6px 1px red;
  justify-content: center;
  align-items: center;
}

.torneo-en-curso-pozo {
  background: -webkit-radial-gradient(
    #fedb37 0%,
    #fdb931 8%,
    #9f7928 100%,
    #8a6e2f 67%,
    transparent 80%
  );
  background-clip: border-box;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bolder;
}

.premios-row {
  box-shadow: 0px 3px 5px -2px white;
  border-radius: 5px;
  margin-bottom: 2px;
}

.premios-row-division {
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
}

.premios-row-divison-container {
  width: 45%;
}

.left {
  background: -webkit-radial-gradient(
    right bottom,
    #fedb37 0%,
    #fdb931 8%,
    #9f7928 100%,
    #8a6e2f 67%,
    transparent 79%
  );
  background-clip: border-box;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  font-size: 15px;
  width: 30%;
}
.rigth {
  width: 70%;
}

.historial-de-torneos-btn-container {
  width: 57%;
  display: flex;
  justify-content: center;
}

.historial-de-torneos-btn {
  background: radial-gradient(
      ellipse farthest-corner at right bottom,
      #fedb37 0%,
      #fdb931 8%,
      #9f7928 100%,
      #8a6e2f 67%,
      transparent 80%
    ),
    radial-gradient(
      ellipse farthest-corner at left top,
      #ffffff 0%,
      #ffffac 0%,
      #d1b464 91%,
      #5d4a1f 100.5%,
      #5d4a1f 100%
    );
  color: black;
  width: 76%;
  font-size: 10px;
  font-weight: bold;
}
</style>
