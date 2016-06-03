<template>
  <div id="app">
    <venue-index></venue-index>
  </div>
</template>

<script>
import VenueIndex from './components/Venue.Index.vue'

export default {
  components: {
    VenueIndex
  }
}
</script>

<style lang="scss">
  $foo: yellow;

  body {
    background: $foo;
  }
  * {
    color: aqua;
  }
</style>
