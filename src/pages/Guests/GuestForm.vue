<script setup>
import { onMounted, ref, defineProps } from 'vue';
import InputComponent from '@/components/InputComponent.vue';
import { registerGuest } from './GuestRequest';
import LoadingComponent from '@/components/LoadingComponent.vue';
let loading = ref(false);

const title = ref('Agregar Huesped');


const props = defineProps({
    action: {
        type: Number,
        default: 1,
    },
    guest: {
        type: Object,
        default: () => ({
            nombre: '',
            email: '',
            telefono: '',
        }),
    },
})

const form = ref({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
});

onMounted(() => {
    if (props.action === 2) {
        title.value = 'Editar Huesped';
    }
    Object.keys(props.guest).forEach((key) => {
        form.value[key] = props.guest[key];
    });
})

const submit = () => {
    loading.value = true;
    if (props.action === 1) {
        registerGuest(form.value).then((response) => {
            loading.value = false;
            console.log(response);
        }).catch((error) => {
            loading.value = false;
            console.error(error);
        });
    }
    if (props.action === 2) {
        console.log('Editar');
        loading.value = false;
    }
}

</script>
<template>
    <form @submit.prevent="submit" enctype="multipart/form-data">
    <div class="flex flex-col items-center justify-center w-full mt-5">
        <h1 class="flex justify-center text-2xl font-semibold mb-5">{{ title }}</h1>
        <div class="w-5/6 columns-2">
            <div class="w-full p-2">
                <InputComponent label="Nombre:" id="nombre" class="w-full mt-1 mr-6 block-sm" :model-value="form.nombre"/>
            </div>
            <div class="w-full p-2">
                <InputComponent label="Apellido:" id="Apellido" class="w-full mt-1 mr-6 block-sm" :model-value="form.apellido"/>
            </div>
        </div>
        <div class="w-5/6 columns-2">
            <div class="w-full p-2">
                <InputComponent type="email" label="Email:" id="nombre" class="w-full mt-1 mr-6 block-sm" v-model="form.email"/>
            </div>
            <div class="w-full p-2">
                <InputComponent label="Telefono:" id="telefono" class="w-full mt-1 mr-6 block-sm" v-model="form.telefono"/>
            </div>
        </div>
    </div>
    <div class="flex justify-center mt-5">
        <button @click="submit" type="submit" class="bg-cian hover:bg-cian-hover focus:outline-none focus:ring-2 focus:ring-indigo-white text-white font-bold py-2 px-10 rounded-md mr-1">Guardar</button>
    </div>
    </form>
    <LoadingComponent :show="loading"/> 
</template>
<style>

</style>