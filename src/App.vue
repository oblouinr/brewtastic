<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
  $foo: yellow;
  body {
    background: $foo;
  }
  * {
    color: aqua;
  }
</style>