
<template>
  <div>
    <h1>Brasseries</h1>
    <ul>
      <li v-for="venue in venues | orderBy 'distance'">
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
        venues: []
      }
    },
    methods: {
      fetchVenues: function () {

        let categoryIds = ['56aa371ce4b08b9a8d57356c', '4bf58dd8d48988d117941735', '4bf58dd8d48988d11b941735', '50327c8591d4c4b30a586d5d']
        let clientId = Vue.config.keys.foursquare.clientId;
        let clientSecret = Vue.config.keys.foursquare.clientSecret;
        let url = "https://api.foursquare.com/v2/venues/search?ll=46.8131251,-71.2257053&client_id="
          + clientId + "&client_secret="
          + clientSecret + "&v=20160603"
          + "&categoryId=" + categoryIds.join(',') ;
        this.$http({url: url, method: 'GET'}).then(function (response) {
          let venues = response.data.response.venues.map(v => {
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
