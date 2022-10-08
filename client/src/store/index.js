import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		device: 'pc',
		isCollapse: false
	},
	getters: {
		getterDevice(state) {
			return state.device
		},
		getterIsCollapse(state) {
			return state.isCollapse
		},
	},
	mutations: {
		setDevice(state, payload) {
			state.device = payload
		},
		setIsCollapse(state, payload) {
			state.isCollapse = payload
		}
	},
	actions: {
	},
	modules: {
	},
	plugins: [createPersistedState({
		storage: window.sessionStorage
	})]
})
