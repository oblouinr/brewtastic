
<template>
  <div>
    <h1>Ajouter une bière</h1>

    <label for="beers"> Rechercher une bière</label>
    <input type="text" name="beers">
    <ul >

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
    }
  }
</script>
