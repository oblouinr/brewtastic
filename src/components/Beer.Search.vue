
<template>
  <div>
    <h1>Ajouter une bière</h1>

    <label for="beers"> Rechercher une bière</label>
    <input type="text" name="beers" v-model="query" debounce="250" >
    <ul>
      <li v-for="result in results">
        <span class="beer-name">{{ result.beer.beer_name }} ({{ result.brewery.brewery_name }})</span>
        <button v-on:click="chooseBeer(result)">Choisir</button>
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
      search: function () {
        let query = this.$get('query');
        let url = "https://api.untappd.com/v4/search/beer?client_id=" + Vue.config.keys.untappd.clientId + "&client_secret=" +
          Vue.config.keys.untappd.clientSecret;
        url = url + "&q=" + query;
        this.$http({url: url, method: 'GET'}).then(function (response) {
          this.$set('results', response.data.response.beers.items)
        });
      },
      chooseBeer: function(beer) {
        this.$parent.$data.beers.push(beer);
        this.$parent.$data.searchToggled = false;
        console.log(beer);
      }
    },
    ready () {
      this.$watch('query', function () {
        this.search()
      });
    }
  }
</script>
