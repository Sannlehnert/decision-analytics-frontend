<script setup>
import { formatearFecha, formatearEstado, formatearPrioridad } from '@/utils/formateadores.js'

defineProps({
  decision: Object
})
defineEmits(['click'])
</script>

<template>
  <article
    class="bg-fondo-superficie border border-borde rounded-lg p-4 cursor-pointer transition-all duration-base hover:shadow-md hover:border-acento"
    @click="$emit('click', decision.id)"
    tabindex="0"
    role="button"
  >
    <div class="flex justify-between items-start gap-2 mb-2">
      <h3 class="text-base font-semibold">{{ decision.titulo }}</h3>
      <span :class="[
        'inline-block px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap',
        decision.estado === 'pendiente' ? 'bg-advertencia-claro text-advertencia' : '',
        decision.estado === 'en_seguimiento' ? 'bg-informacion-claro text-informacion' : '',
        decision.estado === 'cerrada' ? 'bg-exito-claro text-exito' : '',
        decision.estado === 'archivada' ? 'bg-fondo-elevado text-texto-terciario' : ''
      ]">
        {{ formatearEstado(decision.estado) }}
      </span>
    </div>
    <p v-if="decision.descripcion" class="text-sm text-texto-secundario mb-3 line-clamp-2">{{ decision.descripcion }}</p>
    <div class="flex gap-2 text-xs text-texto-terciario">
      <span>{{ decision.categoria }}</span>
      <span>·</span>
      <span>{{ formatearPrioridad(decision.prioridad) }}</span>
      <span>·</span>
      <span>{{ formatearFecha(decision.creado_en) }}</span>
    </div>
  </article>
</template>