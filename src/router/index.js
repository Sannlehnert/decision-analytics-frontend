import { createRouter, createWebHistory } from 'vue-router'

const rutas = [
  {
    path: '/iniciar-sesion',
    name: 'InicioSesion',
    component: () => import('@/views/InicioSesion.vue'),
    meta: { publica: true }
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import('@/views/Registro.vue'),
    meta: { publica: true }
  },
  {
    path: '/',
    component: () => import('@/components/layout/PanelLayout.vue'),
    children: [
      {
        path: '',
        name: 'PanelControl',
        component: () => import('@/views/PanelControl.vue')
      },
      {
        path: 'decisiones',
        name: 'ListaDecisiones',
        component: () => import('@/views/ListaDecisiones.vue')
      },
      {
        path: 'decisiones/nueva',
        name: 'NuevaDecision',
        component: () => import('@/views/DetalleDecision.vue'),
        props: { esNueva: true }
      },
      {
        path: 'decisiones/:id',
        name: 'DetalleDecision',
        component: () => import('@/views/DetalleDecision.vue'),
        props: true
      },
      {
        path: 'reportes',
        name: 'Reportes',
        component: () => import('@/views/Reportes.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: rutas
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (!to.meta.publica && !token) {
    next({ name: 'InicioSesion' })
  } else if (to.meta.publica && token && (to.name === 'InicioSesion' || to.name === 'Registro')) {
    next({ name: 'PanelControl' })
  } else {
    next()
  }
})

export default router