<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const props = defineProps({
  datos: Array,
  titulo: { type: String, default: '' },
  color: { type: String, default: '#8c7853' }
})

const opciones = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false }, ticks: { font: { family: 'DM Sans', size: 12 }, color: '#8c8982' } },
    y: { border: { display: false }, grid: { color: '#e3ded6' }, ticks: { font: { family: 'DM Sans', size: 11 }, color: '#8c8982' }, beginAtZero: true }
  }
}

const datosGrafico = computed(() => ({
  labels: props.datos.map(d => d.etiqueta),
  datasets: [{
    data: props.datos.map(d => d.valor),
    backgroundColor: props.datos.map((_, i) => {
      const colores = ['#8c7853', '#4a7c59', '#b84c4c']
      return colores[i % colores.length]
    }),
    borderRadius: 6,
    borderSkipped: false
  }]
}))
</script>

<template>
  <div class="bg-fondo-superficie border border-borde rounded-lg p-5">
    <h3 v-if="titulo" class="text-sm font-medium text-texto-secundario mb-4">{{ titulo }}</h3>
    <div class="w-full h-[250px]">
      <Bar :data="datosGrafico" :options="opciones" />
    </div>
  </div>
</template>