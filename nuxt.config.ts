import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import 'vee-validate'
import 'vrwebdesign-nuxt/modules/nuxt-axios'
import 'vrwebdesign-nuxt/modules/nuxt-dialog'
import 'vrwebdesign-nuxt/modules/nuxt-toast'
import 'vrwebdesign-nuxt/modules/nuxt-loader'
import 'vrwebdesign-nuxt/modules/nuxt-scroll-to'
import 'vrwebdesign-nuxt/modules/nuxt-enums'
import 'vrwebdesign-nuxt/modules/nuxt-authorization'
import './services/types/index'
import '@nuxtjs/recaptcha'
require('dotenv').config({
  path: process.env.NODE_ENV == 'development' ? '.env.development' : '.env'
})
require('events').EventEmitter.defaultMaxListeners = 50
export default {
  mode: 'spa',
  server: {
    port: process.env.PORT
  },
  axios: {
    proxy: true, // Can be also an object with default options
    prefix: '/api'
  },
  proxy: {
    '/api/': {
      target: process.env.API_URL,
      pathRewrite: {
        '^/api/': ''
      }
    }
  },
  styleResources: {
    scss: ['~assets/style/_variables.scss']
  },
  buildModules: ['@nuxt/typescript-build'],
  typescript: {
    typeCheck: {
      memoryLimit: 8192,
      workers: 4
    },
    ignoreNotFoundWarnings: true
  },
  head: {
    title: process.env.TITLE || 'پنل ادمین',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          process.env.DESCRIPTION ||
          'برای ورود به پنل ادمین ابتدا باید وارد شوید'
      }
    ]
    // link: [
    //   { rel: 'icon', type: 'image/x-icon', href: '/icon.ico' },
    //   {
    //     rel: 'stylesheet',
    //     href:
    //       'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
    //   }
    // ]
  },
  loading: { color: '#6910e2' },
  css: [
    '~/assets/style/app.styl',
    '~/assets/style/main.scss',
    'animate.css/animate.css',
    'vrwebdesign-nuxt/assets/style/main.scss'
  ],
  plugins: ['~/plugins/vuetify.ts', '~/plugins/interceptor.ts'],
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/recaptcha',
    [
      '@nuxtjs/dotenv',
      {
        filename:
          process.env.NODE_ENV == 'development' ? '.env.development' : '.env'
      }
    ],
    'vrwebdesign-nuxt/modules/nuxt-client-init',
    'vrwebdesign-nuxt/modules/nuxt-axios',
    'vrwebdesign-nuxt/modules/nuxt-validate',
    'vrwebdesign-nuxt/modules/nuxt-toast',
    'vrwebdesign-nuxt/modules/nuxt-dialog',
    'vrwebdesign-nuxt/modules/nuxt-global',
    'vrwebdesign-nuxt/modules/nuxt-data-grid',
    'vrwebdesign-nuxt/modules/nuxt-form-generator',
    'vrwebdesign-nuxt/modules/nuxt-loader',
    'vrwebdesign-nuxt/modules/nuxt-date-picker',
    'vrwebdesign-nuxt/modules/nuxt-file-upload',
    'vrwebdesign-nuxt/modules/nuxt-scroll-to',
    'vrwebdesign-nuxt/modules/nuxt-currency',
    'vrwebdesign-nuxt/modules/nuxt-enums',
    'vrwebdesign-nuxt/modules/nuxt-badge',
    'vrwebdesign-nuxt/modules/nuxt-navbar',
    'vrwebdesign-nuxt/modules/nuxt-authorization',
    'vrwebdesign-nuxt/modules/nuxt-chart'
  ],
  recaptcha: {
    hideBadge: true, // Hide badge element (v3)
    siteKey: '6LdqT7YUAAAAAGEi0OymnZ7dLJuARiF9q_2Cu-9Y', // Site key for requests
    version: 3 // Version
  },
  watch: ['services', 'enums'],
  build: {
    watch: ['services', 'enums'],
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.node = {
        fs: 'empty'
      }
    }
  }
}
