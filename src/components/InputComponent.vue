<script setup>
import { onMounted, ref, defineEmits, defineProps, defineExpose } from 'vue';



const props = defineProps({
    label: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: 'text',
    },
    modelValue: {
        type: String,
        default: '',
    },
})

defineEmits(['update:modelValue']);

const input = ref(null);

onMounted(() => {
});

defineExpose({ focus: () => input.value.focus() });
</script>

<template>
    <div class="relative z-0 w-full mb-5 group">
        <input :type="props.type" :value="modelValue" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{{ props.label }}</label>
    </div>
</template>