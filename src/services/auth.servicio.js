import api from './api'

export const authServicio = {
  async registrar(email, clave) {
    const { data } = await api.post('/auth/registro', { email, clave })
    return data
  },

  async iniciarSesion(email, clave) {
    const { data } = await api.post('/auth/login', { email, clave })
    return data
  }
}