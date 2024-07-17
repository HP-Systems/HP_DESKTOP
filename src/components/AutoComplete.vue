<script setup>
import { ref, computed, defineProps, defineEmits, onMounted } from 'vue';

const filter = ref('');
const isFocused = ref(false);
const selectedItem = ref('');  // Variable para el nombre del ítem seleccionado
const displayValue = ref('');  // Variable para el texto mostrado en el input

const props = defineProps({
    items: {
        type: Array,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    showPropiertie: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        default: ''
    }
});

onMounted(() => {
    selectedItem.value = props.value[props.showPropiertie];  // Inicializa el nombre del ítem seleccionado con el valor de props.value
    displayValue.value = selectedItem.value;  // Inicializa el texto mostrado en el input
});

const emit = defineEmits(['select']);

const selectItem = (item) => {
    emit('select', item);  // Emite el id del ítem seleccionado
    selectedItem.value = item[props.showPropiertie];  // Actualiza el nombre del ítem seleccionado
    displayValue.value = selectedItem.value;  // Actualiza el texto mostrado en el input
    isFocused.value = false;
    filter.value = '';  // Limpiar el filtro después de la selección
};

const updateFilter = (event) => {
    filter.value = event.target.value;
    displayValue.value = event.target.value;
};

const filteredItems = computed(() => {
    return props.items.filter((item) => {
        return Object.values(item).some((value) => {
            return String(value).toLowerCase().includes(filter.value.toLowerCase());
        });
    });
});
</script>

<template>
    <div class="relative">
        <input
            :value="displayValue"
            @input="updateFilter"
            @focus="isFocused = true"
            :placeholder="placeholder"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
        >

        <div v-if="isFocused" class="absolute z-20 bg-white shadow-lg w-full max-h-60 overflow-auto">
            <div v-for="item in filteredItems" :key="item.id" @click="selectItem(item)">
                <slot :item="item">
                    <div class="px-4 py-2 border-b border-gray-200">{{ item[props.showPropiertie] }}</div>
                </slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
.absolute {
    position: absolute;
}
.z-20 {
    z-index: 20;
}
.bg-white {
    background-color: white;
}
.shadow-lg {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
.max-h-60 {
    max-height: 10rem;  /* Ajustar según sea necesario */
}
.overflow-auto {
    overflow: auto;
}
</style>
