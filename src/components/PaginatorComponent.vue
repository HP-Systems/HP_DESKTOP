<!-- eslint-disable no-undef -->
<script setup>
const emit = defineEmits(['next-page', 'prev-page', 'last-page', 'first-page'])
const props = defineProps({
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
});

const nextPage = () => {
    emit('next-page')
}

const prevPage = () => {
    emit('prev-page')
}

const firstPage = () => {
    emit('first-page')
}

const lastPage = () => {
    emit('last-page')
}
</script>
<template>
    <nav aria-label="Page navigation example">
        <ul class="flex items-center h-10 -space-x-px text-base">
            <li>
                <button @click="firstPage" :disabled="props.currentPage === 0"
                    class="flex items-center justify-center h-10 px-4 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span class="sr-only">First</span>
                    <svg class="w-6 h-6 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17 16-4-4 4-4m-6 8-4-4 4-4"/>
                    </svg>
                </button>
            </li>
            <li>
                <button @click="prevPage" :disabled="props.currentPage === 0"
                    class="flex items-center justify-center h-10 px-4 leading-tight text-gray-500 bg-white border border-gray-300 ms-0 border-e-0 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span class="sr-only">Previous</span>
                    <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2" d="M5 1 1 5l4 4" />
                    </svg>
                </button>
            </li>
            <li>
                <a href="#" aria-current="page"
                    class="z-10 flex items-center justify-center h-10 px-4 leading-tight text-blue-600 border border-e-0 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{{
                        currentPage + 1 }}</a>
            </li>
            <li >
                <button @click="nextPage" :disabled="props.currentPage === totalPages - 1"
                    class="z-10 flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white  border border-gray-300 border-e-0 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span class="sr-only">Next</span>
                    <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2" d="m1 9 4-4-4-4" />
                    </svg>
                </button>
            </li>
            <li>
                <button @click="lastPage" :disabled="props.currentPage === totalPages - 1"
                    class="z-5 flex items-center justify-center h-10 px-4 leading-tight text-gray-500 bg-white border border-gray-300  ms-0 rounded-e-lg  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:border-gray-700">
                    <span class="sr-only">Last</span>
                    <svg class="w-6 h-6 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 16 4-4-4-4m6 8 4-4-4-4"/>
                    </svg>
                </button>
            </li>
        </ul>
    </nav>
</template>