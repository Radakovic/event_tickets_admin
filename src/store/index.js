import { createStore } from 'vuex';
import organizer from './modules/organizer';
import event from './modules/event';
import eventDetails from './modules/eventDetails';

export default createStore({
    modules: {
        organizer,
        event,
        eventDetails,
    },
});
