<script setup>
defineProps({
  tipo: { type: String, default: 'button' },
  variante: {
    type: String,
    default: 'primaria',
    validator: v => ['primaria', 'secundaria', 'peligro', 'texto'].includes(v)
  },
  deshabilitado: Boolean,
  cargando: Boolean,
  completo: Boolean,
})

defineEmits(['click'])
</script>

<template>
  <button
    :type="tipo"
    :disabled="deshabilitado || cargando"
    :class="[
'inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-sm font-medium border-1.5 rounded-md transition-all duration-150 whitespace-nowrap relative',
      completo ? 'w-full' : '',
      cargando ? 'cursor-wait' : '',
      deshabilitado || cargando ? 'opacity-50 cursor-not-allowed' : '',
      variante === 'primaria' ? 'bg-acento text-texto-inverso border-acento hover:bg-acento-hover hover:border-acento-hover' : '',
      variante === 'secundaria' ? 'bg-transparent text-acento border-borde hover:bg-acento-claro hover:border-acento' : '',
      variante === 'peligro' ? 'bg-error text-white border-error hover:bg-[#a13e3e]' : '',
      variante === 'texto' ? 'bg-none border-none text-acento px-3 py-1.5 hover:bg-acento-claro' : '',
    ]"
    @click="$emit('click')"
  >
    <span v-if="cargando" class="absolute w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
    <span :class="{ 'opacity-0': cargando }">
      <slot />
    </span>
  </button>
</template>