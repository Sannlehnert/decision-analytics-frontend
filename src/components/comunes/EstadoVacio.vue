<script setup>
defineProps({
  titulo: { type: String, default: 'Sin datos' },
  descripcion: { type: String, default: 'No hay información para mostrar en este momento.' },
  accion: { type: String, default: '' }
})
defineEmits(['accion'])
</script>

<template>
  <div class="flex flex-col items-center text-center py-12 px-4">
    <svg class="w-20 h-20 text-texto-terciario mb-4" viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <rect x="8" y="12" width="64" height="56" rx="8" stroke="currentColor" stroke-width="1.5" />
      <line x1="20" y1="28" x2="60" y2="28" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      <line x1="20" y1="38" x2="48" y2="38" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </svg>
    <h3 class="text-lg font-medium mb-2">{{ titulo }}</h3>
    <p class="text-sm text-texto-secundario max-w-md mb-4">{{ descripcion }}</p>
    <button
      v-if="accion"
      class="bg-acento text-texto-inverso border-none py-2.5 px-5 rounded-md font-medium text-sm cursor-pointer transition-colors duration-rapida hover:bg-acento-hover"
      @click="$emit('accion')"
    >{{ accion }}</button>
  </div>
</template>