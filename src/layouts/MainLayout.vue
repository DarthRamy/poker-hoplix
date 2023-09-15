<template>
  <q-layout class="layout" view="hHh lpR fFf">
    <q-header bordered class="header" height-hint="98">
      <q-toolbar>
        <q-toolbar-title class="header-title">
          <h3 class="q-my-none">POKER HOPLIX</h3>
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="center">
        <q-route-tab class="q-route-tab" to="/" label="Inicio" />
        <q-route-tab to="/torneos" label="Torneos" />
        <q-route-tab to="/ranking" label="Ranking" />
      </q-tabs>
    </q-header>

    <q-page-container class="q-page-container-custom">
      <router-view />
    </q-page-container>

    <q-footer reveal bordered >
      <div class="footer-container">
        <q-btn v-if="!usuario" @click="loginWithGoogle" class="login-btn"
          ><p>Inicia sesion con</p>
          <q-avatar size="24px"> <img src="/icons/googlelogo.png" /></q-avatar
        ></q-btn>
        <div class="user-footer" v-else>
          <div class="display-user">
            <div class="user-image"></div>
            <p class="q-my-none">{{ user.displayName }}</p>
          </div>

          <div class="display-balance">
            <p class="q-my-none">Balance:</p>
            <p>
              $
              <span :style="{ color: user.balance < 0 ? 'red' : 'green' }">{{
                formatCurrency(user.balance)
              }}</span>
            </p>
          </div>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { useAuthStore } from "../stores/Auth";

import { storeToRefs } from "pinia";

const auth = useAuthStore();
const { usuario } = storeToRefs(auth);
const user = ref({});
async function loginWithGoogle() {
  try {
    await auth.loginWithGoogle();
  } catch (error) {
    console.log(error);
  }
}
watch(usuario, () => {
  user.value = usuario.value;
});
onMounted(() => {
  setInitialUsuarioState();
});

const setInitialUsuarioState = () => {
  if (usuario) {
    user.value = {
      displayName: usuario.displayName,
      photoUrl: usuario.photoUrl,
      balance: usuario.balance,
      saldo: usuario.saldo,
      email: usuario.email,
    };
  }
};

function formatCurrency(number: number) {
  return new Intl.NumberFormat("es-CL").format(number);
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Goldman&family=Iceberg&family=Mogra&family=Passero+One&family=Ranchers&family=Slackey&display=swap");

.layout {
  font-family: "Passero One", cursive;
  
}

.header {
  background-color: black;
  color: white;
  
}

.header-title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85px;
  text-shadow: 1px 2px 3px #ff0707;
}
.footer-container {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
}

.login-btn {
  width: 55%;
}
.login-btn p {
  margin: 0;
  margin-right: 15px;
}

.user-footer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-footer p {
  margin: 0;
}

.display-balance {
  font-size: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-right: 35px;
  height: 80%;
}

.display-user {
  font-size: 25px;

  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  height: 80%;
  width: 55%;
  margin-left: 15px;
}

.user-image {
  border: 2px solid red;
    width: 55px;
    height: 55px;
    border-radius: 30px;
    margin-right: 10px;
}
</style>
