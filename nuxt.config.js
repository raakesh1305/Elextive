
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/electivedatabase/'
  }
} : {}

module.exports = {
  ...routerBase,
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Elextive | Elective Management System',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#000' },
  /*
  ** Global CSS
  */
  css: [
    '~/static/global.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/fireAuth',
    '~/plugins/vueModal'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
    '@nuxtjs/bulma',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    [
      '@nuxtjs/firebase',
      {
        config: {
          // For Firebase JS SDK v7.20.0 and later, measurementId is optional
                  apiKey: "AIzaSyAgxEtojcMXM9GwZtTQKnOljEriIRKhzCQ",
                  authDomain: "electivedatabase.firebaseapp.com",
                  projectId: "electivedatabase",
                  storageBucket: "electivedatabase.appspot.com",
                  messagingSenderId: "591299039820",
                  appId: "1:591299039820:web:aad0844a0683c934349ae9",
                  measurementId: "G-ESLFFBQEXQ"
        },
        services: {
          auth: true // Just as example. Can be any other service.
        }
      }
    ]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },
    analyze: true
  }
}
