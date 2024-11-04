// src/store/index.js or index.ts
import { createStore } from 'vuex'

const store = createStore({
    state: {
        count: 0,
    },
    mutations: {
        increment(state) {
            state.count++
        },
        decrement(state) {
            state.count--
        }
    },
    actions: {
        increment({ commit }) {
            commit('increment')
        },
        decrement({ commit }) {
            commit('decrement')
        }
    },
    getters: {
        doubleCount(state) {
            return state.count * 2
        }
    }
})

export default store
