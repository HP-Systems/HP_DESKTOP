<script setup>
import { onMounted, ref, defineProps, defineEmits } from 'vue';
import InputComponent from '@/components/InputComponent.vue';
import { asignNFC } from './ReservationsRequest';
import LoadingComponent from '@/components/LoadingComponent.vue';
import Swal from 'sweetalert2';
import FormValidator from '@/FormValidator';
let loading = ref(false);
const title = ref('Agregar Huesped');
// eslint-disable-next-line no-unused-vars
const emit = defineEmits(['asignedNFC', 'closeModal']);

const props = defineProps({
    action: {
        type: Number,
        default: 1,
    },
    reservation: {
        type: Object,
        default: () => ({
            id: ''
        }),
    },
})


const validaciones = {
    tarjeta: {
        required: true,
        number: true,
        max: 10,
        min: 8,
    },
};
const validator = new FormValidator(validaciones);

const form = ref({
    tarjeta: '',
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
})


const submit = () => {
    if (!validarFormulario()) {
        return;
    }
    try{
        loading.value = true;
        if (props.action === 1) {
            console.log(form.value);
            asignNFC(props.reservation.id,form.value).then((response) => {
                loading.value = false;
                emit('closeModal');
                console.log(response);
                ok(response.msg || 'Vinculación éxitosa');
            }).catch((error) => {
                loading.value = false;
                er(error.response.data.msg || 'Error al asignar');
                errors.value = error.response.data.error;
                
            });
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
        timer: 2000,
    });
    emit('asignedNFC', form.value);
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
        <div class="w-5/6 columns-1">
            <div class="w-full p-2">
                <InputComponent label="UUID:" id="tarjeta" class="w-full mt-1 mr-6 block-sm" v-model="form.tarjeta" :error="errors && errors.tarjeta && errors.tarjeta[0] !== null ? errors.tarjeta[0] : ''"/>
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