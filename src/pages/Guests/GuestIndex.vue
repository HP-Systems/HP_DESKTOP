<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue';
import ContenedorComponent from '@/components/ContenedorComponent.vue';
import DivContainer from '@/components/DivContainer.vue';
import ModalComponent from '@/components/ModalComponent.vue';
import { onMounted, ref } from 'vue';
import GuestForm from './GuestForm.vue';
import { getGuests } from './GuestRequest';
import LoadingComponent from '@/components/LoadingComponent.vue';
import DataTable from '@/components/DataTable.vue';
import TableBody from '@/components/TableBody.vue';
import TableHead from '@/components/TableHead.vue';
import TD from '@/components/TD.vue';
import TH from '@/components/TH.vue';
import TR from '@/components/TR.vue';

const modal = ref(false);
const guests = ref([]);
const loading = ref(false);
const action = ref(1);
const guest = ref({});

const toggleModal = (act, gue = {}) => {
  modal.value = !modal.value;
  action.value = act;
  if (act === 2) {
    guest.value = gue;
  }else{
    guest.value = {};
  }
};

onMounted(() => {
  try{
    loading.value = true;
    getGuests().then((response) => {
      loading.value = false;
      guests.value = response.data;
      console.log(response.data);
    });
  }
  catch (error) {
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
                <div class="col-start-1 col-end-1"><h1> Huespedes </h1></div>
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
                <TH>Acciones</TH>
              </TR>
            </TableHead>
            <TableBody>
              <TR v-for="guest in guests" :key="guest.id">
                <TD>{{ guest.nombre }}</TD>
                <TD>{{ guest.email }}</TD>
                <TD>{{ guest.telefono }}</TD>
                <TD>
                  <button @click="toggleModal(2, guest)" class="ring-1 ring-black focus:outline-none focus:ring-2 focus:ring-indigo-white text-white font-bold py-2 px-2 rounded-md mr-1">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                    </svg>
                  </button>
                </TD>
              </TR>
            </TableBody>
          </DataTable>
        </div>
      </DivContainer>
    </ContenedorComponent>
    <LoadingComponent :show="loading" />
  </AuthLayout>
  <ModalComponent :show="modal" max-width="4xl" @close="toggleModal">
    <template #default>
        <div class="p-6">
            <GuestForm :guest="guest" :action="action"></GuestForm>
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
