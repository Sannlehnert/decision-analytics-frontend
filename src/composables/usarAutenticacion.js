import { usarStoreAutenticacion } from '@/stores/autenticacion.js'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { validadorEmail, validadorClave } from '@/utils/validadores.js'
import { ref, computed } from 'vue'

export function usarAutenticacion() {
  const store = usarStoreAutenticacion()
  const { cargando, error, estaAutenticado, usuario } = storeToRefs(store)
  const router = useRouter()

  const erroresValidacion = ref({})

  const validarFormulario = (email, clave, esRegistro = false) => {
    const errores = {}
    if (!validadorEmail(email)) errores.email = 'Ingresá un email válido'
    if (esRegistro && !validadorClave(clave)) errores.clave = 'La clave debe tener al menos 8 caracteres'
    if (!clave) errores.clave = 'La clave es requerida'
    erroresValidacion.value = errores
    return Object.keys(errores).length === 0
  }

  async function iniciarSesion(email, clave) {
    store.limpiarError()
    if (!validarFormulario(email, clave)) return
    try {
      await store.iniciarSesion(email, clave)
      router.push({ name: 'PanelControl' })
    } catch {
      // El error ya se guarda en la store
    }
  }

  async function registrar(email, clave) {
    store.limpiarError()
    if (!validarFormulario(email, clave, true)) return
    try {
      await store.registrar(email, clave)
      // Después del registro, iniciamos sesión automáticamente
      await store.iniciarSesion(email, clave)
      router.push({ name: 'PanelControl' })
    } catch {
      // Error en store
    }
  }

  function cerrarSesion() {
    store.cerrarSesion()
    router.push({ name: 'InicioSesion' })
  }

  return {
    cargando,
    error,
    estaAutenticado,
    usuario,
    erroresValidacion,
    iniciarSesion,
    registrar,
    cerrarSesion,
    limpiarError: store.limpiarError
  }
}