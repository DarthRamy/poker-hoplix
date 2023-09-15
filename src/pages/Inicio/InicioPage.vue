<template>
  <q-page class="page">
    <div v-if="ultimoTorneo?.length" class="last-tournament-info">
      <div class="last-tournament-info-header">
        <h6 class="q-my-none">Torneo # {{ ultimoTorneo[0].numero }} info</h6>
      </div>

      <div class="info-section">
        <div class="flex column flex-center info-section-header-column">
          <p style="color: red" class="q-my-none">Fecha:</p>
          <p class="q-my-none" style="color: white; font-size: 18px">
            {{ ultimoTorneo[0].fecha }}
          </p>
        </div>
        <div class="flex column flex-center">
          <p style="color: red" class="q-my-none">Creado por:</p>
          <p class="q-my-none" style="color: white; font-size: 18px">
            {{ ultimoTorneo[0].createdBy }}
          </p>
        </div>
        <div class="flex column flex-center">
          <p style="color: red" class="q-my-none">Entrada:</p>
          <p class="q-my-none" style="color: white; font-size: 18px">
            $ {{ formatCurrency(ultimoTorneo[0].entrada) }}
          </p>
        </div>
      </div>
      <div class="premios-section">
        <div class="premios-section-pozo-title">
          <h5 class="q-my-none pozo">Pozo:</h5>
          <span style="color: white; font-size: 30px"
            >$ {{ formatCurrency(ultimoTorneo[0].pozo) }}</span
          >
        </div>

        <div class="premios-row-division-container">
          <div
            class="flex justify-around premios-row"
            v-for="(premio, i) in puestosPremiados"
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
      </div>

      <div class="tabla-clasificacion-container">
        <div class="tabla-de-clasificacion-title">
          <h6 class="q-my-none">TABLA DE CLASIFICACION</h6>
        </div>
        <div class="winner-picture">
          <div class="winner-picture-title">
            <div>
              <h6 class="q-my-none">
                # {{ tablaDeClasificacion[0].posicion }}
                {{ tablaDeClasificacion[0].nombre }}
              </h6>
            </div>
          </div>
          <div class="winner-picture-foto"></div>
          <div class="winner-picture-saldo">
            <h6 class="q-my-none">
              $ {{ formatCurrency(tablaDeClasificacion[0].saldo) }}
            </h6>
          </div>
        </div>
<div>


        <div
          class="ranking-por-balance-columns"
          v-for="(participante, i) in tablaDeClasificacionSinPrimerLugar"
          :key="i"
          :style="{ boxShadow: i == 8 ? 'none' : null }"
        >
          <div class="rank-left-place-container">
            <p class="q-my-none"># {{ participante.posicion }}</p>
          </div>
          <p class="q-my-none">{{ participante.nombre }}</p>
          <div class="rank-rigth-place-container">
            <p
              :style="{ color: participante.saldo < 0 ? 'red' : 'white' }"
              class="q-my-none"
            >
              $ {{ formatCurrency(participante.saldo) }}
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { onMounted, provide, ref, watch, computed } from "vue";
import { storeToRefs } from "pinia";
import { useTorneosStore } from "stores/Torneos";
import { useAuthStore } from "stores/Auth";

const torneosStore = useTorneosStore();
const { torneos } = storeToRefs(torneosStore);
const auth = useAuthStore();
const { usuario, usuarios } = storeToRefs(auth);

function formatCurrency(number: number) {
  return new Intl.NumberFormat("es-CL").format(number);
}

// const ultimoTorneo = ref({});

const ultimoTorneo = computed(() => {
  if (torneos.value) {
    return torneos.value.sort((a, b) => b.numero - a.numero);
  }
});



const puestosPremiados = computed(() => {
  if (ultimoTorneo.value[0]) {
    return Object.entries(ultimoTorneo.value[0].puestosPremiados);
  }
});

const tablaDeClasificacion = computed(() => {
  if (ultimoTorneo.value[0]) {
    return ultimoTorneo.value[0].participantes?.sort(
      (a, b) => a.posicion - b.posicion
    );
  }
});

const tablaDeClasificacionSinPrimerLugar = computed(() => {
  if (tablaDeClasificacion.value) {
    return tablaDeClasificacion.value?.slice(
      1,
      tablaDeClasificacion.value.length
    );
  }
});

const ultimoDeLaClasificacion = computed(() => {
  if (tablaDeClasificacion.value) {
  }
});
</script>

<style scoped>
.page {
  height: 1vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-image: url("/icons/Futuristic2.jpg");
  background-position: center;
  background-size: contain;
}
.winner-picture {
  width: 100%;
  height: 50%;

  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 3px 5px -2px white;
}

.info-section {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.last-tournament-info {
  width: 80%;
  height: 95%;
  box-shadow: 0px 0px 6px 1px red;
  background-color: rgba(0, 0, 0, 0.909);
  color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.last-tournament-info-header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.winner-picture-title {
  color: rgb(218, 165, 32);
  height: 20%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}
.winner-picture-saldo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20%;
  width: 100%;
}

.premios-row-division {
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
}

.premios-section-pozo-title {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 40%;
}

.tabla-de-clasificacion-title {
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
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}
.winner-picture-foto {
  height: 60%;
  width: 100%;
  background-image: url("/icons/fotoprueba.jpg");
  background-position: center;
  background-size: cover;
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

.pozo {
  color: rgb(218, 165, 32);
}
.rigth {
  width: 70%;
}
.premios-section {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-around;
}

.premios-row-division-container {
  width: 40%;
}
.premios-row {
  box-shadow: 0px 3px 5px -2px white;
  border-radius: 5px;
  margin-bottom: 2px;
}

.tabla-clasificacion-container {
  width: 100%;
  height: 65%;
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ranking-por-balance-columns {
  display: flex;
  box-shadow: 0px 3px 5px -2px white;
  width: 100%;
  align-items: center;
  height: 8%;
  justify-content: space-between;
}
.rank-left-place-container {
  box-shadow: 3.3px 0px 3px -2px white;
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.rank-rigth-place-container {
  box-shadow: -3.3px 0px 3px -2px white;
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
