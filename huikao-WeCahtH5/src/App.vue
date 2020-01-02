<template>
  <div id="app">
    <div id="nav">
      welcome to vue
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
    console.log('process.env.VUE_APP_ERUDA:', process.env.VUE_APP_ERUDA)
    console.log('this.api', this.api)
  },
  methods: {

  },
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  font-size: 1rem;
}
</style>
