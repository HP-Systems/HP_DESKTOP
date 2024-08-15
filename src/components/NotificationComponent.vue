<script setup>
import { defineProps } from 'vue';
//eslint-disable-next-line
const emit = defineEmits(['disappear']);
const props = defineProps({
  show: Boolean,
  msg: String
});

const disappear = () => {
  emit('disappear');
};
</script>

<template>
  <div v-if="props.show" class="notification" @click="disappear"> 
    <div class="bg-cian w-full p-4 rounded-lg shadow-lg">
      <p class="text-lg text-gray-800">{{ props.msg }}</p>
    </div>
  </div>
</template>

<style scoped>
.notification {
  position: fixed;
  top: 2%; /* Si deseas que esté más cerca del borde superior */
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  max-width: 500px; /* Limita el tamaño máximo */
}

.disappear {
  animation: disappear 5s linear;
}
</style>
