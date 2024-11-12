import axios from "axios";
import moment from "moment/moment";

const state = {
    organizer: {},
    manager: {},
    events: [],
    loader: true,
};

const mutations = {
    SET_ORGANIZER(state, organizer) {
        state.organizer = organizer;
    },
    SET_MANAGER(state, manager) {
        state.manager = manager;
    },
    SET_EVENTS(state, events) {
        state.events = events;
    },
    REMOVE_EVENT(state, id) {
        state.events = state.events.filter(event => event.id !== id);
    },
    STOP_LOADER(state) {
        state.loader = false;
    }
};

const actions = {
    async fetchOrganizerDetails({ commit }, id) {
        try {
            const response = await axios.get('/organizers/' + id);

            const organizer = {
                id: response.data.id,
                name: response.data.name,
                city: response.data.city,
                address: response.data.address,
            };

            const manager = {
                firstName: response.data.manager.firstName,
                lastName: response.data.manager.lastName,
                email: response.data.manager.email,
            };

            const events = response.data.events.map(event => ({
                id: event.id,
                address: event.address,
                city: event.city,
                country: event.country,
                date: moment(event.date).format('MMMM Do YYYY, HH:mm'),
                description: event.description,
                name: event.name,
                type: event.type,
                passed: Date.parse(new Date().toString()) > Date.parse(event.date)
            }))

            commit('SET_ORGANIZER', organizer);
            commit('SET_MANAGER', manager);
            commit('SET_EVENTS', events);
            commit('STOP_LOADER');
        } catch (error) {
            console.error('Error fetching event:', error);
        }
    },
    async removeEvent({ commit }, id) {
        try {
            await axios.delete('/events/' + id);
            commit('REMOVE_EVENT', id);
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    },
};

const getters = {
    organizer(state) {
        return state.organizer;
    },
    manager(state) {
        return state.manager
    },
    events(state) {
        return state.events;
    },
    loader(state) {
        return state.loader;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
