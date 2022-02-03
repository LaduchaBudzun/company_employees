<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app{

  font-family: 'Roboto-regular';
  width: 100%;
}
body {
  margin: 0px;
  height: 100%;
}
@font-face {
  font-family: 'Roboto-regular';
  src: local('Roboto-regular'), local('Roboto-regular'),
    url('~@/assets/fonts/Roboto/roboto_regular.woff2') format('woff2'),
    url('~@/assets/fonts/Roboto/roboto_regular.woff') format('woff');
  font-weight: 100;
  font-style: normal;
}

</style>
