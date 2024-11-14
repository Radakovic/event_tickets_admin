import axios from "axios";
import moment from "moment/moment";

const state = {
    events: [],
    loader: true,
};

const mutations = {
    SET_EVENTS(state, events) {
        state.events = events;
    },
    REMOVE_EVENT(state, id) {
        state.events = state.events.filter(event => event.id !== id);
    },
    STOP_LOADER(state) {
        state.loader = false;
    },
    START_LOADER(state) {
        state.loader = true;
    }
};

const actions = {
    async fetchEvents({ commit }, url) {
        commit('START_LOADER');
        try {
            const response = await axios.get(url);
            const events = response.data.member.map(item => ({
                id: item.id,
                address: item.address,
                city: item.city,
                name: item.name,
                country: item.country,
                date: moment(item.date).format('MMMM Do YYYY, HH:mm'),
                description: item.description,
                link: '/events/' + item.id,
                passed: Date.parse(new Date().toString()) > Date.parse(item.date)
            }));
            commit('SET_EVENTS', events);
            commit('STOP_LOADER');
        } catch (error) {
            console.error('Error fetching events:', error);
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
    events(state) {
        return state.events;
    },
    loader(state) {
        return state.loader
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
