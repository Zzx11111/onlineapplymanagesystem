<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {dynamicRouter} from './router/index'
export default {
  created(){
    this.$store.dispatch('setMenu')
  }
}
</script>
<style lang="less">
body,html,#app{
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}


// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
