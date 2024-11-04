import { createStore } from 'vuex';
import organizer from './modules/organizer';
import event from './modules/event';

export default createStore({
    modules: {
        organizer,
        event,
    },
});
