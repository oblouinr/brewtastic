<template>
  <div>
    <h1>Brasseries</h1>
    <ul>
      <li v-for="venue in venues">{{ venue.name }}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        venues: [
          {
            id: 1,
            name: 'Korrigane'
          }
        ]
      }
    }
  }
</script>
