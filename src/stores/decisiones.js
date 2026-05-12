import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { decisionesServicio } from '@/services/decisiones.servicio.js'

export const usarStoreDecisiones = defineStore('decisiones', () => {
  const decisiones = ref([])
  const decisionActual = ref(null)
  const cargando = ref(false)
  const error = ref(null)
  const filtros = ref({
    estado: '',
    categoria: '',
    prioridad: ''
  })

  const decisionesFiltradas = computed(() => {
    let resultado = [...decisiones.value]
    if (filtros.value.estado) {
      resultado = resultado.filter(d => d.estado === filtros.value.estado)
    }
    if (filtros.value.categoria) {
      resultado = resultado.filter(d => d.categoria === filtros.value.categoria)
    }
    if (filtros.value.prioridad) {
      resultado = resultado.filter(d => d.prioridad === filtros.value.prioridad)
    }
    return resultado
  })

  function limpiarError() {
    error.value = null
  }

  async function cargarDecisiones() {
    cargando.value = true
    error.value = null
    try {
      decisiones.value = await decisionesServicio.listar()
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al cargar decisiones'
    } finally {
      cargando.value = false
    }
  }

  async function cargarDecision(id) {
    cargando.value = true
    error.value = null
    try {
      decisionActual.value = await decisionesServicio.obtenerPorId(id)
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al cargar la decisión'
    } finally {
      cargando.value = false
    }
  }

  async function crearDecision(datos) {
    cargando.value = true
    error.value = null
    try {
      const nueva = await decisionesServicio.crear(datos)
      decisiones.value.unshift(nueva)
      return nueva
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al crear la decisión'
      throw err
    } finally {
      cargando.value = false
    }
  }

  async function actualizarDecision(id, datos) {
    cargando.value = true
    error.value = null
    try {
      const actualizada = await decisionesServicio.actualizar(id, datos)
      const indice = decisiones.value.findIndex(d => d.id === id)
      if (indice !== -1) decisiones.value[indice] = actualizada
      if (decisionActual.value?.id === id) decisionActual.value = actualizada
      return actualizada
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al actualizar'
      throw err
    } finally {
      cargando.value = false
    }
  }

  async function eliminarDecision(id) {
    cargando.value = true
    error.value = null
    try {
      await decisionesServicio.eliminar(id)
      decisiones.value = decisiones.value.filter(d => d.id !== id)
      if (decisionActual.value?.id === id) decisionActual.value = null
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al eliminar'
      throw err
    } finally {
      cargando.value = false
    }
  }

  async function agregarResultado(id, resultado) {
    cargando.value = true
    error.value = null
    try {
      const respuesta = await decisionesServicio.agregarResultado(id, resultado)
      await cargarDecision(id)
      return respuesta
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al registrar resultado'
      throw err
    } finally {
      cargando.value = false
    }
  }

  return {
    decisiones,
    decisionActual,
    cargando,
    error,
    filtros,
    decisionesFiltradas,
    limpiarError,
    cargarDecisiones,
    cargarDecision,
    crearDecision,
    actualizarDecision,
    eliminarDecision,
    agregarResultado
  }
})