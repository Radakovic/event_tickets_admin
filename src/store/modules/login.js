import axios from 'axios';
import {jwtDecode} from "jwt-decode";

const state = {
    user: {},
    isAdmin: false,
    isManager: false,
    isAuthenticated: false,
};

const mutations = {
    SET_USER(state, user) {
        state.user = user;
    },
};

const actions = {
    async login({ commit }, data)
    {
        try {
            const response = await axios.post('/login_check', data);
            const token = response.data.token

            localStorage.setItem('token', token);
            localStorage.setItem('isAuthenticated', JSON.stringify(true));

            const user = {
                id: jwtDecode(token).user.id,
                email: jwtDecode(token).user.email,
                firstName: jwtDecode(token).user.firstName,
                lastName: jwtDecode(token).user.lastName,
                roles: jwtDecode(token).roles
            };

            commit('SET_USER', user);
            if (user.roles.includes('ROLE_ADMIN')) {
                localStorage.setItem('isAdmin', true)
                localStorage.setItem('isManager', true)
            }

            if (user.roles.includes('ROLE_MANAGER')) {
                localStorage.setItem('isManager', true)
            }
        } catch (error) {
            console.error('Error login:', error);
        }
    },
};
const getters = {
    user(state) {
        return state.user;
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
