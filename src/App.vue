<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
      <router-link to="/">首页</router-link>
      <router-link to="/home" >home</router-link>
      <router-link to="/login" >login</router-link>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 1000px;
  margin: 100px auto 0;

  

}
a {
    margin-right: 200px;
  }
.router-link-exact-active {
  color: skyblue;
}
</style>
