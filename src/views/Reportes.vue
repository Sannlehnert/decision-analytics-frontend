<script setup>
import { onMounted, ref } from 'vue'
import { usarMetricas } from '@/composables/usarMetricas.js'
import GraficoLinea from '@/components/comunes/GraficoLinea.vue'
import GraficoDona from '@/components/comunes/GraficoDona.vue'
import IndicadorCarga from '@/components/comunes/IndicadorCarga.vue'
import EstadoVacio from '@/components/comunes/EstadoVacio.vue'
import AlertaMensaje from '@/components/comunes/AlertaMensaje.vue'

const { resumen, evolucion, cargando, error, cargarResumen, cargarEvolucion } = usarMetricas()
const fechaInicio = ref('')
const fechaFin = ref('')

onMounted(async () => { await cargarResumen() })

async function aplicarFechas() {
  await cargarEvolucion(fechaInicio.value || undefined, fechaFin.value || undefined)
}

function datosCategoria() {
  if (!resumen.value?.porEstado) return []
  return resumen.value.porEstado.map(e => ({ etiqueta: e.estado.replace('_', ' '), valor: parseInt(e.cantidad) }))
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-2xl font-secundaria">Reportes</h1>

    <AlertaMensaje v-if="error" :mensaje="error" tipo="error" />
    <IndicadorCarga v-if="cargando && !resumen" />

    <template v-else-if="resumen">
      <section class="flex gap-4 items-end flex-wrap">
        <label class="text-sm text-texto-secundario flex flex-col gap-1">
          Desde
          <input type="date" v-model="fechaInicio" @change="aplicarFechas" class="px-2.5 py-1.5 border border-borde rounded-md text-sm" />
        </label>
        <label class="text-sm text-texto-secundario flex flex-col gap-1">
          Hasta
          <input type="date" v-model="fechaFin" @change="aplicarFechas" class="px-2.5 py-1.5 border border-borde rounded-md text-sm" />
        </label>
        <button @click="aplicarFechas" class="bg-acento text-texto-inverso border-none py-2 px-4 rounded-md text-sm font-medium cursor-pointer hover:bg-acento-hover transition-colors">Filtrar</button>
      </section>

      <section class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div class="col-span-full">
          <h2 class="text-sm font-medium text-texto-secundario mb-3">Evolución</h2>
          <GraficoLinea v-if="evolucion.length" :datos="evolucion" />
          <EstadoVacio v-else titulo="Sin datos para el rango" />
        </div>
        <GraficoDona v-if="datosCategoria().length" :datos="datosCategoria()" titulo="Distribución por estado" />
      </section>
    </template>

    <EstadoVacio v-else titulo="Sin métricas" descripcion="No hay datos para generar reportes todavía." />
  </div>
</template>