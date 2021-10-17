import { SET_CAR_POSTS, SET_RESERVATIONS, SET_LOGGED_USER, SET_LOGGED_ADMIN } from './mutations.type'
import { db, auth } from "../plugins/firebase"
export const state = () => ({
    carPosts: [],
    user: null,
    reservations: [],
    pickupDate: '',
    returnDate: '',
    pickupLocation: '',
    returnLocation: '',
    userIsLoggedIn: false,
    adminIsLoggedIn: false,
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
    },
    [SET_LOGGED_USER](state, val) {
        state.userIsLoggedIn = val
    },
    [SET_LOGGED_ADMIN](state, val) {
        state.adminIsLoggedIn = val
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
    isUserLoggerIn() {
        return auth.currentUser != null
    },
    isAdminLoggedIn() {
        let isAdminLoggedBool = false
        if (auth.currentUser != null) {
            db.ref('Admins/')
                .on('value', (snapshot) => {
                    snapshot.forEach((childSnapshot) => {
                        if (childSnapshot.key === auth.currentUser.uid) {
                            isAdminLoggedBool = true
                        }
                    })
                })
            console.log('Admin=' + isAdminLoggedBool)
            return isAdminLoggedBool
        } else {
            return false
        }
    },
    async nuxtServerInit({ commit }) {
        let carFiles = await require.context('~/assets/content/cars/', false, /\.json$/)
        await commit(SET_CAR_POSTS, actions.getPosts(carFiles))
        await commit(SET_RESERVATIONS, actions.getReservds())

        /*let user = auth.currentUser
        console.log('nuxtServerInitUser=' + user)

        await commit(SET_LOGGED_USER, actions.isUserLoggerIn())
        console.log('nuxtServerInitAdmin=' + actions.isAdminLoggedIn())
        await commit(SET_LOGGED_ADMIN, actions.isAdminLoggedIn())*/
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