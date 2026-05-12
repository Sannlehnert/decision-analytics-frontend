import { ref } from 'vue'
import { metricasServicio } from '@/services/metricas.servicio.js'

export function usarMetricas() {
  const resumen = ref(null)
  const evolucion = ref([])
  const cargando = ref(false)
  const error = ref(null)

  async function cargarResumen() {
    cargando.value = true
    error.value = null
    try {
      resumen.value = await metricasServicio.obtenerResumen()
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al cargar métricas'
    } finally {
      cargando.value = false
    }
  }

  async function cargarEvolucion(fechaInicio, fechaFin) {
    cargando.value = true
    error.value = null
    try {
      evolucion.value = await metricasServicio.obtenerEvolucion(fechaInicio, fechaFin)
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al cargar evolución'
    } finally {
      cargando.value = false
    }
  }

  return {
    resumen,
    evolucion,
    cargando,
    error,
    cargarResumen,
    cargarEvolucion
  }
}