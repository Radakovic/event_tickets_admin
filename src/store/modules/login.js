import axios from 'axios';
import {jwtDecode} from "jwt-decode";

const state = {
    token: localStorage.getItem('token') || '',
    user: localStorage.getItem('user') || {},
};

const mutations = {
    SET_TOKEN(state, token) {
        localStorage.setItem('token', token);
    },
};

const actions = {
    async login({ commit }, data)
    {
        try {
            const response = await axios.post('/login_check', data);
            const token = response.data.token

            commit('SET_TOKEN', token);
            console.log(jwtDecode(token));
        } catch (error) {
            console.error('Error login:', error);
        }
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
