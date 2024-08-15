<script setup>
import { onMounted, ref, defineProps, defineEmits } from 'vue';
import InputComponent from '@/components/InputComponent.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import Swal from 'sweetalert2';
import FormValidator from '@/FormValidator';
import { obtainTiposNFC, registerNFC, updateNFC} from './NFCRequest';
import SelectInput from '@/components/SelectInput.vue';
let loading = ref(false);
const title = ref('Agregar Card');
// eslint-disable-next-line no-unused-vars
const emit = defineEmits(['newNFC', 'closeModal', 'editNFC']);
const tipos = ref([]);
const disabled = ref(false);
const props = defineProps({
    action: {
        type: Number,
        default: 1,
    },
    card: {
        type: Object,
        default: () => ({
            id: '',
            numero: '',
            status: '',
            tipo: '',
            tipoID: '',
        }),
    },
})

const validaciones = {
    numero: {
        required: true,
        number: true,
        max: 10,
        min: 10,
    },
    tipoID: {
        required: true,
        number: true,
    },
};
const validator = new FormValidator(validaciones);

const form = ref({
    id: '',
    numero: '',
    status: '',
    tipoID: '',
    tipo: '',
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
    loading.value = true;
    console.log(props.action);
    if (props.action === 2) {
        title.value = 'Editar Personal';
    }
    if(props.action === 2){
        disabled.value = true;
    }
    Object.keys(props.card).forEach((key) => {
        form.value[key] = props.card[key];
    });
    obtainTiposNFC().then((response) => {
        console.log(response.data);
        tipos.value = response.data;
        tipos.value.forEach((t) => {
            t.name = t.tipo;
        });
        loading.value = false;
    }).catch((error) => {
        loading.value = false;
        console.log(error);
    });
})


const submit = () => {
    if (!validarFormulario()) {
        console.log('Formulario invalido');
        return;
    }
    try{
        loading.value = true;
        if (props.action === 1) {
            registerNFC(form.value).then((response) => {
                loading.value = false;
                emit('closeModal');
                form.value.id= response.data.id;
                ok(response.data.message || 'Guardado correctamente');
            }).catch((error) => {
                loading.value = false;
                errors.value = error.response.data.error || '';
                console.log(errors.value);
            });
        }
        if (props.action === 2) {
            loading.value = true;
            updateNFC(form.value, props.card.id).then((response) => {
                loading.value = false;
                emit('closeModal');
                form.value.id= response.data.id;
                form.value.status = response.data.status;
                ok(response.data.message || 'Editado correctamente');
            }).catch((error) => {
                loading.value = false;
                errors.value = error.response.data.error || '';
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
    try {
        form.value.tipo = tipos.value.find((t) => String(t.id) === form.value.tipoID).name;
    } catch (error) {
        console.log(error);
    }
    emit('newNFC', form.value);
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
                <InputComponent :disabled="disabled" label="Numero:" id="numero" class="w-full mt-1 mr-6 block-sm" v-model="form.numero" :error="errors && errors.numero && errors.numero[0] !== null ? errors.numero[0] : ''"/>
            </div>
            <div class="w-full p-2">
                <SelectInput label="Tipo:" id="Tipo" class="w-full mt-1 mr-6 block-sm" v-model="form.tipoID" :data="tipos" :error="errors && errors.tipoID && errors.tipoID[0] !== null ? errors.tipoID[0] : ''"/>
            </div>
        </div>
        <div class="w-5/6 columns-1">
            <div class="w-full p-2">
                <SelectInput hidden :disabled="true" label="Status:" id="status" class="w-full mt-1 mr-6 block-sm" v-model="form.status" :data="statuses" :error="errors && errors.status && errors.status[0] !== null ? errors.status[0] : ''"/>
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
<script>
const statuses = [
    { id: 1, name: 'Activo' },
    { id: 2, name: 'Inactivo' },
];
</script>