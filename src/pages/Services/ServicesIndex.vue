<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue';
import ContenedorComponent from '@/components/ContenedorComponent.vue';
import DivContainer from '@/components/DivContainer.vue';
import { computed, getCurrentInstance, onMounted, ref, watchEffect } from 'vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import Paginator from '@/components/PaginatorComponent.vue';
import DataTable from '@/components/DataTable.vue';
import TableBody from '@/components/TableBody.vue';
import TableHead from '@/components/TableHead.vue';
import TD from '@/components/TD.vue';
import TH from '@/components/TH.vue';
import TR from '@/components/TR.vue';
import { completarServicio, obtenerServicios } from './ServicesRequest';

const instance = getCurrentInstance();
const pusher = instance.appContext.config.globalProperties.$pusher;
const channel = pusher.subscribe('access-channel');
channel.bind('access-event', () => {
  obtenerServicios().then((response) => {
      services.value = response.data;

  });
});
const loading = ref(false);
const originalData = ref([]);
const filteredData = ref([]);
const services = ref([]);

// START PAGINATOR FUNCTIONS
const currentPage = ref(0);
const perPage = ref(15);

// Watch for changes in rooms and update originalData and filteredData
watchEffect(() => {
  originalData.value = [...services.value];
  filteredData.value = [...services.value];
});

// const form = ref({
//   fecha_entrada: '',
//   fecha_salida: '',
// });

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

const completar = (servi) => {
  loading.value = true;
  completarServicio(servi.id).then(() => {
    loading.value = false;
  });
  updateServices({ ...servi, completado: true});
};

// Fetch rooms data on component mount
onMounted(async () => {
  try {
    loading.value = true;
    var response = await obtenerServicios();
    services.value = response.data;
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.error(error);
  }
});

const updateServices = (data) => {
  const index = services.value.findIndex((g) => g.id === data.id);
  services.value.splice(index, 1);
};
</script>

<template>
  <AuthLayout>
    <ContenedorComponent>
      <DivContainer>
        <template #header>
          <div class="header">
            <div class="col-start-1 col-end-1"><h1>Servicios</h1></div>
          </div>
        </template>
        <DataTable>
            <TableHead>
              <TR>
                <TH>Nombre</TH>
                <TH>Descripción</TH>
                <TH>Fecha</TH>
                <TH>Habitación</TH>
                <TH>Precio</TH>
                <TH>Tipo</TH>
                <TH>Completar</TH>
              </TR>
            </TableHead>
            <TableBody>
              <TR v-for="reserva in paginatedData" :key="reserva.id">
                <TD>{{ reserva.nombre }}</TD>
                <TD>{{ reserva.descripcion }}</TD>
                <TD>{{ reserva.fecha }}</TD>
                <TD>{{ reserva.numero }}</TD>
                <TD>${{ reserva.precio }}</TD>
                <TD>{{ reserva.tipo }}</TD>
                <TD>
                  <button @click="completar(reserva)" class="ring-1 ring-black focus:outline-none focus:ring-2 focus:ring-indigo-white text-white font-bold py-2 px-2 rounded-md mr-1">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/>
                    </svg>
                  </button>
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
  <!-- ModalComponent for displaying modal -->
</template>

<style scoped>
.header {
  display: grid;
  grid-template-columns: 14rem 1fr;
}
</style>