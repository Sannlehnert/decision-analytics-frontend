<script setup>
import { onMounted, ref } from 'vue'
import { usarDecisiones } from '@/composables/usarDecisiones.js'
import { useRouter } from 'vue-router'
import FiltrosDecision from '@/components/decisiones/FiltrosDecision.vue'
import TablaDecisiones from '@/components/decisiones/TablaDecisiones.vue'
import IndicadorCarga from '@/components/comunes/IndicadorCarga.vue'
import EstadoVacio from '@/components/comunes/EstadoVacio.vue'
import AlertaMensaje from '@/components/comunes/AlertaMensaje.vue'
import ModalConfirmacion from '@/components/comunes/ModalConfirmacion.vue'

const router = useRouter()
const { decisionesFiltradas, cargando, error, filtros, cargarDecisiones, eliminar, limpiarError } = usarDecisiones()

const modalEliminar = ref(false)
const decisionAEliminar = ref(null)
const eliminando = ref(false)

onMounted(() => cargarDecisiones())

function manejarFiltros(nuevosFiltros) { filtros.value = nuevosFiltros }
function manejarLimpiarFiltros() { filtros.value = { estado: '', categoria: '', prioridad: '' } }
function ver(id) { router.push({ name: 'DetalleDecision', params: { id } }) }
function editar(decision) { router.push({ name: 'DetalleDecision', params: { id: decision.id } }) }

function confirmarEliminar(decision) {
  decisionAEliminar.value = decision
  modalEliminar.value = true
}

async function ejecutarEliminar() {
  eliminando.value = true
  await eliminar(decisionAEliminar.value.id)
  eliminando.value = false
  modalEliminar.value = false
  decisionAEliminar.value = null
}
</script>

<template>
  <div class="flex flex-col gap-5">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-secundaria">Decisiones</h1>
      <button class="bg-acento text-texto-inverso border-none py-2.5 px-5 rounded-md font-medium text-sm cursor-pointer hover:bg-acento-hover transition-colors" @click="router.push({ name: 'NuevaDecision' })">+ Nueva</button>
    </div>

    <AlertaMensaje v-if="error" :mensaje="error" tipo="error" @cerrar="limpiarError" />

    <FiltrosDecision @filtrar="manejarFiltros" @limpiar="manejarLimpiarFiltros" />

    <IndicadorCarga v-if="cargando" mensaje="Cargando decisiones..." />

    <template v-else-if="decisionesFiltradas.length">
      <TablaDecisiones :decisiones="decisionesFiltradas" @ver="ver" @editar="editar" @eliminar="confirmarEliminar" />
    </template>

    <EstadoVacio v-else titulo="No hay decisiones" descripcion="Creá tu primera decisión para empezar a analizar." accion="Crear decisión" @accion="router.push({ name: 'NuevaDecision' })" />

    <ModalConfirmacion
      :visible="modalEliminar"
      titulo="¿Eliminar esta decisión?"
      :mensaje="`Se eliminará permanentemente «${decisionAEliminar?.titulo}». Esta acción no se puede deshacer.`"
      textoConfirmar="Eliminar"
      :cargando="eliminando"
      @confirmar="ejecutarEliminar"
      @cancelar="modalEliminar = false"
    />
  </div>
</template>