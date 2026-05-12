import { usarStoreDecisiones } from '@/stores/decisiones.js'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

export function usarDecisiones() {
  const store = usarStoreDecisiones()
  const { decisiones, decisionActual, cargando, error, filtros, decisionesFiltradas } = storeToRefs(store)
  const erroresValidacion = ref({})

  function validarFormulario(datos) {
    const errores = {}
    if (!datos.titulo || datos.titulo.trim().length < 5) {
      errores.titulo = 'El título debe tener al menos 5 caracteres'
    }
    if (!datos.categoria) {
      errores.categoria = 'Seleccioná una categoría'
    }
    erroresValidacion.value = errores
    return Object.keys(errores).length === 0
  }

  async function crear(datos) {
    store.limpiarError()
    if (!validarFormulario(datos)) return null
    try {
      return await store.crearDecision(datos)
    } catch {
      return null
    }
  }

  async function actualizar(id, datos) {
    store.limpiarError()
    if (!validarFormulario(datos)) return null
    try {
      return await store.actualizarDecision(id, datos)
    } catch {
      return null
    }
  }

  return {
    decisiones,
    decisionActual,
    cargando,
    error,
    filtros,
    decisionesFiltradas,
    erroresValidacion,
    cargarDecisiones: store.cargarDecisiones,
    cargarDecision: store.cargarDecision,
    crear,
    actualizar,
    eliminar: store.eliminarDecision,
    agregarResultado: store.agregarResultado,
    limpiarError: store.limpiarError
  }
}