<template>
  <q-dialog v-model="createTournamentModalShow">
    <q-card>
      <q-card-section class="q-py-none">
        <h6 class="q-my-none">Nuevo Torneo</h6>
      </q-card-section>
      <hr class="q-my-none" />
      <q-card-section class="q-pt-none">
        <q-input
          color="black"
          placeholder="Fecha del torneo"
          filled
          v-model="date"
          mask="date"
          :rules="['date']"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date color="black" v-model="date">
                  <div class="row items-center justify-end">
                    <q-btn color="black" v-close-popup label="Cerrar" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
          color="black"
          type="text"
          placeholder="Monto de entrada:"
          prefix="$"
          v-model="entrada"
        />
        <q-input
          color="black"
          type="text"
          placeholder="Cantidad de fichas por entrada"
          v-model="cantidadDeFichas"
        />
        <q-input
          color="black"
          type="text"
          placeholder="Pozo minimo para 4to lugar:"
          prefix="$"
          v-model="puestosPremiados"
        />
        <q-input
          color="black"
          type="text"
          placeholder="Comision para el Dealer:"
          prefix="$"
          v-model="comisionDealer"
        />
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          :disable="!date || !entrada || !puestosPremiados || !comisionDealer"
          @click="crearTorneo"
          label="crear"
          color="dark"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { inject, ref } from "vue";
import { useTorneosStore } from "stores/Torneos";
import { storeToRefs } from "pinia";
import { useAuthStore } from "stores/Auth";

const auth = useAuthStore();
const { usuario } = storeToRefs(auth);
const torneos = useTorneosStore();
const createTournamentModalShow = inject("createTournamentModalShow");
const date = inject("date");
const entrada = inject("entrada");
const puestosPremiados = inject("puestosPremiados");
const comisionDealer = inject("comisionDealer");
const pozo = inject("pozo");
const cantidadDeFichas = inject("cantidadDeFichas");

async function crearTorneo() {
  pozo.value = pozo.value - Number(comisionDealer.value);

  try {
    await torneos.crearTorneo(
      date.value,
      Number(entrada.value),
      usuario.value.displayName,
      Number(puestosPremiados.value),
      pozo.value,
      Number(comisionDealer.value),
      Number(cantidadDeFichas.value)
    );
  } catch (error) {
    console.log(error);
  } finally {
    entrada.value = "";
    date.value = "";
    puestosPremiados.value = "";
    comisionDealer.value = "";
    cantidadDeFichas.value = "";
  }
}
</script>
