<script setup>
// eslint-disable-next-line no-undef
const props = defineProps({
    title: String,
    tipo: String,
    descripcion: String,
    price: String,
    image: String,
    rating: Number,
    capacidad: Number,
    disponibles: Number,
});
</script>
<template>
<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="w-full h-48 object-cover object-center p-4" :src="'http://qa.sesystems.online/images/'+props.image" alt="Imagen Habitación" />
    </a>
    <div class="px-6 py-4">
        <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2">{{ props.descripcion }}</h5>
        <p class="text-gray-700 dark:text-gray-300 mb-2">Capacidad: {{ props.capacidad }}</p>
        <p class="text-gray-700 dark:text-gray-300 mb-2">Disponibles: {{ props.disponibles }}</p>
        <div class="flex items-center justify-between mt-4">
            <span class="text-2xl font-bold text-gray-900 dark:text-white">${{ props.price }}</span>
            <slot />
        </div>
    </div>
</div>
</template>