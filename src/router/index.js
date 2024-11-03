
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
// import { createRouter, createWebHistory } from 'vue-router/auto'
// import { routes } from 'vue-router/auto-routes'
//
// console.log(routes)
//
// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes,
// })
//
// // Workaround for https://github.com/vitejs/vite/issues/11804
// router.onError((err, to) => {
//   if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
//     if (!localStorage.getItem('vuetify:dynamic-reload')) {
//       console.log('Reloading page to fix dynamic import error')
//       localStorage.setItem('vuetify:dynamic-reload', 'true')
//       location.assign(to.fullPath)
//     } else {
//       console.error('Dynamic import error, reloading page did not fix it', err)
//     }
//   } else {
//     console.error(err)
//   }
// })
//
// router.isReady().then(() => {
//   localStorage.removeItem('vuetify:dynamic-reload')
// })
//
// export default router






import { createRouter, createWebHistory } from 'vue-router';
import EventDetails from '@/pages/events/[id].vue';
import Event from '@/pages/events/index.vue';
import Organizers from "@/pages/organizers/index.vue";
import OrganizerDetails from "@/pages/organizers/[id].vue";

const routes = [
  {
    path: '/',
    name: 'organizer',
    component: Organizers,
  },
  {
    path: '/organizers/:id',
    name: 'organizer-details',
    component: OrganizerDetails,
  },
  {
    path: '/events/:id',
    name: 'event-details',
    component: EventDetails,
  },
  {
    path: '/events',
    name: 'event-list',
    component: Event,
  },
  // Add more routes as necessary
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Workaround for dynamic import errors
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error');
      localStorage.setItem('vuetify:dynamic-reload', 'true');
      location.assign(to.fullPath);
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload');
});

export default router;

