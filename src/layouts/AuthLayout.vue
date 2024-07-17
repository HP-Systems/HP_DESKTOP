<script setup>
import { ref } from 'vue';
import { initFlowbite } from 'flowbite';
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { logout } from '@/pages/DashboardRequest';
import router from '@/router';

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
  await logout();
  localStorage.removeItem('token');
  router.push('/');
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
            <RouterLink to="/dashboard" class="flex items-center p-2 text-gray-200 rounded-lg  hover:bg-cian-hover group">
                <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15v4m6-6v6m6-4v4m6-6v6M3 11l6-5 6 5 5.5-5.5"/>
                </svg>
              <span class="ms-3 font-bold">Panel de control</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/guests" class="flex items-center p-2 text-gray-200 rounded-lg  hover:bg-cian-hover group">
              <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z" clip-rule="evenodd"/>
              </svg>
              <span class="ms-3 font-bold">Guests</span>
            </RouterLink>
            <RouterLink to="/rooms" class="flex items-center p-2 text-gray-200 rounded-lg  hover:bg-cian-hover group">
              <svg class="w-6 h-6 text-gray-800 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M6 5V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v2H3V7a2 2 0 0 1 2-2h1ZM3 19v-8h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm5-6a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8Z" clip-rule="evenodd"/>
              </svg>
              <span class="ms-3 font-bold">Reservations</span>
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
