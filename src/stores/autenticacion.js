import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authServicio } from '@/services/auth.servicio.js'

export const usarStoreAutenticacion = defineStore('autenticacion', () => {
  const usuario = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const cargando = ref(false)
  const error = ref(null)

  const estaAutenticado = computed(() => !!token.value)

  function limpiarError() {
    error.value = null
  }

  async function registrar(email, clave) {
    cargando.value = true
    error.value = null
    try {
      const respuesta = await authServicio.registrar(email, clave)
      return respuesta
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al registrar'
      throw err
    } finally {
      cargando.value = false
    }
  }

  async function iniciarSesion(email, clave) {
    cargando.value = true
    error.value = null
    try {
      const respuesta = await authServicio.iniciarSesion(email, clave)
      token.value = respuesta.token
      usuario.value = respuesta.usuario
      localStorage.setItem('token', respuesta.token)
      return respuesta
    } catch (err) {
      error.value = err.response?.data?.error || 'Credenciales inválidas'
      throw err
    } finally {
      cargando.value = false
    }
  }

  function cerrarSesion() {
    token.value = null
    usuario.value = null
    localStorage.removeItem('token')
  }

  return {
    usuario,
    token,
    cargando,
    error,
    estaAutenticado,
    limpiarError,
    registrar,
    iniciarSesion,
    cerrarSesion
  }
})