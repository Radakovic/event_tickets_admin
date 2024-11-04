import { createStore } from 'vuex';
import organizer from './modules/organizer';
import event from './modules/event';
import eventDetails from './modules/eventDetails';
import organizerDetails from "@/store/modules/organizerDetails";

export default createStore({
    modules: {
        organizer,
        event,
        eventDetails,
        organizerDetails,
    },
});
