<template>
  <q-page class="page">
    <div class="ranking-por-balance-container">
      <div class="ranking-por-balance-title">
        <h6 class="q-my-none">Ranking por Balance</h6>
      </div>
      <div class="ranking-por-balance-columns column-title">
        <div class="rank-left-place-container">
          <p class="q-my-none">#</p>
        </div>

        <p class="q-my-none">Nombre del jugador</p>
        <div class="rank-rigth-place-container">
          <p class="q-my-none">Balance</p>
        </div>
      </div>
      <div
        class="ranking-por-balance-columns shadow-box contend"
        v-for="(user, i) in rankingPorBalance"
        :key="i"
      >
        <div class="rank-left-place-container">
          <p class="q-my-none">{{ i + 1 }}</p>
        </div>
        <p class="q-my-none">{{ user.displayName }}</p>
        <div class="rank-rigth-place-container">
          <p :style="{ color: user.balance < 0 ? 'red' : 'white' }" class="q-my-none">$ {{ formatCurrency(user.balance) }}</p>
        </div>
      </div>
    </div>
    <div class="ranking-por-putnos-container">
      <div class="ranking-por-puntos-title">
        <h6 class="q-my-none">Ranking por Puntos</h6>
      </div>
      <div class="ranking-por-balance-columns column-title">
        <div class="rank-left-place-container">
          <p class="q-my-none">#</p>
        </div>

        <p class="q-my-none ">Nombre del jugador</p>
        <div class="rank-rigth-place-container">
          <p class="q-my-none">Puntos</p>
        </div>
  
      </div>
      <div
        class="ranking-por-balance-columns shadow-box contend"
        v-for="(user, i) in rankingPorPuntos"
        :key="i"
      >
      <div class="rank-left-place-container">
          <p class="q-my-none">{{ i + 1 }}</p>
        </div>
        <p class="q-my-none absolute-">{{ user.displayName }}</p>
        <div class="rank-rigth-place-container">
          <p class="q-my-none"> {{ user.puntosGanadosEnTorneos }}</p>
        </div>
       
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { useTorneosStore } from "stores/Torneos";
import { useAuthStore } from "stores/Auth";
import { storeToRefs } from "pinia";
import { ref, computed, onMounted, watch } from "vue";

const torneosStore = useTorneosStore();
const auth = useAuthStore();
const { torneos } = storeToRefs(torneosStore);
const { usuarios } = storeToRefs(auth);
const rankingPorPuntos = ref([]);

const rankingPorBalance = computed(() => {
  if (usuarios.value) {
    return usuarios.value.sort((a, b) => b.balance - a.balance);
  }
});

const setRankingDePuntos = () => {
  if (usuarios.value) {
    return (rankingPorPuntos.value = usuarios.value.sort(
      (a, b) => b.puntosGanadosEnTorneos - a.puntosGanadosEnTorneos
    ));
  }
};

onMounted(() => {
  setRankingDePuntos();
});
watch(usuarios, () => {
  setRankingDePuntos();
});

function formatCurrency(number: number) {
  return new Intl.NumberFormat("es-CL").format(number);
}
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

.ranking-por-balance-container {
  width: 80%;
  height: 45%;
  box-shadow: 0px 0px 6px 1px red;
  background-color: rgba(0, 0, 0, 0.909);
  color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ranking-por-balance-title {
  color: rgb(218, 165, 32); 
}

.ranking-por-puntos-title {
  color: rgb(218, 165, 32);
}
.ranking-por-putnos-container {
  width: 80%;
  height: 45%;
      box-shadow: 0px 0px 6px 1px red;
  background-color: rgba(0, 0, 0, 0.909);
  color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ranking-por-balance-columns {
  display: flex;
  width: 100%;
  align-items: center;
  height: 25px;
  justify-content: space-between;
}

.column-title {
  background-color: rgb(255 0 0 / 43%);
  font-size: 18px;
}

.contend {
  box-shadow: 0px 3px 5px -2px white;
}

.rank-left-place-container {
  box-shadow: 3.3px 0px 3px -2px white;
  width: 75px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.rank-rigth-place-container {
  box-shadow: -3.3px 0px 3px -2px white;
  width: 75px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.top {
  top: 4px;
}
</style>
