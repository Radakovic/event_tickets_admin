import { createStore } from 'vuex';
import organizer from './modules/organizer';

export default createStore({
    modules: {
        organizer,
    },
});
