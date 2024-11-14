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
import Login from "@/pages/login/login.vue";
import Logout from "@/pages/login/logout.vue";

const routes = [
  {path: '/', name: 'login', component: Login},
  {path: '/logout', name: 'logout', component: Logout},
  {path: '/organizers', name: 'organizer', component: Organizers, meta: { requiresAuth: true }},
  {path: '/organizers/:id', name: 'organizer-details', component: OrganizerDetails, },
  {path: '/organizers/:id', name: 'organizer-edit', component: OrganizerEdit, },
  {path: '/organizers', name: 'organizer-create', component: OrganizerCreate, },
  {path: '/events', name: 'event-list', component: Event, },
  {path: '/events/:id', name: 'event-details', component: EventDetails, },
  {path: '/events/:id', name: 'event-edit', component: EditEvent, },
  {path: '/events', name: 'event-create', component: EventCreate, },
  {path: '/tickets', name: 'ticket-create', component: TicketCreate, },
  {path: '/tickets/:id', name: 'ticket-edit', component: TicketEdit, }
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isManager = JSON.parse(localStorage.getItem('isManager'));
    if (isManager === true) {
      next();
    } else {
      console.log('nije Manager')
      next({ name: 'logout' });
    }
  } else {
    next();
  }
});

export default router;

