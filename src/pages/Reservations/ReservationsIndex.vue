<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue';
import ContenedorComponent from '@/components/ContenedorComponent.vue';
import DivContainer from '@/components/DivContainer.vue';
import { computed, onMounted, ref, watchEffect } from 'vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import Paginator from '@/components/PaginatorComponent.vue';
import DataTable from '@/components/DataTable.vue';
import TableBody from '@/components/TableBody.vue';
import TableHead from '@/components/TableHead.vue';
import TD from '@/components/TD.vue';
import TH from '@/components/TH.vue';
import TR from '@/components/TR.vue';
import { getReservations } from './ReservationsRequest.js';
import { getGuests } from '../Guests/GuestRequest.js';
import ModalComponent from '@/components/ModalComponent.vue';
import ReservationsForm from './ReservationsForm.vue';

const modal = ref(false);
const loading = ref(false);
const action = ref(1);
const reservation = ref({});
const originalData = ref([]);
const filteredData = ref([]);
const reservations = ref([]);
const guests = ref([]);

// START PAGINATOR FUNCTIONS
const currentPage = ref(0);
const perPage = ref(process.env.VUE_APP_RECORDS_P_PAGE);

// Watch for changes in rooms and update originalData and filteredData
watchEffect(() => {
  originalData.value = [...reservations.value];
  filteredData.value = [...reservations.value];
});

const form = ref({
  fecha_entrada: '',
  fecha_salida: '',
});

const paginatedData = computed(() => {
  const start = currentPage.value * perPage.value;
  const end = start + perPage.value;
  return filteredData.value.slice(start, end);
});

// Function to move to the next page
function nextPage() {
  if (currentPage.value < Math.ceil(filteredData.value.length / perPage.value) - 1) {
    currentPage.value++;
  }
}

// Function to move to the previous page
function prevPage() {
  if (currentPage.value > 0) {
    currentPage.value--;
  }
}

// Function to move to the last page
function lastPage() {
  currentPage.value = Math.ceil(filteredData.value.length / perPage.value) - 1;
}

// Function to move to the first page
function firstPage() {
  currentPage.value = 0;
}
// END PAGINATOR FUNCTIONS

// Function to toggle modal and set guest details
const toggleModal = (act, reserv = {}) => {
  modal.value = !modal.value;
  action.value = act;
  reservation.value = reserv;

};


// Fetch rooms data on component mount
onMounted(async () => {
  try {
    loading.value = true;
    var response = await getReservations();
    reservations.value = response.data;
    const responseGuest = await getGuests();
    guests.value = responseGuest.data;
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.error(error);
  }
  const start_date_element = document.getElementById('filter-range-start')
    start_date_element.addEventListener('changeDate', (e) => {
        form.value.fecha_entrada = e.target.value;
        if (form.value.fecha_salida) {
          getReservations(form.value.fecha_entrada, form.value.fecha_salida).then((response) => {
            reservations.value = response.data;
          });
        }
    });
    const end_date_element = document.getElementById('filter-range-end')
    end_date_element.addEventListener('changeDate', (e) => {
        form.value.fecha_salida = e.target.value;
        if (form.value.fecha_entrada) {
          getReservations(form.value.fecha_entrada, form.value.fecha_salida).then((response) => {
            reservations.value = response.data;
          });
        }
    });
});

const updateReservations = (data) => {
  if (action.value === 1) {
    reservations.value = [...reservation.value, data];
  } else {
    const index = reservations.value.findIndex((g) => g.id === data.id);
    reservations.value[index] = data;
  }
};
</script>

<template>
  <AuthLayout>
    <ContenedorComponent>
      <DivContainer>
        <template #header>
          <div class="header">
            <div class="col-start-1 col-end-1"><h1>Reservations</h1></div>
            <div>
              <div class="flex justify-end">
                <div id="date-range-picker" date-rangepicker class="flex items-center mr-2">
                  <div class="relative">
                      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                          </svg>
                      </div>
                      <input id="filter-range-start" name="start" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Fecha de inicio">
                  </div>
                  <span class="mx-4 text-gray-500">a</span>
                  <div class="relative">
                      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                          </svg>
                      </div>
                      <input id="filter-range-end" name="end" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Fecha de salida">
                  </div>
              </div>
                <button @click="toggleModal(1)" class="bg-cian hover:bg-cian-hover focus:outline-none focus:ring-2 focus:ring-indigo-white text-white font-bold py-3 px-3 rounded-full mr-1">
                  <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </template>
        <DataTable>
            <TableHead>
              <TR>
                <TH>Huesped</TH>
                <TH>Habitación/Habitaciones</TH>
                <TH>Fecha de entrada</TH>
                <TH>Fecha de salida</TH>
                <TH>CheckIN</TH>
              </TR>
            </TableHead>
            <TableBody>
              <TR v-for="reserva in paginatedData" :key="reserva.id">
                <TD>{{ reserva.huesped.nombre }}</TD>
                <TD>
                  <ul>
                    <li v-for="habitacion in reserva.habitaciones" :key="habitacion.id">{{ habitacion.numero }}</li>
                  </ul>
                </TD>
                <TD>{{ reserva.fecha_entrada }}</TD>
                <TD>{{ reserva.fecha_salida }}</TD>
                <TD v-if="reserva.hora_entrada">
                  <svg class="w-6 h-6 text-green" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5"/>
                  </svg>
                </TD>
                <TD v-if="!reserva.hora_entrada">
                  <svg class="w-6 h-6 text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                  </svg>
                </TD>
              </TR>
            </TableBody>
          </DataTable>
        <div>
          <div class="flex justify-center mt-5">
            <!-- Paginator component with props -->
            <Paginator :currentPage="currentPage" :totalPages="Math.ceil(filteredData.length / perPage)" @next-page="nextPage" @prev-page="prevPage" @first-page="firstPage" @last-page="lastPage"/>
          </div>
        </div>
      </DivContainer>
    </ContenedorComponent>
    <!-- LoadingComponent for showing loading state -->
    <LoadingComponent :show="loading" />
  </AuthLayout>
  <ModalComponent :show="modal" max-width="6xl" @close="toggleModal(action)">
    <template #default>
      <div class="p-6">
        <!-- GuestForm component for CRUD operations -->
        <ReservationsForm @close-modal="toggleModal(action)" :guests="guests" @new-reservation="updateReservations" :reservation="reservation" :action="action"></ReservationsForm>
        <div class="mt-4 flex justify-end">
          <button @click="toggleModal()" class="bg-cian hover:bg-cian-hover focus:outline-none focus:ring-2 focus:ring-indigo-white text-white font-bold py-3 px-3 rounded-lg mr-1">Cerrar</button>
        </div>
      </div>
    </template>
  </ModalComponent>
  <!-- ModalComponent for displaying modal -->
</template>

<style scoped>
.header {
  display: grid;
  grid-template-columns: 14rem 1fr;
}
</style>
