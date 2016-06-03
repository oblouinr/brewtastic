import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App.vue'
import VenueIndex from './components/Venue.Index.vue'
import VenueSingle from './components/Venue.Single.vue'

import keys from './api-keys'

Vue.config['keys'] = keys;

Vue.use(VueResource)
Vue.use(VueRouter)

export var router = new VueRouter()

router.map({
  '/home': {
    name: 'home',
    component: VenueIndex
  },
  '/venue/:venueId': {
    name: 'venue',
    component: VenueSingle
  }
});

router.redirect({
  '*': '/home'
})

router.start(App, '#app')
