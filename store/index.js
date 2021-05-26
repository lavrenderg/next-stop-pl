import { SET_CAR_POSTS } from './mutations.type'

export const state = () => ({
    carPosts: [],
    user: null,
})

export const mutations = {
    [SET_CAR_POSTS](state, list) {
        state.carPosts = list
    },
    SET_USER(state, user) {
        state.user = user
    }
}

export const actions = {
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