import axios from 'axios';
import {jwtDecode} from "jwt-decode";

const state = {
    //token: localStorage.getItem('token') || '',
    user: {},
};

const mutations = {
    // SET_TOKEN(state, token) {
    //     localStorage.setItem('token', token);
    // },
    SET_USER(state, user) {
        state.user = user;
    }
};

const actions = {
    async login({ commit }, data)
    {
        try {
            const response = await axios.post('/login_check', data);
            const token = response.data.token

            localStorage.setItem('token', token);
            localStorage.setItem('userId', jwtDecode(token).user.id);
            localStorage.setItem('userFirstName', jwtDecode(token).user.firstName);
            localStorage.setItem('userLastName', jwtDecode(token).user.lastName);
            localStorage.setItem('userEmail', jwtDecode(token).user.email);



            const user = {
                id: jwtDecode(token).user.id,
                email: jwtDecode(token).user.email,
                firstName: jwtDecode(token).user.firstName,
                lastName: jwtDecode(token).user.lastName,
                roles: jwtDecode(token).roles
            };

            //commit('SET_TOKEN', token);
            commit('SET_USER', user);

            return jwtDecode(token).user
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
