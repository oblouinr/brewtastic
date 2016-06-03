<template>
  <div>
    <h1>Brasseries</h1>
    <ul>
      <li v-for="venue in venues">
        {{ venue.name }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        venues: []
      }
    },
    methods: {
      fetchVenues: function () {
        this.$set('venues', [{name: 'Korrigane'}]);
      }
    },
    ready () {
      this.fetchVenues();
    }
  }
</script>
