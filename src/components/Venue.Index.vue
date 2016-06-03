
<template>
  <div>
    <h1>Brasseries</h1>
    <ul>
      <li v-for="venue in venues">
        {{ venue.name }} ({{ venue.distance }} meters)
      </li>
    </ul>
  </div>
</template>

<script>

  import Vue from 'vue';
  export default {
    data () {
      return {
        venues: []
      }
    },
    methods: {
      fetchVenues: function () {

        var clientId = Vue.config.keys.foursquare.clientId;
        var clientSecret = Vue.config.keys.foursquare.clientSecret;
        var url = "https://api.foursquare.com/v2/venues/search?query=microbrasserie&ll=46.8131251,-71.2257053&client_id=" + clientId + "&client_secret="
          + clientSecret + "&v=20160603";
        this.$http({url: url, method: 'GET'}).then(function (response) {
          var venues = response.data.response.venues.map(v => {
            v.distance = v.location.distance;
          });
          this.$set('venues', response.data.response.venues);
        });
      }
    },
    ready () {
      this.fetchVenues();
    }
  }
</script>
