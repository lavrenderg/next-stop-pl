import glob from 'glob'
import path from 'path'
import postcssImport from 'postcss-import'
import postcssNesting from 'postcss-nesting'
import postcssPresetEnv from 'postcss-preset-env'
import * as SITE_INFO from './assets/content/site/info.json'
import { COLOR_MODE_FALLBACK } from './utils/globals.js'

const dynamicContentPath = 'assets/content' // ? No prepending/appending backslashes here
const dynamicRoutes = getDynamicPaths({
        cars: 'cars/*.json'
    },
    dynamicContentPath
)

export default {
    // ? The env Property: https://nuxtjs.org/api/configuration-env/

    css: ['@/assets/css/custom.css'],
    env: {
        url: process.env.NODE_ENV === 'production' ?
            process.env.URL || 'http://createADotEnvFileAndSetURL' : 'http://localhost:3000',
        lang: SITE_INFO.sitelang || 'en-US'
    },
    /*
     ** Headers of the page
     */
    head: {
        title: SITE_INFO.sitename || process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: 'description',
                name: 'description',
                content: SITE_INFO.sitedescription || process.env.npm_package_description || ''
            }
        ]
    },
    generate: {
        routes: dynamicRoutes,
        fallback: true,
        subFolders: false
    },
    /*
     ** Customize the progress-bar color
     */
    components: true,
    loading: '~/components/general/Loading.vue',
    /*
     ** Global CSS
     */
    //css: ['@/assets/css/tailwind.css', '@/assets/css/main.pcss'],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        { src: '~/plugins/splide.client.js', ssr: false },
        { src: '~/plugins/firebase.js', ssr: false }
    ],

    /*
     ** Nuxt.js dev-modules
     */
    buildModules: ['@nuxtjs/color-mode', '@nuxtjs/svg', '@nuxtjs/pwa', '@nuxtjs/vuetify'],

    modules: ['@nuxtjs/axios', '@nuxtjs/auth', '@nuxtjs/firebase'],

    firebase: {
        config: {
            apiKey: "AIzaSyCn3MoNd89V4l4_D2g8mvg4JQjavbUArcA",
            authDomain: "nextstop-57593.firebaseapp.com",
            databaseURL: "https://nextstop-57593-default-rtdb.europe-west1.firebasedatabase.app",
            projectId: "nextstop-57593",
            storageBucket: "nextstop-57593.appspot.com",
            messagingSenderId: "836771449749",
            appId: "1:836771449749:web:824c1894117d17c54bc49c",
            measurementId: "G-CPVYBN7CEE"
        },
        services: {
            auth: {
                persistence: 'local',
                initialize: {
                    onAuthStateChangedAction: 'onAuthStateChangedAction',
                    subscribeManually: false
                },
                ssr: false,
            },
            database: true,
        }
    },
    /*
     ** Nuxt.js modules
     */
    markdownit: {
        injected: true
    },
    /*
     ** Build configuration
     */
    build: {
        extractCSS: true,

        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {}
    },
    /*
     ** Custom additions configuration
     */

    colorMode: {
        preference: 'system', // default value of $colorMode.preference
        fallback: COLOR_MODE_FALLBACK, // fallback value if not system preference found
        componentName: 'ColorScheme',
        cookie: {
            options: {
                sameSite: 'lax'
            }
        }
    },
    pwa: {
        icon: {
            source: 'static/icon.png',
            filename: 'icon.png'
        },
        manifest: { name: SITE_INFO.sitename || process.env.npm_package_name || '', lang: process.env.lang },
        meta: {
            name: SITE_INFO.sitename || process.env.npm_package_name || '',
            lang: process.env.lang,
            ogHost: process.env.URL,
            ogImage: '/ogp.jpg'
        }
    },
    axios: {
        baseURL: 'http://localhost:8000/api'
    },
    auth: {
        strategies: {
            local: {
                token: {
                    required: false,
                    type: false
                },
                endpoints: {
                    logout: { url: '/logout', method: 'post', credentials: 'include' }
                },
            }
        }
    }
}

/**
 * Create an array of URLs from a list of files
 * @param {*} urlFilepathTable - example below
 * {
 *   blog: 'blog/*.json',
 *   projects: 'projects/*.json'
 * }
 *
 * @return {Array} - Will return those files into urls for SSR generated .html's like
 * [
 *   /blog/2019-08-27-incidunt-laborum-e ,
 *   /projects/story-test-story-1
 * ]
 */
function getDynamicPaths(urlFilepathTable, cwdPath) {
    const dynamicPaths = [].concat(
        ...Object.keys(urlFilepathTable).map(url => {
            const filepathGlob = urlFilepathTable[url]
            return glob.sync(filepathGlob, { cwd: cwdPath }).map(filepath => {
                return `/${url}/${path.basename(filepath, '.json')}`
            })
        })
    )
    return dynamicPaths
}