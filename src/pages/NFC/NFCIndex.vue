<script setup>
import ContenedorComponent from '@/components/ContenedorComponent.vue';
import DivContainer from '@/components/DivContainer.vue';
import ModalComponent from '@/components/ModalComponent.vue';
import NFCCard from '@/components/NFCCard.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import NFCForm from './NFCForm.vue';
import { computed, onMounted, ref, watchEffect } from 'vue';
import { getNFC, updateStatusNFC } from './NFCRequest';
import PaginatorComponent from '@/components/PaginatorComponent.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';

const modal = ref(false);
const nfcCards = ref([]);
const loading = ref(false);
const action = ref(1);
const nfcCard = ref({});
const originalData = ref([]);
const filteredData = ref([]);

// START PAGINATOR FUNCTIONS
const currentPage = ref(0);
const perPage = ref(15);

// Watch for changes in nfcCards and update originalData and filteredData
watchEffect(() => {
  originalData.value = [...nfcCards.value];
  filteredData.value = [...nfcCards.value];
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
const toggleModal = (act, nfc) => {
  action.value = act;
  nfcCard.value = nfc;
  modal.value = !modal.value;
};

// Function to update nfcCards list
const updateNFC = (data) => {
  console.log('Data es', data);
  if (action.value === 1) {
    console.log('Action es', action.value);
    nfcCards.value = [...nfcCards.value, data];
  } else {
    console.log('Action es', action.value);
    const index = nfcCards.value.findIndex((g) => g.id === data.id);
    nfcCards.value[index] = data;
  }
};

// Fetch nfcCards data on component mount
onMounted(async () => {
  try {
    loading.value = true;
    const response = await getNFC();
    loading.value = false;
    nfcCards.value = response.data;
    console.log('nfcCards', nfcCards.value);
  } catch (error) {
    loading.value = false;
    console.error(error);
  }
});

const updateStatus = (nfc) => {
  const data = {
    status: nfc.status === 1 ? 0 : 1,
  };
  loading.value = true;
  updateStatusNFC(data, nfc.id).then((response) => {
    const index = nfcCards.value.findIndex((g) => g.id === nfc.id);
    nfcCards.value[index] = response.data;
    loading.value = false;
  }).catch((error) => {
    console.error(error);
    loading.value = false;
  });
};
</script>
<template>
<AuthLayout>
    <ContenedorComponent>
    <DivContainer>
        <template #header>
        <div class="header">
            <div class="col-start-1 col-end-1"><h1>Tarjetas</h1></div>
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
        <div class="w- flex justify-center">
                <div class="grid lg:grid-cols-3 lg:gap-3 w-full p-3 md:grid-cols-1">
                    <NFCCard v-for="tarjeta in paginatedData" class="mb-4" 
                    :key="tarjeta.id" 
                    :title="tarjeta.title" 
                    :descripcion="tarjeta.descripcion"
                    :tipo="tarjeta.tipo"
                    :numero="tarjeta.numero" 
                    >
                    <div>
                        <button @click="toggleModal(2, tarjeta)" class="bg-cian hover:bg-cian-hover focus:outline-none focus:ring-2 focus:ring-indigo-white text-white font-bold py-3 px-3 rounded-full mr-1">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
                            </svg>
                        </button>
                    </div>
                    <div>
                        <button v-if="tarjeta.status" @click="updateStatus(tarjeta)" class="bg-cian hover:bg-cian-hover focus:outline-none focus:ring-2 focus:ring-indigo-white text-white font-bold py-3 px-3 rounded-full mr-1">
                          <svg v-if="tarjeta.status" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5"/>
                          </svg>
                          <svg v-if="!tarjeta.status" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                          </svg>
                        </button>
                        <button v-if="!tarjeta.status" @click="updateStatus(tarjeta)" class="bg-red-500 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-indigo-white text-white font-bold py-3 px-3 rounded-full mr-1">
                          <svg v-if="tarjeta.status" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5"/>
                          </svg>
                          <svg v-if="!tarjeta.status" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                          </svg>
                        </button>
                    </div>
                    </NFCCard>
                </div>
            </div>
            <div class="flex justify-center mt-5">
                    <!-- Paginator component with props -->
                    <PaginatorComponent :currentPage="currentPage" :totalPages="Math.ceil(filteredData.length / perPage)" @next-page="nextPage" @prev-page="prevPage" @first-page="firstPage" @last-page="lastPage"/>
                </div>
        </template>
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
        <NFCForm @close-modal="toggleModal(action)" @new-NFC="updateNFC" :card="nfcCard" :action="action"></NFCForm>
        <div class="mt-4 flex justify-end">
        <button @click="toggleModal()" class="bg-cian hover:bg-cian-hover focus:outline-none focus:ring-2 focus:ring-indigo-white text-white font-bold py-3 px-3 rounded-lg mr-1">Cerrar</button>
        </div>
    </div>
    </template>
</ModalComponent>
</template>
<script>
</script>