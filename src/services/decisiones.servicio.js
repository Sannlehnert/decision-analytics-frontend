import api from './api'

export const decisionesServicio = {
  async listar(filtros = {}) {
    const { data } = await api.get('/decisiones', { params: filtros })
    return data
  },

  async obtenerPorId(id) {
    const { data } = await api.get(`/decisiones/${id}`)
    return data
  },

  async crear(datos) {
    const { data } = await api.post('/decisiones', datos)
    return data
  },

  async actualizar(id, datos) {
    const { data } = await api.put(`/decisiones/${id}`, datos)
    return data
  },

  async eliminar(id) {
    await api.delete(`/decisiones/${id}`)
  },

  async agregarResultado(id, resultado) {
    const { data } = await api.post(`/decisiones/${id}/resultado`, resultado)
    return data
  }
}