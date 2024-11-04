import axios from "axios";
import moment from "moment/moment";

const state = {
    event: {},
    tickets: [],
    loader: true,
};

const mutations = {
    SET_EVENT(state, event) {
        state.event = event;
    },
    SET_TICKETS(state, tickets) {
        state.tickets = tickets;
    },
    REMOVE_TICKET(state, id) {
        state.tickets = state.tickets.filter(ticket => ticket.id !== id);
    },
    STOP_LOADER(state) {
        state.loader = false;
    }
};

const actions = {
    async fetchEventDetails({ commit }, id) {
        try {
            const response = await axios.get('/events/' + id);

            const event = {
                id: response.data.id,
                name: response.data.name,
                city: response.data.city,
                address: response.data.address,
                country: response.data.country,
                date: moment(response.data.date).format('MMMM Do YYYY, HH:mm'),
                description: response.data.description,
                type: response.data.type,
                passed: Date.parse(new Date().toString()) > Date.parse(response.data.date)
            };

            const tickets = response.data.tickets.map(ticket => ({
                id: ticket.id,
                price: (ticket.price / 100).toFixed(2),
                type: ticket.type,
                numberAvailableTickets: ticket.numberAvailableTickets
            }))

            commit('SET_EVENT', event);
            commit('SET_TICKETS', tickets);
            commit('STOP_LOADER');
        } catch (error) {
            console.error('Error fetching event:', error);
        }
    },
    async removeTicket({ commit }, id) {
        try {
            await axios.delete('/tickets/' + id);
            commit('REMOVE_TICKET', id);
        } catch (error) {
            console.error('Error deleting ticket:', error);
        }
    },
};

const getters = {
    event(state) {
        return state.event;
    },
    tickets(state) {
        return state.tickets
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
