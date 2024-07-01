<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue';
import ContenedorComponent from '@/components/ContenedorComponent.vue';
</script>

<template>
  <AuthLayout>
    <ContenedorComponent>
      <div class="grid grid-cols-2 grid-rows-2 gap-4">
        <div class="col-span-1 rounded-lg row-span-1 bg-white">
          Contenido Cuadrante 1
        </div>
        <div class="col-span-1 rounded-lg row-span-1 bg-white ">
          Contenido Cuadrante 2
        </div>
        <div class="col-span-1 rounded-lg row-span-1 bg-white">
          Contenido Cuadrante 3
        </div>
        <div class="col-span-1 rounded-lg row-span-1 bg-white">
          Contenido Cuadrante 4
        </div>
      </div>
    </ContenedorComponent>
  </AuthLayout>
</template>

<style scoped>
.grid {
  min-height: 100vh;
  width: 100%;
  height: 100%; /* Ajusta la altura según sea necesario */
}
</style>