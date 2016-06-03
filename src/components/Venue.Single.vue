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

          var clientId = Vue.config.keys.foursquare.clientId;
          var clientSecret = Vue.config.keys.foursquare.clientSecret;
          var venueId = this.$route.params.venueId;
          var url = "https://api.foursquare.com/v2/venues/" + venueId + "?client_id=" + clientId + "&client_secret="
            + clientSecret + "&v=20160603";
          this.$http({url: url, method: 'GET'}).then(function (response) {
            this.$set('venue', response.data.response.venue);
          });
        }
      }
    }
</script>
