<template>
    <div>
        <h1>{{ venue.name }}</h1>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
      data () {
        return {
          venue: {}
        }
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
        }
      }
    }
</script>
