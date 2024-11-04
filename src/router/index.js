import { createRouter, createWebHistory } from 'vue-router';
import EventDetails from '@/pages/events/[id].vue';
import Event from '@/pages/events/index.vue';
import Organizers from "@/pages/organizers/index.vue";
import OrganizerDetails from "@/pages/organizers/[id].vue";
import EditEvent from "@/pages/events/[id]-edit.vue";
import OrganizerEdit from "@/pages/organizers/[id]-edit.vue";
import OrganizerCreate from "@/pages/organizers/create.vue";
import EventCreate from "@/pages/events/create.vue";
import TicketCreate from "@/pages/tickets/create.vue";
import TicketEdit from "@/pages/tickets/[id]-edit.vue";

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
    path: '/organizers/:id',
    name: 'organizer-edit',
    component: OrganizerEdit,
  },
  {
    path: '/organizers',
    name: 'organizer-create',
    component: OrganizerCreate,
  },
  {
    path: '/events',
    name: 'event-list',
    component: Event,
  },
  {
    path: '/events/:id',
    name: 'event-details',
    component: EventDetails,
  },
  {
    path: '/events/:id',
    name: 'event-edit',
    component: EditEvent,
  },
  {
    path: '/events',
    name: 'event-create',
    component: EventCreate,
  },
  {
    path: '/tickets',
    name: 'ticket-create',
    component: TicketCreate,
  },
  {
    path: '/tickets/:id',
    name: 'ticket-edit',
    component: TicketEdit,
  }
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

