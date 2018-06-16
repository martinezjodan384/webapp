<template>
  <div id="container">
      <form @submit.prevent="login()">
        <div class="form-group col size">
          <label>Ingrese Email</label>
          <input type="email" class="form-control" v-model="email" placeholder="juanjo@example.com">
        </div>
        <div class="form-group col size">
          <label>Contraseña</label>
          <input type="password" class="form-control" v-model="pass" placeholder="Contraseña">
        </div>
        <button class="btn btn-primary button">Submit</button>
        <p v-if="showAlert">{{message}}</p>
      </form>
  </div>
</template>
<script>
export default {
  name: 'login',
  data: function () {
    return {
      email: null,
      pass: null,
      showAlert: false,
      message: null
    }
  },
  methods: {
    setCookie: function (value) {
      this.$cookie.set('data', JSON.stringify(value))
    },
    getCookie: function () {
      const data = this.$cookie.get('data')
      return data
    },
    login: function () {
      if (this.email !== 'test@domain.com' && this.pass !== 'abc123') {
        this.showAlert = true
        this.message = 'Usuario o Contraseña incorrecto'
        return true
      }
      console.log('esta llegando')
      const data = {
        email: this.email,
        pass: this.pass
      }
      this.setCookie(data)
      if (this.getCookie()) {
        return this.$router.push('/countries')
      }
    },
    validateSession: function () {
      if (this.getCookie()) {
        return this.$router.push('/countries')
      }
    }
  },
  mounted: function () {
    this.validateSession()
  }
}
</script>
<style>
#container{
  margin-left: 30%;
}
.size{
    width: 50%;
  }
.button{
  margin-right:50%;
}
</style>
