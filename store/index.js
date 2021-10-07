import { SET_CAR_POSTS, SET_RESERVATIONS } from './mutations.type'
import { db } from "../plugins/firebase"
export const state = () => ({
    carPosts: [],
    user: null,
    reservations: [],
    pickupDate: '',
    returnDate: '',
    pickupLocation: '',
    returnLocation: '',
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
    },
    SET_PICKUP_DATE(state, val) {
        state.pickupDate = val
    },
    SET_RETURN_DATE(state, val) {
        state.returnDate = val
    },
    SET_PICKUP_LOCATION(state, val) {
        state.pickupLocation = val
    },
    SET_RETURN_LOCATION(state, val) {
        state.returnLocation = val
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
            })
        return reservsArray
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