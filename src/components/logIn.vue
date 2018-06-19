<template>
  <div id="container">
      <form @submit.prevent="login()">
        <div class="form-group col size">
          <label>Ingrese Email</label>
          <input type="email" class="form-control" v-model.trim="email" placeholder="juanjo@example.com" name="email"
                 :class="{'is-invalid': $v.email.$error || !$v.email.email,
                 'is-valid': !$v.email.$invalid && $v.email.$dirty}"
                 @input="$v.email.$touch()">
          <p class="invalid-feedback">Ingrese un Email</p>
        </div>
        <div class="form-group col size">
          <label>Contraseña</label>
          <input type="password" class="form-control" v-model="pass" placeholder="Contraseña" name="pass"
                 :class="{'is-invalid': $v.pass.$error, 'is-valid': !$v.pass.$invalid && $v.pass.$dirty}"
                 @input="$v.pass.$touch()">
          <p class="invalid-feedback">Ingrese una conraseña</p>
        </div>
        <button class="btn btn-primary button">Submit</button>
        <p v-if="showAlert">{{message}}</p>
      </form>
  </div>
</template>
<script>
import required from 'vuelidate/lib/validators/required'
import email from 'vuelidate/lib/validators/email'
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
  validations: {
    email: {
      email,
      required
    },
    pass: {
      required
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
