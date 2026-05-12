<script setup>
defineProps({
  mensaje: { type: String, default: 'Cargando...' }
})
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 px-4 gap-4" role="status">
    <svg class="w-9 h-9 text-acento animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" opacity="0.2" />
      <path d="M12 2a10 10 0 0 1 7.07 2.93" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    <p class="text-sm text-texto-terciario">{{ mensaje }}</p>
  </div>
</template>