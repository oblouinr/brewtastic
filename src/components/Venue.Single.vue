<template>
    <div>
        <h1>{{ venue.name }}</h1>
    </div>
    <h3>Bières</h3>
    <ul>
      <li v-for="beer in beers">
        <span>{{ beer.name }} </span>
        <button>Retirer ce fût</button>
      </li>
    </ul>

    <beer-search v-show="searchToggled"></beer-search>
    <button v-on:click="toggleSearch(true)">Ajouter un fût</button>
</template>

<script>
    import Vue from 'vue';
    import BeerSearch from './Beer.Search.vue';
    export default {
      data () {
        return {
          searchToggled: false,
          venue: {},
          beers: [{name: 'Cornik'}, {name: 'Kraken'}, {name: 'Capitaine Sauvin'}]
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
        }
      }
    }
</script>
