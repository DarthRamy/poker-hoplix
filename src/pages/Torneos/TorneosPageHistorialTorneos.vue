<template>
  <q-dialog v-model="historialTorneosModal" transition-show="rotate" transition-hide="rotate">
    <q-card class="hisotiral-de-torneos-card">
      <q-card-section>
        <div class="text-h6 flex flex-center historial-de-torneos-card-title">Historial</div>
      </q-card-section>

      <q-separator />

      <q-card-section style="max-height: 50vh" class="scroll torneos-section">
        <div class="q-pb-sm torneo-seleccionado" v-for="torneo in historialDeTorneos" :key="torneo.numero">
          <q-btn class="flex flex-center torneo-seleccionado-btn">
            <p class="q-my-none q-pr-sm"># {{ torneo.numero }}</p>
            <p class="q-my-none">
              {{ torneo.fecha }}
            </p>
          </q-btn>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="Decline" color="primary" v-close-popup />
        <q-btn flat label="Accept" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { inject, computed } from "vue";
import { storeToRefs } from "pinia";
import { useTorneosStore } from "stores/Torneos";

const torneosStore = useTorneosStore();
const { torneos } = storeToRefs(torneosStore);

const historialTorneosModal = inject("historialTorneosModal");

const historialDeTorneos = computed(() => {
  if (torneos.value) {
    return torneos.value
      .filter((t) => t.status === "finalizado")
      .sort((a, b) => b.numbero - a.numero);
  } else {
    return [];
  }
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Goldman&family=Iceberg&family=Mogra&family=Passero+One&family=Ranchers&family=Slackey&display=swap");


.hisotiral-de-torneos-card {
    background-color: black;
    box-shadow: 0px 0px 6px 1px red;
    font-family: "Passero One", cursive;
}

.historial-de-torneos-card-title {
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
}

.torneo-seleccionado-container {
    background-color: black;
}

.torneo-seleccionado-btn {
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
}

.torneo-seleccionado {
    background-color: black;
}

</style>
