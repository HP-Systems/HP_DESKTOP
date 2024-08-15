<script setup>
import { onMounted, ref, defineProps, defineEmits } from 'vue';
import { createReservation } from './ReservationsRequest';
import LoadingComponent from '@/components/LoadingComponent.vue';
import Swal from 'sweetalert2';
import FormValidator from '@/FormValidator';
import { initFlowbite } from 'flowbite';
import CardContainer from '@/components/CardContainer.vue';
import { obtenerHabitaciones } from './ReservationsRequest';
import AutoComplete from '@/components/AutoComplete.vue';
import DataTable from '@/components/DataTable.vue';
import TableHead from '@/components/TableHead.vue';
import TR from '@/components/TR.vue';
import TH from '@/components/TH.vue';

const loading = ref(false);
const title = ref('Reservar');
const emit = defineEmits(['newReservation', 'closeModal', 'editReservation']);
const habitaciones = ref([]);
const guests = ref([]);
var yesterday = new Date()
yesterday = `${(yesterday.getMonth() + 1).toString().padStart(2, '0')}/${yesterday.getDate().toString().padStart(2, '0')}/${yesterday.getFullYear()}`;
const guest = ref({});

const handleSelectedGuest = (gue) => {
    form.value.huespedID = gue.id;
    guest.value = gue;
    console.log(guest.value);
}

const props = defineProps({
    action: {
        type: Number,
        default: 1,
    },
    guests: {
        type: Object,
        default: () => ({
            id: '',
            nombre: '',
            email: '',
            telefono: '',
            apellido: '',
        }),
    },
    reservation: {
        type: Object,
        default: () => ({
            fecha_entrada: '',
            fecha_salida: '',
            habitaciones: [],
            huespedID: '',
            id: '',
            status: '',
        }),
    },
});

const validaciones = {
    fecha_entrada: {
        required: true,
        date: true,
    },
    fecha_salida: {
        required: true,
        date: true,
    },
    habitaciones: {
        required: true,
    },
    huespedID: {
        required: true,
        number: true,
    },
};

const getRoomValidaciones = {
    fecha_entrada: {
        required: true,
        date: true,
    },
    fecha_salida: {
        required: true,
        date: true,
    },
}
const validator = new FormValidator(validaciones);
const getRoomsValidator = new FormValidator(getRoomValidaciones);
const form = ref({
    fecha_entrada: '',
    fecha_salida: '',
    habitaciones: [],
    huespedID: '',
    huesped: guest.value,
});

const errors = ref({});

const validarFormulario = () => {
    errors.value = validator.validar(form.value);
    for (const key in errors.value) {
        if (errors.value[key].length > 0) {
            return false;
        }
    }
    return true;
}

const validarGetRooms = () => {
    const [year, month, day] = form.value.fecha_entrada.split('-');
      const formattedFechaEntrada = `${month}/${day}/${year}`;

      if (new Date(formattedFechaEntrada) < new Date(yesterday)) {
        errors.value.fecha_entrada = ['Fecha debe ser >= a hoy'];
        return false;
      }
    errors.value = getRoomsValidator.validar(form.value);
    for (const key in errors.value) {
        if (errors.value[key].length > 0) {
            return false;
        }
    }
    return true;
}

onMounted(() => {
    guests.value = props.guests;
    const start_date_element = document.getElementById('datepicker-range-start')
    start_date_element.addEventListener('changeDate', (e) => {
        form.value.fecha_entrada = e.target.value;
    });
    const end_date_element = document.getElementById('datepicker-range-end')
    end_date_element.addEventListener('changeDate', (e) => {
        form.value.fecha_salida = e.target.value;
    });
    initFlowbite();
    if (props.action === 2) {
        title.value = 'Editar Huesped';
    }
    Object.keys(props.reservation).forEach((key) => {
        form.value[key] = props.reservation[key];
    });
});

const getRooms = async () => {
    if (!validarGetRooms()) {
        return;
    }
    try {
        loading.value = true;
        const response = await obtenerHabitaciones(form.value);
        habitaciones.value = response.data;
        loading.value = false;
        // eslint-disable-next-line no-unused-vars
        habitaciones.value.forEach(habitacion => {
            habitacion.cantidad = 0;
        });
    } catch (error) {
        loading.value = false;
        errors.value = error.response ? error.response.data.error : [];
        console.error(error);
    }
}

const addRoom = (habitacion) => {
    if(habitacion.cantidad < habitacion.habitaciones.length) {
        habitacion.cantidad++;
        const selectedRoom = {
            id: habitacion.habitaciones[habitacion.cantidad - 1].id,
        }
        form.value.habitaciones.push(selectedRoom);
    }
}

const removeRoom = (habitacion) => {
    if(habitacion.cantidad > 0) {
        habitacion.cantidad--;
        form.value.habitaciones.pop();
    }
}

const submit = () => {
    if (!validarFormulario()) {
        return;
    }
    try{
        loading.value = true;
        if (props.action === 1) {
            console.log(form.value);
            const addOneDay = (dateStr) => {
            const date = new Date(dateStr);
            date.setDate(date.getDate() + 1); // Adds one day to the date
            return date.toISOString().split('T')[0]; // Returns the date in "YYYY-MM-DD" format
        };

        form.value.fecha_entrada = addOneDay(form.value.fecha_entrada);
        form.value.fecha_salida = addOneDay(form.value.fecha_salida);
            createReservation(form.value).then((response) => {
                loading.value = false;
                emit('closeModal');
                form.value = response.data;
                ok(response.data.message || 'Guardado correctamente');
            }).catch((error) => {
                loading.value = false;
                errors.value = error;
                console.log(errors.value);
            });
        }
        // if (props.action === 2) {
        //     loading.value = true;
        //     updateGuest(form.value, props.guest.id).then((response) => {
        //         loading.value = false;
        //         emit('closeModal');
        //         ok(response.data.message || 'Editado correctamente');
        //     }).catch((error) => {
        //         loading.value = false;
        //         errors.value = error.response.data.error;
        //         console.log(errors.value);
        //     });
        //     loading.value = false;
        // }
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
    form.value.huesped = guest.value;
    emit('newReservation', form.value);
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
            <div class="flex w-5/6 grid grid-cols-4">
                <div class="flex justify-center w-full col-span-3">              
                    <div id="date-range-picker" date-rangepicker class="flex items-center">
                        <div class="relative">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                </svg>
                            </div>
                            <input id="datepicker-range-start" name="start" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Fecha de inicio">
                            <span v-if="errors.fecha_entrada" class="text-red-500 text-xs mt-1 absolute">
                                {{ errors.fecha_entrada[0] }}
                            </span>
                        </div>
                        <span class="mx-4 text-gray-500">a</span>
                        <div class="relative">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                </svg>
                            </div>
                            <input id="datepicker-range-end" name="end" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Fecha de salida">
                            <span v-if="errors.fecha_salida" class="text-red-500 text-xs mt-1 absolute">
                                {{ errors.fecha_salida[0] }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="w-full p-3">
                    <div class="flex justify-center">
                        <button @click="getRooms" type="button" class="bg-cian hover:bg-cian-hover focus:outline-none focus:ring-2 focus:ring-indigo-white text-white font-bold py-2 px-10 rounded-md mr-1">Obtener</button>
                    </div>
                </div>
            </div>
            <div class="w-5/6 grid grid-cols-3 grid-rows-[60px_1fr] bg-gray-100 rounded-lg">
                <div class="w-full col-span-3 h-[20vh] p-3">
                    <AutoComplete :value="String(guest)" :show-propiertie="'nombre'" :placeholder="'Seleccionar Huesped'" :items="guests" @select="handleSelectedGuest" />
                </div>
                <div class="w-full col-span-3 p-3">
                    <DataTable>
                        <TableHead>
                        <TR>
                            <TH>Nombre: {{ guest.nombre }}</TH>
                        </TR>
                        <TR>
                            <TH>Apellido: {{ guest.apellido }}</TH>
                        </TR>
                        <TR>
                            <TH>Email: {{ guest.email }}</TH>
                        </TR>
                        <TR>
                            <TH>Telefono: {{ guest.telefono }}</TH>
                        </TR>
                        </TableHead>
                    </DataTable>
                    <span v-if="errors.huespedID" class="text-red-500 text-xs mt-1 absolute">
                        {{ errors.huespedID[0] }}
                    </span>
                </div>
            </div>
            <div class="w-5/6">
                <div class="grid grid-cols-3 gap-4 w-full p-3">
                    <CardContainer v-for="habitacion in habitaciones" :disponibles="habitacion.habitaciones.length" 
                    :key="habitacion.id" 
                    :title="habitacion.tipo" 
                    :descripcion="habitacion.descripcion" 
                    :price="habitacion.precio_noche" 
                    :image="habitacion.habitaciones[0].imagen" 
                    :capacidad="habitacion.capacidad">
                    <div class="flex content-center">
                        <div @click="removeRoom(habitacion)">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/>
                            </svg>
                        </div>
                        <span >{{ habitacion.cantidad }}</span>
                        <div @click="addRoom(habitacion)">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                            </svg>
                        </div>
                    </div>
                    </CardContainer>
                </div>
            </div>
            <div v-if="props.action === 1" class="w-5/6 columns-2">
            </div>
        </div>
        <div class="flex justify-center mt-5">
            <button type="submit" class="bg-cian hover:bg-cian-hover focus:outline-none focus:ring-2 focus:ring-indigo-white text-white font-bold py-2 px-10 rounded-md mr-1">Guardar</button>
        </div>
    </form>
    <LoadingComponent :show="loading"/> 
</template>

<style>
/* Tu CSS aquí */
</style>
