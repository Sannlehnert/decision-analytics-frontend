<script setup>
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps({
  datos: Array,
  titulo: { type: String, default: '' }
})

const colores = ['#8c7853', '#4a7c59', '#b84c4c', '#4c6b8c', '#b8863c', '#6b5c3f']

const opciones = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom', labels: { font: { family: 'DM Sans', size: 12 }, color: '#5c5954', padding: 16, usePointStyle: true, pointStyleWidth: 8 } }
  }
}

const datosGrafico = computed(() => ({
  labels: props.datos.map(d => d.etiqueta),
  datasets: [{
    data: props.datos.map(d => d.valor),
    backgroundColor: props.datos.map((_, i) => colores[i % colores.length]),
    borderColor: '#ffffff',
    borderWidth: 2
  }]
}))
</script>

<template>
  <div class="bg-fondo-superficie border border-borde rounded-lg p-5">
    <h3 v-if="titulo" class="text-sm font-medium text-texto-secundario mb-4">{{ titulo }}</h3>
    <div class="w-full max-w-[280px] mx-auto h-[260px]">
      <Doughnut :data="datosGrafico" :options="opciones" />
    </div>
  </div>
</template>