<script setup>
import BarraLateral from './BarraLateral.vue'
import { RouterView } from 'vue-router'
</script>

<template>
    <div class="min-h-screen flex flex-col lg:pl-64">
        <BarraLateral />
        <main class="flex-1 w-full max-w-screen-xl mx-auto px-4 py-6 lg:px-6 lg:py-8">
            <RouterView />
        </main>
    </div>
</template>