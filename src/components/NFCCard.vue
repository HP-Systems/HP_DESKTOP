<script setup>
// eslint-disable-next-line no-undef
const props = defineProps({
    title: String,
    tipo: String,
    descripcion: String,
    id: String,
    numero: String,
    rating: Number,
    persona: String,
    habitacion: String,
});
</script>
<template>
<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden dark:bg-gray-800 dark:border-gray-700">
    <div class="px-6 py-4">
        <p class="text-gray-700 dark:text-gray-300 mb-2 text-lg">Tipo: {{ props.tipo }}</p>
        <p class="text-gray-700 dark:text-gray-300 mb-2 text-lg">Numero: {{ props.numero }}</p>
        <div class="flex items-center justify-between mt-4">
            <slot />
        </div>
    </div>
</div>
</template>