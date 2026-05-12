<script setup>
defineProps({
  titulo: String,
  valor: [Number, String],
  descripcion: { type: String, default: '' },
  tendencia: { type: String, default: null, validator: v => [null, 'arriba', 'abajo', 'estable'].includes(v) }
})
</script>

<template>
  <article class="bg-fondo-superficie border border-borde rounded-lg p-4 lg:p-5 relative transition-shadow duration-250 hover:shadow-sm">

    <h3 class="font-principal text-xs font-medium text-texto-secundario tracking-wider mb-1">{{ titulo }}</h3>
    <p class="font-secundaria text-4xl font-bold text-texto-primario leading-none">{{ valor }}</p>
    <p v-if="descripcion" class="text-2xs text-texto-terciario mt-1">{{ descripcion }}</p>
    <span
      v-if="tendencia"
      class="absolute top-4 right-4 text-lg"
      :class="{
        'text-exito': tendencia === 'arriba',
        'text-error': tendencia === 'abajo',
        'text-texto-terciario': tendencia === 'estable'
      }"
    >
      {{ tendencia === 'arriba' ? '↑' : tendencia === 'abajo' ? '↓' : '→' }}
    </span>
  </article>
</template>