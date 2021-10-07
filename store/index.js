import { SET_CAR_POSTS, SET_RESERVATIONS } from './mutations.type'
import { db } from "../plugins/firebase"
import Vue from 'vue'
import Vuex from 'vuex'

/*Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        reservations: ['res1', 'res2']
    },
    mutations: {
        setReservds(state, val) {
            state.reservations = val
        }
    }
})
*/

/*db.ref('Reservations/')
    .orderByChild('IsHidden')
    .equalTo(0)
    .on('value', (snapshot) => {
        let reservsArray = []
        snapshot.forEach((childSnapshot) => {
            reservsArray.push(childSnapshot)
        })
        store.commit('SET_RESERVATIONS', reservsArray)
    })
*/
export const state = () => ({
    carPosts: [],
    user: null,
    reservations: [],
})

export const mutations = {
    [SET_CAR_POSTS](state, list) {
        state.carPosts = list
    },
    SET_USER(state, user) {
        state.user = user
    },
    [SET_RESERVATIONS](state, val) {
        state.reservations = val
    }
}

export const actions = {
    getReservds() {
        let reservsArray = []
        db.ref('Reservations/')
            .orderByChild('IsHidden')
            .equalTo(0)
            .on('value', (snapshot) => {

                snapshot.forEach((childSnapshot) => {
                        reservsArray.push(childSnapshot)
                    })
                    //return reservsArray
            })
        console.log('inside getReservds=' + reservsArray[0].key)
        return reservsArray
            // return ['res1', 'res2']
    },
    getPosts(files) {
        return files.keys().map((key) => {
            let res = files(key)
            res.slug = key.slice(2, -5)
            return res
        })
    },
    async nuxtServerInit({ commit }) {

        let carFiles = await require.context('~/assets/content/cars/', false, /\.json$/)
        await commit(SET_CAR_POSTS, actions.getPosts(carFiles))
        await commit(SET_RESERVATIONS, actions.getReservds())

        // ? When adding/changing NetlifyCMS collection types, make sure to:
        // ? 1. Add/rename exact slugs here
        // ? 2. Add/rename the MUTATION_TYPE names in `./mutations.type.js`
        // ? 3. Add/rename `pages/YOUR_SLUG_HERE` and use the Vuex store like the included examples
        // ? If you are adding, add a state, mutation and commit (like above) for it too
    },
    async onAuthStateChangedAction(state, { authUser, claims }) {
        if (!authUser) {
            state.commit('SET_USER', null)
            this.$router.push({
                path: '/login'
            })
        } else {
            const { uid, email } = authUser
            state.commit('SET_USER', {
                uid,
                email,
            })
        }
    }
}

export const getters = {
    getUser(state) {
        return state.user
    },
}