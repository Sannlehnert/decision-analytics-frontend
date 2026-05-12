<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend)

const props = defineProps({
  datos: Array,
  etiqueta: { type: String, default: 'Decisiones' }
})

const opciones = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { backgroundColor: '#1a1917', titleFont: { family: 'DM Sans' }, bodyFont: { family: 'DM Sans' }, cornerRadius: 8 }
  },
  scales: {
    x: { grid: { display: false }, ticks: { font: { family: 'DM Sans', size: 11 }, color: '#8c8982' } },
    y: { border: { display: false }, grid: { color: '#e3ded6' }, ticks: { font: { family: 'DM Sans', size: 11 }, color: '#8c8982' }, beginAtZero: true }
  }
}

const datosGrafico = computed(() => ({
  labels: props.datos.map(d => d.fecha),
  datasets: [{
    label: props.etiqueta,
    data: props.datos.map(d => d.cantidad),
    borderColor: '#8c7853',
    backgroundColor: 'rgba(140, 120, 83, 0.08)',
    fill: true,
    tension: 0.3,
    pointRadius: 3,
    pointBackgroundColor: '#8c7853',
    pointBorderColor: '#ffffff',
    pointBorderWidth: 2
  }]
}))
</script>

<template>
  <div class="w-full h-[280px]">
    <Line :data="datosGrafico" :options="opciones" />
  </div>
</template>