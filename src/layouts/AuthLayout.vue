<script setup>
import { getCurrentInstance, ref } from 'vue';
import { initFlowbite } from 'flowbite';
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { logout } from '@/pages/DashboardRequest';
import router from '@/router';
import LoadingComponent from '@/components/LoadingComponent.vue';
import NotificationComponent from '@/components/NotificationComponent.vue';

const instance = getCurrentInstance();
const notification = ref(false);
const msg = ref('');
  
const pusher = instance.appContext.config.globalProperties.$pusher;
const channel = pusher.subscribe('access-channel');
channel.bind('access-event', (data) => {
  msg.value = data.message;
  notification.value = true;
  setTimeout(() => {
    notification.value = false;
  }, 5000);
});
const closeNotification = () => {
  notification.value = false;
};

const loading = ref (false)
onMounted(() => {
  initFlowbite();
  const minWidth = 760;
  const drawerNav = document.getElementById('sidebar');
  const content = document.getElementById('content');

  if (openedSidebar.value) {
    drawerNav.style.transform = 'translateX(0)';
    if (window.innerWidth > minWidth) {
      content.style.gridColumnStart = '2';
        content.style.paddingLeft = '3rem'
    }
  }
});

const logoutUser = async () => {
  loading.value = true
  await logout().catch((error) => {
    localStorage.removeItem('token');
  });
  localStorage.removeItem('token');
  router.push('/');
  loading.value = false
};

const openedSidebar = ref(localStorage.getItem('openedSidebar') === 'true');

const toggleSidebar = () => {
  openedSidebar.value = !openedSidebar.value;
  const drawerNav = document.getElementById('sidebar');
  const content = document.getElementById('content');
  const minWidth = 760;

  // Guardar el estado de la sidebar en localStorage
  localStorage.setItem('openedSidebar', openedSidebar.value);

  if (openedSidebar.value) {
    drawerNav.style.transform = 'translateX(0)';
    if (window.innerWidth > minWidth) {
      content.style.gridColumnStart = '2';
      content.style.paddingLeft = '3rem'
    }
  } else {
    drawerNav.style.transform = 'translateX(-100%)';
    content.style.gridColumnStart = '1';
    content.style.paddingLeft = '1rem'
  }
};
</script>

<template>
  <div class="wrapper bg-gray-300">
    <button @click="toggleSidebar" id="sidebarButton" type="button" class="fixed z-50 bg-cian inline-flex items-center p-2 mt-2 text-sm text-gray-900 rounded-lg ms-3 hover:bg-cian-hover focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-300">
      <span class="sr-only">Open sidebar</span>
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
      </svg>
    </button>
    <aside id="sidebar" class="z-40 focus:outline-none focus:ring-2 fixed top-0 left-0 z-1 w-72 p-3 h-full overflow-y-auto transition-transform -translate-x-full bg-cian dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-navigation-label">
      <div class="h-full px-3 py-4 overflow-y-auto bg-cian">
        <ul class="space-y-2 font-medium mt-6">
          <li>
            <button @click="logoutUser" class="flex items-center p-2 text-gray-200 rounded-lg  hover:bg-cian-hover group w-full">
              <svg class="w-6 h-6 text-gray-800 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"/>
              </svg>
              <span class="ms-3 font-bold">Logout</span>
            </button>
          </li>
          <li>
            <RouterLink to="/guests" class="flex items-center p-2 text-gray-200 rounded-lg  hover:bg-cian-hover group">
              <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z" clip-rule="evenodd"/>
              </svg>
              <span class="ms-3 font-bold">Guests</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/rooms" class="flex items-center p-2 text-gray-200 rounded-lg  hover:bg-cian-hover group">
              <svg class="w-6 h-6 text-gray-800 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M6 5V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v2H3V7a2 2 0 0 1 2-2h1ZM3 19v-8h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm5-6a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8Z" clip-rule="evenodd"/>
              </svg>
              <span class="ms-3 font-bold">Reservations</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/staff" class="flex items-center p-2 text-gray-200 rounded-lg  hover:bg-cian-hover group">
              <svg class="w-6 h-6 text-gray-800 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm10 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-8-5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm1.942 4a3 3 0 0 0-2.847 2.051l-.044.133-.004.012c-.042.126-.055.167-.042.195.006.013.02.023.038.039.032.025.08.064.146.155A1 1 0 0 0 6 17h6a1 1 0 0 0 .811-.415.713.713 0 0 1 .146-.155c.019-.016.031-.026.038-.04.014-.027 0-.068-.042-.194l-.004-.012-.044-.133A3 3 0 0 0 10.059 14H7.942Z" clip-rule="evenodd"/>
              </svg>
              <span class="ms-3 font-bold">Personal</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/cards" class="flex items-center p-2 text-gray-200 rounded-lg  hover:bg-cian-hover group">
              <svg class="w-6 h-6 text-gray-800 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M4 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H4Zm0 6h16v6H4v-6Z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M5 14a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Zm5 0a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
              </svg>
              <span class="ms-3 font-bold">Tarjetas</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/services" class="flex items-center p-2 text-gray-200 rounded-lg  hover:bg-cian-hover group">
              <svg class="w-6 h-6 text-gray-800 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.079 6.839a3 3 0 0 0-4.255.1M13 20h1.083A3.916 3.916 0 0 0 18 16.083V9A6 6 0 1 0 6 9v7m7 4v-1a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1Zm-7-4v-6H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1Zm12-6h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1v-6Z"/>
              </svg>
              <span class="ms-3 font-bold">Services</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/cleaners" class="flex items-center p-2 text-gray-200 rounded-lg  hover:bg-cian-hover group">
              <svg class="w-6 h-6 text-gray-800 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M17.44 3a1 1 0 0 1 .707.293l2.56 2.56a1 1 0 0 1 0 1.414L18.194 9.78 14.22 5.806l2.513-2.513A1 1 0 0 1 17.44 3Zm-4.634 4.22-9.513 9.513a1 1 0 0 0 0 1.414l2.56 2.56a1 1 0 0 0 1.414 0l9.513-9.513-3.974-3.974ZM6 6a1 1 0 0 1 1 1v1h1a1 1 0 0 1 0 2H7v1a1 1 0 1 1-2 0v-1H4a1 1 0 0 1 0-2h1V7a1 1 0 0 1 1-1Zm9 9a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1v-1a1 1 0 0 1 1-1Z" clip-rule="evenodd"/>
                <path d="M19 13h-2v2h2v-2ZM13 3h-2v2h2V3Zm-2 2H9v2h2V5ZM9 3H7v2h2V3Zm12 8h-2v2h2v-2Zm0 4h-2v2h2v-2Z"/>
              </svg>
              <span class="ms-3 font-bold">Limpiezas</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </aside>
    <div class="content bg-gray-200" id="content">
      <!-- Page Content -->
      <main>
        <slot />
      </main>
    </div>
  </div>
  <NotificationComponent :msg="msg" :show="notification" @disappear="closeNotification"/>
  <LoadingComponent :show="loading">
  </LoadingComponent>
</template>

<style scoped>
@media (min-width: 300px) {
  .wrapper {
    display: grid;
    grid-template-columns: 1fr;
  }
  .content {
    grid-column-start: 1;
    grid-column-end: -1;
    min-height: 100vh;
    height: auto;
  }
}
@media (min-width: 640px) {
  .wrapper {
    display: grid;
    grid-template-columns: 16rem 1fr;
  }
  .content {
    grid-column-start: 1;
    grid-column-end: -1;
    min-height: 100vh;
    height: auto; /* Ajusta el height según tus necesidades */
  }
}
@media (min-width: 1000px) {
  .wrapper {
    display: grid;
    grid-template-columns: 16rem 1fr;
  }
  .content {
    grid-column-start: 1;
    grid-column-end: -1;
    min-height: 100vh;
    height: auto; /* Ajusta el height según tus necesidades */
    padding-right: 1rem;
    padding-left: 1rem;
  }
}
</style>
<script>
</script>
