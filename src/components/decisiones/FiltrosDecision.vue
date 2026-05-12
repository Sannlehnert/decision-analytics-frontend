<script setup>
import { ref, onMounted } from 'vue'
import { categoriasServicio } from '@/services/categorias.servicio.js'

const categorias = ref([])
const estadoSeleccionado = ref('')
const categoriaSeleccionada = ref('')
const prioridadSeleccionada = ref('')

const emit = defineEmits(['filtrar', 'limpiar'])

onMounted(async () => {
  categorias.value = await categoriasServicio.listar()
})

function aplicar() {
  emit('filtrar', {
    estado: estadoSeleccionado.value,
    categoria: categoriaSeleccionada.value,
    prioridad: prioridadSeleccionada.value
  })
}

function limpiar() {
  estadoSeleccionado.value = ''
  categoriaSeleccionada.value = ''
  prioridadSeleccionada.value = ''
  emit('limpiar')
}
</script>

<template>
  <div class="flex gap-2 flex-wrap items-center">
    <select v-model="estadoSeleccionado" @change="aplicar" class="px-2.5 py-1.5 border-1.5 border-borde rounded-md text-sm bg-fondo-superficie focus:outline-none focus:border-borde-foco">
      <option value="">Todos los estados</option>
      <option value="pendiente">Pendiente</option>
      <option value="en_seguimiento">En seguimiento</option>
      <option value="cerrada">Cerrada</option>
      <option value="archivada">Archivada</option>
    </select>
    <select v-model="categoriaSeleccionada" @change="aplicar" class="px-2.5 py-1.5 border-1.5 border-borde rounded-md text-sm bg-fondo-superficie focus:outline-none focus:border-borde-foco">
      <option value="">Todas las categorías</option>
      <option v-for="cat in categorias" :key="cat" :value="cat">{{ cat }}</option>
    </select>
    <select v-model="prioridadSeleccionada" @change="aplicar" class="px-2.5 py-1.5 border-1.5 border-borde rounded-md text-sm bg-fondo-superficie focus:outline-none focus:border-borde-foco">
      <option value="">Todas las prioridades</option>
      <option value="baja">Baja</option>
      <option value="media">Media</option>
      <option value="alta">Alta</option>
      <option value="urgente">Urgente</option>
    </select>
    <button @click="limpiar" class="bg-none border-none text-acento text-sm font-medium hover:text-acento-hover px-1.5 py-0.5 rounded-sm transition-colors">Limpiar filtros</button>
  </div>
</template>