
<template>
  <div>
    <label for="search"> Rechercher un endroit</label>
    <input type="text" name="search" v-model="query" debounce="250" >
    <button v-on:click="clearSearch">X</button>
    <ul>
      <li v-for="venue in results">
        <a v-link="{ name: 'venue', params: { venueId: venue.id }}">{{ venue.name }} ({{ venue.distance }} mètres)</a>
      </li>
    </ul>
  </div>
</template>

<script>

  import Vue from 'vue';
  export default {
    data () {
      return {
        query: '',
        results: []
      }
    },
    methods: {
      searchVenues: function () {

        this.$set('results', [])

        let clientId = Vue.config.keys.foursquare.clientId;
        let clientSecret = Vue.config.keys.foursquare.clientSecret;
        let query = this.$get('query');
        if (query.length > 0) {
          let url = "https://api.foursquare.com/v2/venues/search?ll=46.8131251,-71.2257053&client_id="
            + clientId + "&client_secret="
            + clientSecret + "&v=20160603"
            + "&q=" + query
            + "&radius=100000";
          this.$http({url: url, method: 'GET'}).then(function (response) {
            let venues = response.data.response.venues.map(v => {
              v.distance = v.location.distance;
            });

            this.$set('results', response.data.response.venues);
          });
        }
      },
      clearSearch: function () {
        this.$set('query', '');
        this.$set('results', []);
      }
    },
    ready () {
      this.$watch('query', this.searchVenues);
    }
  }
</script>
