import api from './api'

export const metricasServicio = {
  async obtenerResumen() {
    const { data } = await api.get('/metricas')
    return data
  },

  async obtenerEvolucion(fechaInicio, fechaFin) {
    const { data } = await api.get('/metricas/evolucion', {
      params: { fechaInicio, fechaFin }
    })
    return data
  }
}