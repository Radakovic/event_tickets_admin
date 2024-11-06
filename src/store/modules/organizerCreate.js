import axios from "axios";

const state = {
    organizer: {},
    managers: [],
};

const mutations = {
    SET_ORGANIZER(state, organizer) {
        state.organizer = organizer;
    },
    SET_MANAGERS(state, managers) {
        state.managers = managers;
    }
};

const actions = {
    async createOrganizer({ commit }, data) {
        try {
            const response = await axios.post('/organizers', data);

            const organizer = {
                id: response.data.id,
                name: response.data.name,
            };

            commit('SET_ORGANIZER', organizer);
        } catch (error) {
            console.error('Error creating organizer:', error);
        }
    },

    async fetchManagers({ commit }) {
        try {
            const response = await axios.get('/users_managers');

            const managers = response.data.member.map(item => ({
                value: '/api/users/' + item.id,
                title: item.firstName + ' ' + item.lastName,
            }));

            commit('SET_MANAGERS', managers);
        } catch (error) {
            console.error('Error fetching managers:', error);
        }
    }
};

const getters = {
    organizer(state) {
        return state.organizer;
    },
    managers(state) {
        return state.managers;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
