<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    // const isLogged = this.checkLogin()
    // if (!isLogged) {
    //   this.$message.error('請登入')
    //   this.$router.push({ name: 'Home' })
    // }
  },
  methods: {
    checkLogin() {
      return !!window.localStorage.getItem('token')
    }
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  letter-spacing: 0.5px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
