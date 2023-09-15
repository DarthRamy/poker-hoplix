<template>
  <q-dialog v-model="agregarEntradaModalShow">
    <q-card>
      <q-card-section>
        <p class="q-my-none">
          Deseas agregarle 1 reenganche a
          <strong>{{ participanteAAgregarEntrada.nombre }}</strong> por el valor
          de <strong>$ {{ formatCurrency(torneoEnCurso.entrada) }} </strong> ?
        </p>
      </q-card-section>
      <q-card-actions>
        <q-btn @click="agregarEntrada"> Aceptar </q-btn>
        <q-btn v-close-popup>Cancelar</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { inject, ref } from "vue";
import { useTorneosStore } from "stores/Torneos";

const torneosStore = useTorneosStore();

const agregarEntradaModalShow = inject("agregarEntradaModalShow");
const participanteAAgregarEntrada = inject("participanteAAgregarEntrada");
const torneoEnCurso = inject("torneoEnCurso");
const pozo = inject('pozo');
const formatCurrency = inject('formatCurrency');
const totalDeFichas = inject('totalDeFichas')

const agregarEntrada = async () => {
    pozo.value = torneoEnCurso.value.pozo + Number(torneoEnCurso.value.entrada)
    totalDeFichas.value = torneoEnCurso.value.totalDeFichas + Number(torneoEnCurso.value.fichasPorEntrada)
  torneoEnCurso.value.participantes.forEach((p) => {
    if (p.nombre === participanteAAgregarEntrada.value.nombre) {
      p.saldo = p.saldo - torneoEnCurso.value.entrada;
    }
  });

  try {

    await torneosStore.agregarEntrada(
      String(torneoEnCurso.value.numero),
      torneoEnCurso.value.participantes,
      pozo.value,
      totalDeFichas.value
    );
  } catch (error) {
    console.log(error);
  } finally {
    agregarEntradaModalShow.value = false;
  }
};
</script>
