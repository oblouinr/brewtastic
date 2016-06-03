<template>
  <div id="app">
    <hello></hello>
  </div>
</template>

<script>
import Hello from './components/Hello.vue'

export default {
  components: {
    Hello
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
