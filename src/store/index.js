import { createStore } from 'vuex';
import organizer from '@/store/modules/organizer';
import event from '@/store/modules/event';
import eventDetails from '@/store/modules/eventDetails';
import organizerDetails from "@/store/modules/organizerDetails";
import organizerCreate from "@/store/modules/organizerCreate";
import login from "@/store/modules/login";
import logout from "@/store/modules/logout"

export default createStore({
    modules: {
        organizer,
        event,
        eventDetails,
        organizerDetails,
        organizerCreate,
        login,
        logout,
    },
});
