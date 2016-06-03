import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App.vue'
import VenueIndex from './components/Venue.Index.vue'
import VenueSingle from './components/Venue.Single.vue'

Vue.use(VueResource)
Vue.use(VueRouter)

export var router = new VueRouter()

router.map({
  '/home': {
    component: VenueIndex
  },
  '/venue': {
    component: VenueSingle
  }
});

router.redirect({
  '*': '/home'
})

router.start(App, '#app')