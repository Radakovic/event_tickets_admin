const initialState = () => ({
    isAdmin: false,
    isManager: false,
    isAuthenticated: false,
    user: null,
    events: [],
    loader: true,
    event: {},
    tickets: [],
    organizers: [],
    organizer: {},
    managers: [],
    manager: {},
})

const mutations = {
    CLEAR_STATE(state) {
        Object.assign(state, initialState());
    }

};

const actions = {
    async logout({ commit }) {
        localStorage.clear()
        commit('CLEAR_STATE')
    }
};

export default {
    namespaced: true,
    mutations,
    actions,
};
