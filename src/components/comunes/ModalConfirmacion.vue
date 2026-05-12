<script setup>
defineProps({
  visible: Boolean,
  titulo: { type: String, default: '¿Estás seguro?' },
  mensaje: String,
  textoConfirmar: { type: String, default: 'Confirmar' },
  cargando: Boolean
})
defineEmits(['confirmar', 'cancelar'])
</script>

<template>
  <teleport to="body">
    <transition name="modal">
      <div v-if="visible" class="fixed inset-0 bg-texto-primario/50 flex items-center justify-center z-50 p-4" @click.self="$emit('cancelar')">
        <div class="bg-fondo-superficie rounded-xl p-6 max-w-md w-full shadow-lg" role="dialog" aria-modal="true">
          <h2 class="text-lg font-semibold mb-2">{{ titulo }}</h2>
          <p v-if="mensaje" class="text-sm text-texto-secundario mb-4">{{ mensaje }}</p>
          <div class="flex gap-3 justify-end">
            <button
              class="px-4 py-2 bg-transparent border border-borde rounded-md text-sm text-texto-secundario hover:bg-fondo-elevado transition-colors duration-150 disabled:opacity-60"
              @click="$emit('cancelar')"
              :disabled="cargando"
            >Cancelar</button>
            <button
              class="px-4 py-2 bg-error text-white border-none rounded-md text-sm font-medium hover:bg-[#a13e3e] transition-colors duration-150 disabled:opacity-60"
              @click="$emit('confirmar')"
              :disabled="cargando"
            >{{ cargando ? 'Procesando...' : textoConfirmar }}</button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>