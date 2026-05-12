<script setup>
defineProps({
  tipo: { type: String, default: 'error', validator: v => ['error', 'exito', 'advertencia', 'informacion'].includes(v) },
  mensaje: { type: String, required: true },
  visible: { type: Boolean, default: true }
})
defineEmits(['cerrar'])
</script>

<template>
  <transition name="alerta">
    <div
      v-if="visible"
      :class="[
        'flex items-start justify-between px-4 py-3 rounded-md mb-4 text-sm',
        tipo === 'error' ? 'bg-error-claro text-error border border-[#f0d0d0]' : '',
        tipo === 'exito' ? 'bg-exito-claro text-exito border border-[#d0e8d8]' : '',
        tipo === 'advertencia' ? 'bg-advertencia-claro text-advertencia border border-[#f0e0c8]' : '',
        tipo === 'informacion' ? 'bg-informacion-claro text-informacion border border-[#d0dce8]' : ''
      ]"
      role="alert"
    >
      <p class="flex-1 mr-4">{{ mensaje }}</p>
      <button
        class="bg-none border-none text-current opacity-70 hover:opacity-100 p-0 text-xl leading-none"
        @click="$emit('cerrar')"
        aria-label="Cerrar mensaje"
      >×</button>
    </div>
  </transition>
</template>