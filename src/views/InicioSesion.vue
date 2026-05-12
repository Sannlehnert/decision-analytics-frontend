<script setup>
import { ref } from 'vue'
import { usarAutenticacion } from '@/composables/usarAutenticacion.js'
import AlertaMensaje from '@/components/comunes/AlertaMensaje.vue'

const { iniciarSesion, cargando, error, limpiarError, erroresValidacion } = usarAutenticacion()
const email = ref('')
const clave = ref('')

async function manejarEnvio() {
  await iniciarSesion(email.value, clave.value)
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-fondo-principal">
    <div class="w-full max-w-md bg-fondo-superficie border border-borde rounded-xl p-6 lg:p-8">
      <h1 class="font-secundaria text-2xl font-semibold mb-1">Decision Analytics</h1>
      <p class="text-texto-secundario text-sm mb-6">Iniciá sesión para continuar</p>

      <AlertaMensaje v-if="error" :mensaje="error" tipo="error" @cerrar="limpiarError" />

      <form class="flex flex-col gap-4" @submit.prevent="manejarEnvio">
        <div class="flex flex-col gap-1">
          <label for="email" class="text-sm font-medium text-texto-primario">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="px-3 py-2.5 border-1.5 border-borde rounded-md text-base transition-colors duration-rapida focus:outline-none focus:border-borde-foco focus:ring-3 focus:ring-acento/10"
            :class="{ 'border-error': erroresValidacion.email }"
            placeholder="tu@email.com"
            autocomplete="email"
          />
          <p v-if="erroresValidacion.email" class="text-2xs text-error">{{ erroresValidacion.email }}</p>
        </div>

        <div class="flex flex-col gap-1">
          <label for="clave" class="text-sm font-medium text-texto-primario">Clave</label>
          <input
            id="clave"
            v-model="clave"
            type="password"
            class="px-3 py-2.5 border-1.5 border-borde rounded-md text-base transition-colors duration-rapida focus:outline-none focus:border-borde-foco focus:ring-3 focus:ring-acento/10"
            :class="{ 'border-error': erroresValidacion.clave }"
            placeholder="Tu clave"
            autocomplete="current-password"
          />
          <p v-if="erroresValidacion.clave" class="text-2xs text-error">{{ erroresValidacion.clave }}</p>
        </div>

        <button
          type="submit"
          :disabled="cargando"
          class="mt-2 py-3 bg-acento text-texto-inverso border-none rounded-md font-medium text-base cursor-pointer transition-colors duration-rapida hover:bg-acento-hover disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ cargando ? 'Ingresando...' : 'Iniciar sesión' }}
        </button>
      </form>

      <p class="text-center mt-4 text-sm text-texto-secundario">
        ¿No tenés cuenta? <router-link to="/registro" class="text-acento hover:text-acento-hover">Registrate</router-link>
      </p>
    </div>
  </div>
</template>