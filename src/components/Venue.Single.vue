<template>
    <a v-link="{ name: 'home'}">Retourner à l'accueil</a>
    <div>
      <h1 class="venue-title">{{ venue.name }}</h1>
      <div class="category">{{venue.categories[0].name}}</div>
      <a href="http://maps.google.ca" target="_blank" class="address">
        {{venue.location.address}}, {{venue.location.city}}
      </a>
    </div>
    <button class="button" v-on:click="toggleSearch(true)" v-show="!searchToggled">Ajouter un fût</button>
    <button class="button" v-show="searchToggled" v-on:click="toggleSearch(false)">Annuler</button>
    <beer-search v-if="searchToggled"></beer-search>
    <h3>Bières</h3>
    <ul class="brew-list">
      <li class="brew-item" v-for="beer in beers">
        <img src="{{ beer.beer.beer_label }}" alt="">
        <span class="brew-name">{{ beer.beer.beer_name }} ({{ beer.brewery.brewery_name }})</span><br>
        <span class="brew-info">ABV: {{ beer.beer.beer_abv }}, IBU: {{ beer.beer.beer_ibu }}</span>
        <p class="description">
          {{ beer.beer.beer_description }}
        </p>
        <button class="button" v-on:click="removeBeer(beer)">Retirer ce fût</button>
      </li>
    </ul>
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

<style lang="scss">
  @import "./../stylesheets/constants/_colors.scss";
  @import "./../stylesheets/constants/_typography.scss";
  @import "./../stylesheets/constants/_animations.scss";

  .venue-title {
    margin-bottom: 0;
  }
  .address {
    display: inline-block;
    margin-bottom: 15px;
  }
  .brew-item {
    padding: 1em 0;
    border-bottom: 1px solid rgba(53, 53, 54, 0.1);
    img {
      float: left;
      margin-right: 20px;
    }
    &:first-child {
      padding-top: 0;
    }
  }
  .brew-name {
    font-size: 1.5em;
    font-weight: 400;
  }
  .brew-info {
    display: block;
    font-size: 0.875em;
    font-weight: 900;
    font-style: italic;
    color: #0c2c7c;
  }
  .brew-list {
    list-style: none;
    padding: 0;
  }
  .button {
    font-family: $avenir;
    cursor: pointer;
    display: inline-block;
    border-radius: 5px;
    border: none;
    background: linear-gradient(135deg, #325ca2 0%, #2158b4 100%);
    color: #fff;
    font-size: 16px;
    padding: 10px;
    &:hover {
      background: #0c2c7c;
    }
  }
</style>