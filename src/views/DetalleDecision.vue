<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usarDecisiones } from '@/composables/usarDecisiones.js'
import FormularioDecision from '@/components/decisiones/FormularioDecision.vue'
import IndicadorCarga from '@/components/comunes/IndicadorCarga.vue'
import AlertaMensaje from '@/components/comunes/AlertaMensaje.vue'
import ModalConfirmacion from '@/components/comunes/ModalConfirmacion.vue'
import { formatearFecha, formatearEstado } from '@/utils/formateadores.js'

const props = defineProps({
  id: { type: [String, Number], default: null },
  esNueva: Boolean
})

const route = useRoute()
const router = useRouter()
const { decisionActual, cargando, error, erroresValidacion, cargarDecision, crear, actualizar, eliminar, agregarResultado, limpiarError } = usarDecisiones()

const idDecision = computed(() => props.id || route.params.id)
const esModoEdicion = ref(false)
const modalEliminar = ref(false)
const mostrandoResultado = ref(false)
const tipoResultado = ref('positivo')
const descripcionResultado = ref('')
const guardandoResultado = ref(false)
const errorResultado = ref('')

onMounted(async () => {
  if (!props.esNueva && idDecision.value) await cargarDecision(idDecision.value)
  if (props.esNueva) {
    esModoEdicion.value = true
    decisionActual.value = null
  }
})

async function manejarGuardar(datos) {
  if (props.esNueva) {
    const creada = await crear(datos)
    if (creada) router.replace({ name: 'DetalleDecision', params: { id: creada.id } })
  } else {
    await actualizar(idDecision.value, datos)
    esModoEdicion.value = false
  }
}

async function ejecutarEliminar() {
  await eliminar(idDecision.value)
  router.push({ name: 'ListaDecisiones' })
}

async function manejarResultado() {
  guardandoResultado.value = true
  errorResultado.value = ''
  try {
    await agregarResultado(idDecision.value, { tipo: tipoResultado.value, descripcion: descripcionResultado.value || undefined })
    mostrandoResultado.value = false
  } catch (err) {
    errorResultado.value = err.response?.data?.error || 'Error al guardar resultado'
  } finally {
    guardandoResultado.value = false
  }
}
</script>

<template>
  <div class="flex flex-col gap-5 max-w-2xl">
    <AlertaMensaje v-if="error" :mensaje="error" tipo="error" @cerrar="limpiarError" />
    <IndicadorCarga v-if="cargando && !decisionActual && !esNueva" mensaje="Cargando decisión..." />

    <template v-if="esNueva || esModoEdicion">
      <h1>{{ esNueva ? 'Nueva decisión' : 'Editar decisión' }}</h1>
      <FormularioDecision
        :valoresIniciales="decisionActual || {}"
        :errores="erroresValidacion"
        :cargando="cargando"
        :modoEdicion="!esNueva"
        @guardar="manejarGuardar"
        @cancelar="esNueva ? router.back() : (esModoEdicion = false)"
      />
    </template>

    <template v-else-if="decisionActual">
      <div class="flex justify-between items-center">
        <button class="bg-none border-none text-acento text-sm p-0 cursor-pointer" @click="router.back()">← Volver</button>
        <div class="flex gap-2">
          <button class="bg-none border border-borde px-3 py-1.5 rounded-md text-sm hover:bg-fondo-elevado transition-colors" @click="esModoEdicion = true">Editar</button>
          <button class="bg-none border border-error text-error px-3 py-1.5 rounded-md text-sm hover:bg-error-claro transition-colors" @click="modalEliminar = true">Eliminar</button>
        </div>
      </div>

      <article class="bg-fondo-superficie border border-borde rounded-lg p-6">
        <div class="flex justify-between items-start gap-2 mb-4">
          <h1 class="text-xl font-secundaria">{{ decisionActual.titulo }}</h1>
          <span :class="[
            'px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap',
            decisionActual.estado === 'pendiente' ? 'bg-advertencia-claro text-advertencia' : '',
            decisionActual.estado === 'en_seguimiento' ? 'bg-informacion-claro text-informacion' : '',
            decisionActual.estado === 'cerrada' ? 'bg-exito-claro text-exito' : '',
            decisionActual.estado === 'archivada' ? 'bg-fondo-elevado text-texto-terciario' : ''
          ]">
            {{ formatearEstado(decisionActual.estado) }}
          </span>
        </div>

        <div class="flex gap-6 text-sm text-texto-secundario mb-4 pb-4 border-b border-borde">
          <span><strong>Categoría:</strong> {{ decisionActual.categoria }}</span>
          <span><strong>Prioridad:</strong> {{ decisionActual.prioridad }}</span>
          <span><strong>Creada:</strong> {{ formatearFecha(decisionActual.creado_en) }}</span>
        </div>

        <p v-if="decisionActual.descripcion" class="mb-5">{{ decisionActual.descripcion }}</p>

        <div v-if="decisionActual.estado !== 'cerrada' && decisionActual.estado !== 'archivada'" class="bg-fondo-elevado rounded-md p-4">
          <div v-if="!mostrandoResultado" class="text-center">
            <p class="text-texto-secundario mb-3">¿Ya tuvo resultado esta decisión?</p>
            <button class="bg-acento text-texto-inverso border-none py-2 px-5 rounded-md font-medium cursor-pointer" @click="mostrandoResultado = true">Registrar resultado</button>
          </div>
          <div v-else>
            <h3 class="mb-3">Registrar resultado</h3>
            <AlertaMensaje v-if="errorResultado" :mensaje="errorResultado" tipo="error" />
            <div class="flex gap-3 mb-3">
              <label :class="['px-3 py-1.5 border-1.5 rounded-md cursor-pointer', tipoResultado === 'positivo' ? 'border-acento bg-acento-claro' : 'border-borde']">
                <input type="radio" v-model="tipoResultado" value="positivo" class="hidden" /> Positivo
              </label>
              <label :class="['px-3 py-1.5 border-1.5 rounded-md cursor-pointer', tipoResultado === 'neutro' ? 'border-acento bg-acento-claro' : 'border-borde']">
                <input type="radio" v-model="tipoResultado" value="neutro" class="hidden" /> Neutro
              </label>
              <label :class="['px-3 py-1.5 border-1.5 rounded-md cursor-pointer', tipoResultado === 'negativo' ? 'border-acento bg-acento-claro' : 'border-borde']">
                <input type="radio" v-model="tipoResultado" value="negativo" class="hidden" /> Negativo
              </label>
            </div>
            <textarea v-model="descripcionResultado" class="w-full px-3 py-2 border border-borde rounded-md resize-y mb-3" rows="3" placeholder="Describí brevemente el resultado..."></textarea>
            <div class="flex justify-end gap-2">
              <button class="bg-none border border-borde px-3 py-1.5 rounded-md" @click="mostrandoResultado = false">Cancelar</button>
              <button class="bg-acento text-texto-inverso border-none px-3 py-1.5 rounded-md font-medium disabled:opacity-60" :disabled="guardandoResultado" @click="manejarResultado">
                {{ guardandoResultado ? 'Guardando...' : 'Guardar y cerrar' }}
              </button>
            </div>
          </div>
        </div>
        <p v-else class="text-texto-terciario italic">Esta decisión está cerrada.</p>
      </article>
    </template>

    <ModalConfirmacion
      :visible="modalEliminar"
      titulo="¿Eliminar esta decisión?"
      :mensaje="`Se eliminará permanentemente «${decisionActual?.titulo}». Esta acción no se puede deshacer.`"
      textoConfirmar="Eliminar"
      @confirmar="ejecutarEliminar"
      @cancelar="modalEliminar = false"
    />
  </div>
</template>