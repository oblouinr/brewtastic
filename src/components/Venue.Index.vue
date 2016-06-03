<template>
  <div>
    <h1>Brasseries</h1>
    <ul>
      <li v-for="venue in venues">
        <a v-link="{ name: 'venue', params: { venueId: venue.id }}">{{ venue.name }}</a>
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
        this.$set('venues', [
          {
            id: 1,
            name: 'Korrigane'
          },
          {
            id: 2,
            name: 'Noctem'
          }
        ]);
      }
    },
    ready () {
      this.fetchVenues();
    }
  }
</script>
