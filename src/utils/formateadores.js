export function formatearFecha(fecha) {
  if (!fecha) return ''
  return new Date(fecha).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

export function formatearFechaRelativa(fecha) {
  if (!fecha) return ''
  const ahora = new Date()
  const fechaObj = new Date(fecha)
  const diferencia = ahora - fechaObj
  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24))

  if (dias === 0) return 'Hoy'
  if (dias === 1) return 'Ayer'
  if (dias < 7) return `Hace ${dias} días`
  if (dias < 30) return `Hace ${Math.floor(dias / 7)} semanas`
  if (dias < 365) return `Hace ${Math.floor(dias / 30)} meses`
  return `Hace ${Math.floor(dias / 365)} años`
}

export function formatearEstado(estado) {
  const mapa = {
    pendiente: 'Pendiente',
    en_seguimiento: 'En seguimiento',
    cerrada: 'Cerrada',
    archivada: 'Archivada'
  }
  return mapa[estado] || estado
}

export function formatearPrioridad(prioridad) {
  const mapa = {
    baja: 'Baja',
    media: 'Media',
    alta: 'Alta',
    urgente: 'Urgente'
  }
  return mapa[prioridad] || prioridad
}

export function claseEstado(estado) {
  const mapa = {
    pendiente: 'estado-pendiente',
    en_seguimiento: 'estado-seguimiento',
    cerrada: 'estado-cerrada',
    archivada: 'estado-archivada'
  }
  return mapa[estado] || ''
}

export function claseResultado(tipo) {
  if (tipo === 'positivo') return 'resultado-positivo'
  if (tipo === 'negativo') return 'resultado-negativo'
  return 'resultado-neutro'
}