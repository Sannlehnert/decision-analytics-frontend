export function validadorEmail(email) {
  if (!email) return false
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email.trim())
}

export function validadorClave(clave) {
  return clave && clave.length >= 8
}

export function validadorTitulo(titulo) {
  return titulo && titulo.trim().length >= 5
}

export function validadorCategoria(categoria) {
  const categorias = ['trabajo', 'personal', 'salud', 'finanzas', 'educacion', 'otro']
  return categorias.includes(categoria)
}