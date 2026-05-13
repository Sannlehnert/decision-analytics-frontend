<script setup>
import { ref } from 'vue'
import { usarAutenticacion } from '@/composables/usarAutenticacion.js'
import { useRouter, useRoute } from 'vue-router'

const { cerrarSesion, usuario } = usarAutenticacion()
const router = useRouter()
const route = useRoute()
const menuAbierto = ref(false)

function navegar(ruta) {
  router.push(ruta)
  menuAbierto.value = false
}

function esRutaActiva(ruta) {
  if (ruta === '/') return route.path === '/'
  return route.path.startsWith(ruta)
}
</script>

<template>
  <!-- Overlay para mobile -->
  <div
    v-if="menuAbierto"
    class="fixed inset-0 bg-texto-primario/30 z-40 lg:hidden transition-opacity duration-base"
    @click="menuAbierto = false"
  />

  <!-- Sidebar -->
<aside
    :class="[
      'fixed top-0 left-0 z-50 h-full w-64 bg-fondo-superficie border-r border-borde flex flex-col transition-transform duration-250 lg:translate-x-0',
      menuAbierto ? 'translate-x-0' : '-translate-x-full'
    ]"
>
    <!-- Logo -->
    <div class="h-14 flex items-center px-4 border-b border-borde shrink-0">
      <button @click="navegar('/')" class="font-secundaria text-lg font-semibold text-texto-primario tracking-tight bg-transparent border-none cursor-pointer">
        Decision Lab
      </button>
    </div>

    <!-- Navegación -->
    <nav class="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
      <button
        @click="navegar('/')"
        :class="[
          'w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors duration-rapida',
          esRutaActiva('/') ? 'bg-acento-claro text-acento' : 'text-texto-secundario hover:text-texto-primario hover:bg-fondo-elevado'
        ]"
      >
        Dashboard
      </button>
      <button
        @click="navegar('/decisiones')"
        :class="[
          'w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors duration-rapida',
          esRutaActiva('/decisiones') ? 'bg-acento-claro text-acento' : 'text-texto-secundario hover:text-texto-primario hover:bg-fondo-elevado'
        ]"
      >
        Decisiones
      </button>
      <button
        @click="navegar('/reportes')"
        :class="[
          'w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors duration-rapida',
          esRutaActiva('/reportes') ? 'bg-acento-claro text-acento' : 'text-texto-secundario hover:text-texto-primario hover:bg-fondo-elevado'
        ]"
      >
        Reportes
      </button>
    </nav>

    <!-- Usuario -->
    <div class="border-t border-borde p-4 space-y-2 shrink-0">
      <p class="text-xs text-texto-terciario truncate">{{ usuario?.email }}</p>
      <button
        @click="cerrarSesion"
        class="w-full text-left text-sm text-texto-secundario hover:text-error transition-colors duration-rapida bg-transparent border-none cursor-pointer p-0"
      >
        Salir
      </button>
    </div>
  </aside>

  <!-- Botón hamburguesa (mobile) -->
  <button
    class="fixed top-2 left-2 z-30 lg:hidden bg-fondo-superficie border border-borde rounded-md p-1.5 shadow-xs"
    @click="menuAbierto = !menuAbierto"
    aria-label="Menú"
  >
    <svg class="w-5 h-5 text-texto-primario" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path v-if="!menuAbierto" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</template>