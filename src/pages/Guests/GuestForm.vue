<script setup>
import { onMounted, ref, defineProps, defineEmits } from 'vue';
import InputComponent from '@/components/InputComponent.vue';
import { registerGuest, updateGuest } from './GuestRequest';
import LoadingComponent from '@/components/LoadingComponent.vue';
import Swal from 'sweetalert2';
import FormValidator from '@/FormValidator';
let loading = ref(false);
const title = ref('Agregar Huesped');
// eslint-disable-next-line no-unused-vars
const emit = defineEmits(['newGuest', 'closeModal', 'editGuest']);

const props = defineProps({
    action: {
        type: Number,
        default: 1,
    },
    guest: {
        type: Object,
        default: () => ({
            id: '',
            nombre: '',
            email: '',
            telefono: '',
            apellido: '',
        }),
    },
})


const validaciones = {
    nombre: {
        required: true,
    },
    apellido: {
        required: true,
    },
    email: {
        required: true,
    },
    telefono: {
        required: true,
        number: true,
        min: 10,
    },
};
const validator = new FormValidator(validaciones);

const form = ref({
    id: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
});

const errors = ref({
});

const validarFormulario = () => {
    errors.value = validator.validar(form.value);
    for (const key in errors.value) {
        if (errors.value[key].length > 0) {
            return false;
        }
    }
    return true;
}

onMounted(() => {
    if (props.action === 2) {
        title.value = 'Editar Huesped';
    }
    Object.keys(props.guest).forEach((key) => {
        form.value[key] = props.guest[key];
    });
})


const submit = () => {
    if (!validarFormulario()) {
        return;
    }
    try{
        loading.value = true;
        if (props.action === 1) {
            registerGuest(form.value).then((response) => {
                loading.value = false;
                emit('closeModal');
                ok(response.data.message || 'Guardado correctamente');
            }).catch((error) => {
                loading.value = false;
                errors.value = error.response.data.error;
                console.log(errors.value);
            });
        }
        if (props.action === 2) {
            loading.value = true;
            updateGuest(form.value, props.guest.id).then((response) => {
                loading.value = false;
                emit('closeModal');
                ok(response.data.message || 'Editado correctamente');
            }).catch((error) => {
                loading.value = false;
                errors.value = error.response.data.error;
                console.log(errors.value);
            });
            loading.value = false;
        }
    }
    catch (error) {
        loading.value = false;
        emit('closeModal');
        er(error.response.data.message || 'Error al guardar');
    }
}

const ok = (msj) => {
    Swal.fire({
        icon: 'success',
        title: msj || 'Guardado correctamente',
        showConfirmButton: false,
        timer: 1700,
    });
    emit('newGuest', form.value);
    loading.value = false;
}

const er = (msj) => {
    Swal.fire({
        icon: 'error',
        title: msj || 'Error al guardar',
    });
    loading.value = false;
}

</script>
<template>
    <form @submit.prevent="submit" enctype="multipart/form-data">
    <div class="flex flex-col items-center justify-center w-full mt-5">
        <h1 class="flex justify-center text-2xl font-semibold mb-5">{{ title }}</h1>
        <div class="w-5/6 columns-2">
            <div class="w-full p-2">
                <InputComponent label="Nombre:" id="nombre" class="w-full mt-1 mr-6 block-sm" v-model="form.nombre" :error="errors.nombre && errors.nombre[0] !== null ? errors.nombre[0] : ''"/>
            </div>
            <div class="w-full p-2">
                <InputComponent label="Apellido:" id="Apellido" class="w-full mt-1 mr-6 block-sm" v-model="form.apellido" :error="errors.apellido && errors.apellido[0] !== null ? errors.apellido[0] : ''"/>
            </div>
        </div>
        <div v-if="action == 2" class="w-5/6 columns-1">
            <div class="w-full p-3">
                <InputComponent label="Teléfono:" id="telefono" class="w-full mt-1 mr-6 block-sm" :maxLength="10" v-model="form.telefono"  :error="errors.telefono && errors.telefono[0] !== null ? errors.telefono[0] : ''"/>
            </div>
        </div>
        <div v-if="action == 1" class="w-5/6 columns-2">
            <div class="w-full p-2">
                <InputComponent type="email" label="Email:" id="nombre" class="w-full mt-1 mr-6 block-sm" v-model="form.email" :error="errors.email && errors.email[0] !== null ? errors.email[0] : ''"/>
            </div>
            <div class="w-full p-3">
                <InputComponent label="Teléfono:" id="telefono" class="w-full mt-1 mr-6 block-sm" :maxLength="10" v-model="form.telefono"  :error="errors.telefono && errors.telefono[0] !== null ? errors.telefono[0] : ''"/>
            </div>
        </div>
    </div>
    <div class="flex justify-center mt-5">
        <button type="submit" class="bg-cian hover:bg-cian-hover focus:outline-none focus:ring-2 focus:ring-indigo-white text-white font-bold py-2 px-10 rounded-md mr-1">Guardar</button>
    </div>
    </form>
    <LoadingComponent :show="loading"/> 
</template>
<style>

</style>