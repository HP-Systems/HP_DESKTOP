<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue';
import ContenedorComponent from '@/components/ContenedorComponent.vue';
import DivContainer from '@/components/DivContainer.vue';
import ModalComponent from '@/components/ModalComponent.vue';
import { ref, watchEffect, computed, onMounted } from 'vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import { getStaff } from './StaffRequest';
import DataTable from '@/components/DataTable.vue';
import TableBody from '@/components/TableBody.vue';
import TableHead from '@/components/TableHead.vue';
import TD from '@/components/TD.vue';
import TH from '@/components/TH.vue';
import TR from '@/components/TR.vue';
import Paginator from '@/components/PaginatorComponent.vue';
import StaffForm from './StaffForm.vue';

const modal = ref(false);
const staff = ref([]);
const loading = ref(false);
const action = ref(1);
const staf = ref({});
const originalData = ref([]);
const filteredData = ref([]);



// START PAGINATOR FUNCTIONS
const currentPage = ref(0);
const perPage = ref(15);

// Watch for changes in staff and update originalData and filteredData
watchEffect(() => {
  originalData.value = [...staff.value];
  filteredData.value = [...staff.value];
});

// Computed property for paginated data
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
const toggleModal = (act, st) => {
  action.value = act;
  staf.value = st;
  modal.value = !modal.value;
};


const updateStaff = (data) => {
  if (action.value === 1) {
    console.log('Action es', action.value);
    if(data.rol === '2'){
      data.rol = 'Recepcionista';
    }
    if(data.rol === '3'){
      data.rol = 'Limpieza';
    }
    staff.value = [...staff.value, data];
  } else {
    console.log('Action es', action.value);
    const index = staff.value.findIndex((g) => g.Personal_id === data.Personal_id);
    staff.value[index] = data;
    if (staff.value[index].rol === '2') {
      staff.value[index].rol = 'Recepcionista';
    }
    if (staff.value[index].rol === '3') {
      staff.value[index].rol = 'Limpieza';
    }
  }
};

// Fetch staff data on component mount
onMounted(async () => {
  try {
    loading.value = true;
    const response = await getStaff();
    loading.value = false;
    staff.value = response.data;
    console.log('staff', staff.value);
  } catch (error) {
    loading.value = false;
    console.error(error);
  }
});

</script>

<template>
  <AuthLayout>
    <ContenedorComponent>
      <DivContainer>
        <template #header>
          <div class="header">
            <div class="col-start-1 col-end-1"><h1>Personal</h1></div>
            <div>
              <div class="flex justify-end">
                <button @click="toggleModal(1)" class="bg-cian hover:bg-cian-hover focus:outline-none focus:ring-2 focus:ring-indigo-white text-white font-bold py-3 px-3 rounded-full mr-1">
                  <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </template>
        <div>
          <DataTable>
            <TableHead>
              <TR>
                <TH>Nombre</TH>
                <TH>Email</TH>
                <TH>Telefono</TH>
                <TH>Rol</TH>
                <TH>Acciones</TH>
              </TR>
            </TableHead>
            <TableBody>
              <TR v-for="staf in paginatedData" :key="staf.id">
                <TD>{{ staf.nombre }}</TD>
                <TD>{{ staf.email }}</TD>
                <TD>{{ staf.telefono }}</TD>
                <TD>{{ staf.rol }}</TD>
                <TD>
                  <button @click="toggleModal(2, staf)" class="ring-1 ring-black focus:outline-none focus:ring-2 focus:ring-indigo-white text-white font-bold py-2 px-2 rounded-md mr-1">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                    </svg>
                  </button>
                </TD>
              </TR>
            </TableBody>
          </DataTable>
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
  <ModalComponent :show="modal" max-width="4xl" @close="toggleModal(action)">
    <template #default>
      <div class="p-6">
        <!-- GuestForm component for CRUD operations -->
        <StaffForm @close-modal="toggleModal(action)" @new-staff="updateStaff" :staff="staf" :action="action"></StaffForm>
        <div class="mt-4 flex justify-end">
          <button @click="toggleModal()" class="bg-cian hover:bg-cian-hover focus:outline-none focus:ring-2 focus:ring-indigo-white text-white font-bold py-3 px-3 rounded-lg mr-1">Cerrar</button>
        </div>
      </div>
    </template>
  </ModalComponent>
</template>

<style scoped>
.header {
  display: grid;
  grid-template-columns: 14rem 1fr;
}
</style>

<script>
</script>