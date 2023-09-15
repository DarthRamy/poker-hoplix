<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onMounted, watch } from 'vue';
import { useAuthStore } from './stores/Auth';
import { useTorneosStore } from './stores/Torneos';

const authStore = useAuthStore();
const torneosStore = useTorneosStore()

onMounted(async () => {
      authStore.init();
      authStore.fetchUsers();
      torneosStore.fetchTorneos()
    })

watch (authStore, () => {
  authStore.init();
 
})

    
</script>

