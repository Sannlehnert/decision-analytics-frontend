<script setup>
import { formatearFecha, formatearEstado, formatearPrioridad, claseEstado } from '@/utils/formateadores.js'

defineProps({
  decisiones: { type: Array, required: true },
  cargando: Boolean
})
defineEmits(['ver', 'editar', 'eliminar'])
</script>

<template>
  <div class="overflow-x-auto bg-fondo-superficie border border-borde rounded-lg">
    <table class="w-full border-collapse text-sm">
      <thead>
        <tr>
          <th class="text-left px-4 py-3 font-medium text-texto-secundario border-b border-borde text-xs uppercase tracking-wider">Título</th>
          <th class="text-left px-4 py-3 font-medium text-texto-secundario border-b border-borde text-xs uppercase tracking-wider hidden md:table-cell">Categoría</th>
          <th class="text-left px-4 py-3 font-medium text-texto-secundario border-b border-borde text-xs uppercase tracking-wider hidden md:table-cell">Prioridad</th>
          <th class="text-left px-4 py-3 font-medium text-texto-secundario border-b border-borde text-xs uppercase tracking-wider">Estado</th>
          <th class="text-left px-4 py-3 font-medium text-texto-secundario border-b border-borde text-xs uppercase tracking-wider hidden md:table-cell">Creada</th>
          <th class="text-left px-4 py-3 font-medium text-texto-secundario border-b border-borde text-xs uppercase tracking-wider"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="decisiones.length === 0 && !cargando">
          <td colspan="6" class="text-center text-texto-terciario py-12 px-4">No se encontraron decisiones</td>
        </tr>
        <tr v-for="decision in decisiones" :key="decision.id" class="hover:bg-fondo-elevado transition-colors">
          <td class="px-4 py-3 font-medium max-w-[250px]">{{ decision.titulo }}</td>
          <td class="px-4 py-3 hidden md:table-cell">{{ decision.categoria }}</td>
          <td class="px-4 py-3 hidden md:table-cell">{{ formatearPrioridad(decision.prioridad) }}</td>
          <td class="px-4 py-3">
            <span :class="[
              'inline-block px-2 py-0.5 rounded-full text-xs font-medium',
              decision.estado === 'pendiente' ? 'bg-advertencia-claro text-advertencia' : '',
              decision.estado === 'en_seguimiento' ? 'bg-informacion-claro text-informacion' : '',
              decision.estado === 'cerrada' ? 'bg-exito-claro text-exito' : '',
              decision.estado === 'archivada' ? 'bg-fondo-elevado text-texto-terciario' : ''
            ]">
              {{ formatearEstado(decision.estado) }}
            </span>
          </td>
          <td class="px-4 py-3 text-texto-terciario whitespace-nowrap hidden md:table-cell">{{ formatearFecha(decision.creado_en) }}</td>
          <td class="px-4 py-3 whitespace-nowrap">
            <div class="flex gap-2">
              <button class="bg-none border-none text-acento text-xs font-medium px-1.5 py-0.5 rounded-sm hover:bg-acento-claro transition-colors" @click="$emit('ver', decision.id)" title="Ver detalle">Ver</button>
              <button class="bg-none border-none text-acento text-xs font-medium px-1.5 py-0.5 rounded-sm hover:bg-acento-claro transition-colors" @click="$emit('editar', decision)" title="Editar">Editar</button>
              <button class="bg-none border-none text-error text-xs font-medium px-1.5 py-0.5 rounded-sm hover:bg-error-claro transition-colors" @click="$emit('eliminar', decision)" title="Eliminar">Eliminar</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>