<template>
    <a v-link="{ name: 'home'}">Retourner à l'accueil</a>
    <div>
        <h1>{{ venue.name }}</h1>
        <div class="description">{{  }}</div>
    </div>
    <h3>Bières</h3>
    <ul>
      <li v-for="beer in beers">
        <span class="beer-name">{{ beer.beer.beer_name }} ({{ beer.brewery.brewery_name }})</span>
        <button v-on:click="removeBeer(beer)">Retirer ce fût</button>
      </li>
    </ul>

    <beer-search v-if="searchToggled"></beer-search>
    <button v-on:click="toggleSearch(true)" v-show="!searchToggled">Ajouter un fût</button>
    <button v-show="searchToggled" v-on:click="toggleSearch(false)">Annuler</button>
</template>

<script>
    import Vue from 'vue';
    import BeerSearch from './Beer.Search.vue';
    import lodash from 'lodash';
    export default {
      data () {
        return {
          searchToggled: false,
          venue: {},
          beers: []
        }
      },
      components: {
        'beer-search': BeerSearch
      },
      ready () {
        this.loadVenue();
      },
      methods: {
        loadVenue: function () {
          let clientId = Vue.config.keys.foursquare.clientId;
          let clientSecret = Vue.config.keys.foursquare.clientSecret;
          let venueId = this.$route.params.venueId;
          let url = "https://api.foursquare.com/v2/venues/" + venueId + "?client_id=" + clientId + "&client_secret="
            + clientSecret + "&v=20160603";

          this.$http({url: url, method: 'GET'}).then(function (response) {
            this.$set('venue', response.data.response.venue);
          });
        },
        toggleSearch: function (toggle) {
          this.$set('searchToggled', toggle);
        },
        removeBeer: function (beer) {
          let beers = this.$get('beers');
          let newBeers = lodash.filter(beers, function (b) {
            return b.beer.beer_name != beer.beer.beer_name;
          });
          this.$set('beers', newBeers)
        }
      }
    }
</script>
