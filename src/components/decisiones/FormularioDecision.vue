<script setup>
import { ref, watch, onMounted } from 'vue'
import { categoriasServicio } from '@/services/categorias.servicio.js'

const props = defineProps({
  valoresIniciales: { type: Object, default: () => ({}) },
  errores: { type: Object, default: () => ({}) },
  cargando: Boolean,
  modoEdicion: Boolean
})
const emit = defineEmits(['guardar', 'cancelar'])

const categorias = ref([])
const formulario = ref({
  titulo: props.valoresIniciales.titulo || '',
  descripcion: props.valoresIniciales.descripcion || '',
  categoria: props.valoresIniciales.categoria || '',
  prioridad: props.valoresIniciales.prioridad || 'media',
  estado: props.valoresIniciales.estado || 'pendiente'
})

watch(() => props.valoresIniciales, (nuevos) => {
  if (nuevos.titulo) formulario.value.titulo = nuevos.titulo
  if (nuevos.descripcion) formulario.value.descripcion = nuevos.descripcion
  if (nuevos.categoria) formulario.value.categoria = nuevos.categoria
  if (nuevos.prioridad) formulario.value.prioridad = nuevos.prioridad
  if (nuevos.estado) formulario.value.estado = nuevos.estado
}, { deep: true })

onMounted(async () => {
  categorias.value = await categoriasServicio.listar()
})

function enviar() {
  emit('guardar', { ...formulario.value })
}
</script>

<template>
  <form class="flex flex-col gap-5 max-w-2xl" @submit.prevent="enviar" novalidate>
    <div class="flex flex-col gap-1">
      <label for="titulo" class="text-sm font-medium">Título</label>
      <input
        id="titulo"
        v-model="formulario.titulo"
        type="text"
        class="px-3 py-2.5 border-1.5 rounded-md text-base transition-colors duration-rapida focus:outline-none focus:border-borde-foco focus:ring-3 focus:ring-acento/10"
        :class="errores.titulo ? 'border-error' : 'border-borde'"
        placeholder="Ej: Cambiar de carrera profesional"
        maxlength="255"
      />
      <p v-if="errores.titulo" class="text-2xs text-error">{{ errores.titulo }}</p>
    </div>

    <div class="flex flex-col gap-1">
      <label for="categoria" class="text-sm font-medium">Categoría</label>
      <select
        id="categoria"
        v-model="formulario.categoria"
        class="px-3 py-2.5 border-1.5 rounded-md text-base bg-fondo-superficie transition-colors duration-rapida focus:outline-none focus:border-borde-foco focus:ring-3 focus:ring-acento/10"
        :class="errores.categoria ? 'border-error' : 'border-borde'"
      >
        <option value="" disabled>Seleccionar categoría</option>
        <option v-for="cat in categorias" :key="cat" :value="cat">{{ cat }}</option>
      </select>
      <p v-if="errores.categoria" class="text-2xs text-error">{{ errores.categoria }}</p>
    </div>

    <div class="flex gap-4">
      <div class="flex-1 flex flex-col gap-1">
        <label for="prioridad" class="text-sm font-medium">Prioridad</label>
        <select id="prioridad" v-model="formulario.prioridad" class="px-3 py-2.5 border border-borde rounded-md text-base bg-fondo-superficie focus:outline-none focus:border-borde-foco focus:ring-3 focus:ring-acento/10">
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
          <option value="urgente">Urgente</option>
        </select>
      </div>
      <div v-if="modoEdicion" class="flex-1 flex flex-col gap-1">
        <label for="estado" class="text-sm font-medium">Estado</label>
        <select id="estado" v-model="formulario.estado" class="px-3 py-2.5 border border-borde rounded-md text-base bg-fondo-superficie focus:outline-none focus:border-borde-foco focus:ring-3 focus:ring-acento/10">
          <option value="pendiente">Pendiente</option>
          <option value="en_seguimiento">En seguimiento</option>
          <option value="cerrada">Cerrada</option>
          <option value="archivada">Archivada</option>
        </select>
      </div>
    </div>

    <div class="flex flex-col gap-1">
      <label for="descripcion" class="text-sm font-medium">Descripción <span class="font-normal text-texto-terciario">(opcional)</span></label>
      <textarea
        id="descripcion"
        v-model="formulario.descripcion"
        class="px-3 py-2.5 border border-borde rounded-md text-base resize-y min-h-[100px] focus:outline-none focus:border-borde-foco focus:ring-3 focus:ring-acento/10"
        rows="4"
        placeholder="Contexto, razones o notas adicionales..."
        maxlength="2000"
      ></textarea>
    </div>

    <div class="flex justify-end gap-3 pt-4">
      <button type="button" class="px-5 py-2.5 bg-transparent border border-borde rounded-md text-sm text-texto-secundario hover:bg-fondo-elevado transition-colors" @click="$emit('cancelar')">Cancelar</button>
      <button type="submit" :disabled="cargando" class="px-6 py-2.5 bg-acento text-texto-inverso border-none rounded-md text-sm font-medium hover:bg-acento-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
        {{ cargando ? 'Guardando...' : (modoEdicion ? 'Actualizar' : 'Crear decisión') }}
      </button>
    </div>
  </form>
</template>