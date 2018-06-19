<template>
  <div id="app">
    <nav  v-if="getCookie()" class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" to="/countries">Inicio</router-link>
      <button class="navbar-toggler" type="button" @click="openMenu()">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" :class="{'show': showMenu === true}">
        <div class="navbar-nav">
          <router-link to="/countries"  v-if="getCookie()" class="nav-item nav-link active" href="#">Paises<span class="sr-only">(current)</span></router-link>
          <a @click="logOut()" v-if="getCookie()" class="nav-item nav-link" href="#">Cerrar Sesión</a>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
      showMenu: false
    }
  },
  methods: {
    getCookie: function () {
      return this.$cookie.get('data')
    },
    validateSession: function () {
      if (!this.getCookie()) {
        return this.$router.push('/login')
      }
    },
    logOut: function () {
      this.$cookie.delete('data')
      return this.$router.push('/login')
    },
    openMenu: function () {
      if (this.showMenu) {
        this.showMenu = false
      } else {
        this.showMenu = true
      }
    }
  },
  mounted: function () {
    this.validateSession()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
  body {
    background-color:#3E606F;
  }
</style>
