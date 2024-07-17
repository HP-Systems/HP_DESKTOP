<script setup>
import { onMounted, ref, watch, defineProps, defineExpose } from 'vue';

// eslint-disable-next-line
const emit = defineEmits(['update:modelValue']);
// Define props
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  maxLength: {
    type: Number,
    default: 255,
  },
  error: {
    type: String,
    default: '',
  },
  suggestions: {
    type: Array,
    default: () => [],
  },
});

// Reference for the input element
const input = ref(null);

// Local value reference for the input
const value = ref(props.modelValue);
const filteredSuggestions = ref([]);

// Watch for changes in modelValue prop and update the input value
watch(() => props.modelValue, (newVal) => {
  value.value = newVal;
});

// Watch for changes in the input value and filter suggestions
watch(value, (newVal) => {
  if (newVal) {
    filteredSuggestions.value = props.suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(newVal.toLowerCase())
    );
  } else {
    filteredSuggestions.value = [];
  }
});

// Lifecycle hook onMounted
onMounted(() => {
  if (input.value) {
    input.value.setAttribute('maxlength', props.maxLength);
  }
});

// Expose the focus method
defineExpose({ 
  focus: () => input.value.focus()
});

// Handle selection of a suggestion
const selectSuggestion = (suggestion) => {
  value.value = suggestion;
  filteredSuggestions.value = [];
  emitUpdateModelValue(suggestion);
};

// Emit the update:modelValue event
const emitUpdateModelValue = (newValue) => {

  emit('update:modelValue', newValue);
};
</script>

<template>
  <div class="relative z-0 w-full mb-5 group">
    <input
      :maxlength="props.maxLength"
      :type="props.type"
      v-model="value"
      @input="event => emitUpdateModelValue(event.target.value)"
      ref="input"
      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      placeholder=" "
      required
    />
    <label
      class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      {{ props.label }}
    </label>
    <span v-if="props.error !== ''" class="text-red-500 text-xs mt-1 absolute">
      {{ props.error }}
    </span>
    <ul v-if="filteredSuggestions.length > 0" class="absolute bg-white border border-gray-300 w-full mt-1 max-h-60 overflow-y-auto z-10">
      <li
        v-for="(suggestion, index) in filteredSuggestions"
        :key="index"
        @click="selectSuggestion(suggestion)"
        class="cursor-pointer p-2 hover:bg-gray-200"
      >
        {{ suggestion }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Scoped CSS if needed */
</style>
