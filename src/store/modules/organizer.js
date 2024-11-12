import axios from 'axios';

const state = {
    organizers: [],
};

const mutations = {
    SET_ORGANIZERS(state, organizers) {
        state.organizers = organizers;
    },
    REMOVE_ORGANIZER(state, id) {
        state.organizers = state.organizers.filter(organizer => organizer.id !== id);
    },
};

const actions = {
    async fetchOrganizers({ commit }) {
        try {
            const response = await axios.get('/organizers', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const organizers = response.data.member.map(item => ({
                id: item.id,
                address: item.address,
                city: item.city,
                name: item.name,
                link: '/organizers/' + item.id,
            }));
            commit('SET_ORGANIZERS', organizers);
        } catch (error) {
            console.error('Error fetching organizers:', error);
        }
    },
    async deleteItem({ commit }, item) {
        try {
            await axios.delete('/organizers/' + item.id);
            commit('REMOVE_ORGANIZER', item.id);  // Commit the mutation to remove the organizer
        } catch (error) {
            console.error('Error deleting organizer:', error);
        }
    },
};

const getters = {
    organizers(state) {
        return state.organizers;
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};

