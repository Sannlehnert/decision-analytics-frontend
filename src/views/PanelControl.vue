<script setup>
import { onMounted } from 'vue'
import { usarMetricas } from '@/composables/usarMetricas.js'
import { useRouter } from 'vue-router'
import TarjetaKpi from '@/components/comunes/TarjetaKpi.vue'
import GraficoLinea from '@/components/comunes/GraficoLinea.vue'
import GraficoDona from '@/components/comunes/GraficoDona.vue'
import GraficoBarra from '@/components/comunes/GraficoBarra.vue'
import IndicadorCarga from '@/components/comunes/IndicadorCarga.vue'
import EstadoVacio from '@/components/comunes/EstadoVacio.vue'
import AlertaMensaje from '@/components/comunes/AlertaMensaje.vue'

const router = useRouter()
const { resumen, evolucion, cargando, error, cargarResumen, cargarEvolucion } = usarMetricas()

onMounted(async () => {
  await Promise.all([cargarResumen(), cargarEvolucion()])
})

function datosCategoria() {
  if (!resumen.value?.porEstado) return []
  const mapa = {}
  resumen.value.porEstado.forEach(e => { mapa[e.estado] = (mapa[e.estado] || 0) + parseInt(e.cantidad) })
  return Object.entries(mapa).map(([etiqueta, valor]) => ({ etiqueta, valor }))
}

function datosResultados() {
  if (!resumen.value?.resultados) return []
  return [
    { etiqueta: 'Positivos', valor: resumen.value.resultados.positivos },
    { etiqueta: 'Neutros', valor: resumen.value.resultados.neutros },
    { etiqueta: 'Negativos', valor: resumen.value.resultados.negativos }
  ]
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-secundaria">Dashboard</h1>
      <button
        class="bg-acento text-texto-inverso border-none py-2.5 px-5 rounded-md font-medium text-sm cursor-pointer transition-colors hover:bg-acento-hover"
        @click="router.push({ name: 'NuevaDecision' })"
      >+ Nueva decisión</button>
    </div>

    <AlertaMensaje v-if="error" :mensaje="error" tipo="error" />

    <IndicadorCarga v-if="cargando && !resumen" mensaje="Cargando métricas..." />

    <template v-else-if="resumen">
      <section class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        <TarjetaKpi titulo="Total decisiones" :valor="resumen.totalDecisiones" descripcion="Decisiones registradas" />
        <TarjetaKpi titulo="Resultados positivos" :valor="resumen.resultados?.positivos || 0" />
        <TarjetaKpi titulo="Pendientes" :valor="resumen.porEstado?.find(e => e.estado === 'pendiente')?.cantidad || 0" descripcion="Sin resolver aún" />
        <TarjetaKpi titulo="Tasa de éxito" :valor="resumen.totalDecisiones ? Math.round((resumen.resultados?.positivos || 0) / resumen.totalDecisiones * 100) + '%' : '0%'" />
      </section>

      <section class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div class="col-span-full">
          <h2 class="text-sm font-medium text-texto-secundario mb-3">Evolución temporal</h2>
          <GraficoLinea v-if="evolucion.length" :datos="evolucion" />
          <EstadoVacio v-else titulo="Sin datos de evolución" descripcion="Registrá decisiones para ver la evolución." />
        </div>

        <GraficoDona v-if="datosCategoria().length" :datos="datosCategoria()" titulo="Distribución por estado" />
        <EstadoVacio v-else titulo="Sin estados" />

        <GraficoBarra v-if="datosResultados().length" :datos="datosResultados()" titulo="Resultados" />
        <EstadoVacio v-else titulo="Sin resultados" />
      </section>
    </template>

    <EstadoVacio v-else titulo="Sin datos" descripcion="Comenzá registrando tu primera decisión." accion="Crear decisión" @accion="router.push({ name: 'NuevaDecision' })" />
  </div>
</template>