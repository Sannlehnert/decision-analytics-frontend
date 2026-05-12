import api from './api'

export const categoriasServicio = {
  async listar() {
    const { data } = await api.get('/categorias')
    return data
  }
}