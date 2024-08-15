<script setup>
import ContenedorComponent from '@/components/ContenedorComponent.vue';
import DivContainer from '@/components/DivContainer.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { onMounted, ref, watchEffect } from 'vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import { getCleaners, getRooms, linkCleanerToRooms } from './CleanersRequest';
import TH from '@/components/TH.vue';
import DataTable from '@/components/DataTable.vue';
import TableBody from '@/components/TableBody.vue';
import TR from '@/components/TR.vue';
import TableHead from '@/components/TableHead.vue';
import TD from '@/components/TD.vue';
import AutoComplete from '@/components/AutoComplete.vue';
import InputComponent from '@/components/InputComponent.vue';
import FormValidator from '@/FormValidator';
import Swal from 'sweetalert2';

const loading = ref(false);
const originalData = ref([]);
const filteredData = ref([]);
const rooms = ref([]);
const cleaners = ref([]);
// const selectedCleaner = ref(null);
const selectedRooms = ref([]);

const errors = ref({
});

const validaciones = {
  tarjeta: {
    required: true,
    number: true,
    max: 10,
    min: 10,
  },
  personalID: {
    required: true,
    number: true,
  },
  habitacion_reservaIDs: {
    required: true,
  },
};
const validator = new FormValidator(validaciones);

const validarFormulario = () => {
    errors.value = validator.validar(form.value);
    for (const key in errors.value) {
        if (errors.value[key].length > 0) {
            return false;
        }
    }
    return true;
}

// Watch for changes in nfcCards and update originalData and filteredData
watchEffect(() => {
  originalData.value = [...rooms.value];
  filteredData.value = [...rooms.value];
});

onMounted(async () => {
  try {
    loading.value = true;
    const response = await getRooms();
    rooms.value = response.data;
    console.log('rooms', rooms.value);
    const response2 = await getCleaners();
    cleaners.value = response2.data;
    console.log('cleaners', cleaners.value);
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.error(error);
  }
});

const form = ref({
  personalID: '',
  tarjeta: '',
  habitacion_reservaIDs: [],
});

const addRoom = (room) => {
    selectedRooms.value.push(room);
    const index = rooms.value.findIndex(p => p.habitacion_reservaID === room.habitacion_reservaID);
    if (index !== -1) {
        rooms.value.splice(index, 1);
    }
    selectedRooms.value.sort((a, b) => a.numero - b.numero);
}

const removeRoom = (room) => {
    rooms.value.push(room);
    const index = selectedRooms.value.findIndex(p => p.habitacion_reservaID === room.habitacion_reservaID);
    if (index !== -1) {
        selectedRooms.value.splice(index, 1);
    }
    rooms.value.sort((a, b) => a.numero - b.numero);
}

const addAll = () => {
    rooms.value.forEach(element => {
        selectedRooms.value.push(element);
    });
    rooms.value = [];
}

const removeAll = () => {
    selectedRooms.value.forEach(element => {
        rooms.value.push(element);
    });
    selectedRooms.value = [];
}

const handleSelectedPersonal = (gue) => {
    form.value.personalID = gue.id;
}


const submit = () => {
    if (!validarFormulario()) {
        console.log('Formulario invalido');
        return;
    }
    const roomsArray = createArrayOfRooms(selectedRooms.value);
    form.value.habitacion_reservaIDs = roomsArray;
    console.log(form.value);
    try{
        loading.value = true;
        linkCleanerToRooms(form.value).then((response) => {
            loading.value = false;
            form.value.id= response.data.id;
            selectedRooms.value = [];
            ok(response.data.message || 'Guardado correctamente');
        }).catch((error) => {
            loading.value = false;
            er(error.response.data.msg || 'Error al guardar');
        });
    }
    catch (error) {
        loading.value = false;
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
    loading.value = false;
}

const er = (msj) => {
  Swal.fire({
    icon: 'error',
    title: msj || 'Error al guardar',
    showConfirmButton: false,
    timer: 1700,
  });
  loading.value = false;
}

const createArrayOfRooms = (rooms) => {
    const array = [];
    rooms.forEach((room) => {
        array.push(room.habitacion_reservaID);
    });
    return array;
}
</script>
<template>
<AuthLayout>
    <ContenedorComponent>
    <DivContainer>
        <template #header>
        <div class="header">
            <div class="col-start-1 col-end-1"><h1>Limpieza</h1></div>
            <div>
            <div class="flex justify-end">
            </div>
            </div>
        </div>
        <div class="w- flex justify-center">
        </div>
        <form @submit.prevent="submit" enctype="multipart/form-data" class="text-sm">
            <div class="flex flex-col items-center justify-center w-full mt-5">
              <div class="w-5/6 grid grid-cols-2">
              <div class="w-full p-3">
                <AutoComplete :value="String(form.personalID)" :show-propiertie="'empleado'" :placeholder="'Seleccionar Personal'" :items="cleaners" @select="handleSelectedPersonal" />
              </div>
              <div class="w-full p-2">
                <InputComponent label="Tarjeta:" id="tarjeta" class="w-full mt-1 mr-6 block-sm" v-model="form.tarjeta" :error="errors && errors.tarjeta && errors.tarjeta[0] !== null ? errors.tarjeta[0] : ''"/>
              </div>
            </div>
            </div>
            <div class="flex justify-center mt-5">
                <button type="submit" class="bg-cian hover:bg-cian-hover focus:outline-none focus:ring-2 focus:ring-indigo-white text-white font-bold py-2 px-10 rounded-md mr-1">Guardar</button>
            </div>
          </form>
        </template>
    </DivContainer>
    <DivContainer>
    <template #header>
      <div class="w-full grid grid-cols-2 gap-4">
        <div class="w-full p-2">
          <DataTable>
            <TableHead>
              <TH>Numero Habitación</TH>
              <TH>
                <button @click="addAll()">AGREGAR <i class="fa-solid fa-plus"></i></button>
              </TH>
            </TableHead>
            <TableBody>
              <TR v-for="(room, index) in rooms" :key="index">
                <TD>{{room.numero}}</TD>
                <TD>
                  <button @click="addRoom(room)">
                    <svg class="w-6 h-6 text-gray-800 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                    </svg>
                  </button>
                </TD>
              </TR>
            </TableBody>
          </DataTable>
        </div>
        <div class="w-full p-2">
          <DataTable>
            <TableHead>
              <TH>Numero Habitación</TH>
              <TH>
                <button @click="removeAll()">REMOVER <i class="fa-solid fa-minus"></i></button>
              </TH>
            </TableHead>
            <TableBody>
              <TR v-for="(room, index) in selectedRooms" :key="index">
                <TD>{{room.numero}}</TD>
                <TD>
                  <button @click="removeRoom(room)">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/>
                    </svg>
                  </button>
                </TD>
              </TR>
            </TableBody>
          </DataTable>
        </div>
      </div>
    </template>
    </DivContainer>
    </ContenedorComponent>
    <!-- LoadingComponent for showing loading state -->
    <LoadingComponent :show="loading" />
</AuthLayout>
<!-- ModalComponent for displaying modal -->
</template>
<script>
</script>