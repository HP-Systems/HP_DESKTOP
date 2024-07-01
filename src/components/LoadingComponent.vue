<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  show: Boolean
});
</script>

<template>
  <div v-if="props.show" class="loading-overlay">
    <div class="loading-spinner">
      <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cian"></div>
    </div>
  </div>
</template>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo semi-opaco */
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-spinner {
  position: relative;
}

.border-cian {
  border-color: #00b4d8;
}

.w-32 {
  width: 8rem;
}

.h-32 {
  height: 8rem;
}

.border-t-2 {
  border-top-width: 2px;
}

.border-b-2 {
  border-bottom-width: 2px;
}

.rounded-full {
  border-radius: 9999px;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>