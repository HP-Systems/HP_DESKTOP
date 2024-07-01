<script setup>
import { ref } from 'vue';
import axios from 'axios';
import logo from '@/assets/Logo.png'; // Importar la imagen usando `import`
import { useRouter } from 'vue-router';
const email = ref('');
const password = ref('');
const msg = ref('');
const router = useRouter();
const loading = ref(false);

const login = async () => {
  if (!email.value || !password.value) {
    msg.value = 'Por favor, rellena todos los campos';
    return;
  }
  try {
    await axios.post(`${process.env.VUE_APP_API_URL}/login`, {
      email: email.value,
      password: password.value
    }).then(
      (response) => {
        localStorage.setItem('token', response.data.token);
        router.push('/dashboard');
      }
    );
  } catch (error) {
    msg.value = 'Credenciales incorrectas';
    console.error(error);
  }
}
</script>

<template>
  <div class="wrapper bg-gray-200">
    <div class="content rounded-lg border-gray-200 border-x border-y shadow-lg grid grid-rows-2">
      <div>
        <img :src="logo" alt="Cover" class="w-full h-full object-cover object-center rounded-t-lg" />
      </div>
      <div class="p-4">
        <form @submit.prevent="login" class="mt-4 ml-5 mr-5">
          <div class="mb-4">
            <label for="email" class="flex text-sm font-medium font-bold text-gray-700">Email</label>
            <input v-model="email" type="email" placeholder="Email" id="email" name="email" class="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cian focus:border-indigo-500 sm:text-sm" />
          </div>
          <div class="mb-4">
            <label for="password" class="flex text-sm font-medium font-bold text-gray-700">Password</label>
            <input v-model="password" type="password" placeholder="Password" id="password" name="password" class="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cian focus:border-indigo-500 sm:text-sm" />
          </div>
          <div class="mb-4">
            <button type="submit" class="w-full bg-cian hover:bg-cian-hover text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Login</button>
          </div>
          <span class="text-red-600" v-if="msg">{{ msg }}</span>
        </form>
      </div>
    </div>
  </div>
  <LoadingComponent :show="loading" />
</template>

<style scoped>
  .wrapper {
    margin-top: 0;
    display: grid;
    grid-template-columns: 1fr 450px 1fr;
    grid-template-rows: 1fr 600px 1fr;
    width: 100vw;
    height: 100vh; /* Asegúrate de que el contenedor tenga altura completa de la ventana */
  }
  .content {
    grid-column: 2 / span 1;/* Empieza en la segunda fila y ocupa tres filas */
    grid-row: 2 / span 1; /* Empieza en la segunda fila y ocupa tres filas */
    background-color: white;
  }
</style>