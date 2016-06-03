
<template>
  <div>
    <h1>Ajouter une bière</h1>

    <label for="beers"> Rechercher une bière</label>
    <input type="text" name="beers" v-model="query" debounce="250" >
    <ul>
      <li v-for="result in results">
        {{ result.beer.beer_name }}
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
      search: function (query) {
        this.$set('results', [1,2,3])
      }
    },
    ready () {
      this.$watch('query', function () {
        let query = this.$get('query');
        let url = "https://api.untappd.com/v4/search/beer?client_id=" + Vue.config.keys.untappd.clientId + "&client_secret=" +
          Vue.config.keys.untappd.clientSecret;
        url = url + "&q=" + query;
        this.$http({url: url, method: 'GET'}).then(function (response) {
          this.$set('results', response.data.response.beers.items)
        });
      });
    }
  }
</script>
