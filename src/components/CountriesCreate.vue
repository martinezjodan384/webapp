<template>
  <div class="container">
    <br>
    <br>
    <form @submit.prevent="setCountry" class="color">
      <br>
      <div class="row">
        <div class="col-8 offset-2">
          <label>Nombre</label>
          <input type="text" v-model.trim="name" class="form-control" name="name"
                 :class="{'is-invalid': $v.name.$error,
                 'is-valid': !$v.name.$invalid && $v.name.$dirty}"
                 @input="$v.name.$touch()" placeholder="Ingrese el nombre de la ciudad">
          <p class="invalid-feedback">Ingrese un nombre</p>
        </div>
        <div class="col-8 offset-2">
          <label>Alpha2</label>
          <input type="text" v-model.trim="alpha2" class="form-control" name="alpha2"
                 :class="{'is-invalid': $v.alpha2.$error,
                 'is-valid': !$v.alpha2.$invalid && $v.alpha2.$dirty}"
                 @input="$v.alpha2.$touch()" placeholder="Ingrese un alpha de 2 digitos">
          <p class="invalid-feedback">Ingrese un alpha de dos digitos</p>
        </div>
        <div class="col-8 offset-2">
          <label>Alpha3</label>
          <input type="text" v-model.trim="alpha3" class="form-control" name="alpha3"
                 :class="{'is-invalid': $v.alpha3.$error,
                 'is-valid': !$v.alpha3.$invalid && $v.alpha3.$dirty}"
                 @input="$v.alpha3.$touch()" placeholder="Ingrese un alpha de 3 digitos">
          <p class="invalid-feedback">Ingrese un alpha de tres digitos</p>
        </div>
        <div class="col-8 offset-2">
          <label>Iso</label>
          <input type="text" v-model.trim="iso" class="form-control" name="url"
                 :class="{'is-invalid': $v.url.$error,
                 'is-valid': !$v.url.$invalid && $v.url.$dirty}"
                 @input="$v.url.$touch()" placeholder="Ingrese una url">
          <p class="invalid-feedback">Ingrese un url valido</p>
        </div>
        <div class="col-8 offset-2">
          <br>
          <button class="btn btn-secondary">Agregar</button>
          <router-link to="/'countries'" class="btn btn-dark">Cancelar</router-link>
          <br>
          <br>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import required from 'vuelidate/lib/validators/required'
import url from 'vuelidate/lib/validators/url'
import axios from 'axios'
export default {
  name: 'countries-create',
  data: function () {
    return {
      name: null,
      alpha2: null,
      alpha3: null,
      iso: null
    }
  },
  validations: {
    name: {
      required
    },
    alpha2: {
      required
    },
    alpha3: {
      required
    },
    url: {
      url,
      required
    }
  },
  methods: {
    setCountry: function () {
      if (!this.name && !this.alpha2) {
        this.$v.$touch()
      }
      if (this.name && this.name.length > 0 && this.alpha2 && this.alpha2.length > 0) {
        this.name = null
        this.alpha2 = null
        this.$v.$touch()
      }
      const data = {
        name: this.name,
        alpha2: this.alpha2,
        alpha3: this.alpha3,
        iso_3166_2: this.iso
      }
      let url = 'https://exam.genial.gt/api/countries'
      if (this.getId()) {
        url = 'https://exam.genial.gt/api/countries/' + this.getId()
        axios.patch(url, data)
          .then(() => {
          })
          .catch((error) => {
            throw error
          })
      } else {
        axios.post(url, data)
          .then(() => {
            this.$router.push({ path: '/countries' })
          })
          .catch((error) => {
            throw error
          })
      }
    },
    getId: function () {
      const id = this.$route.params.id
      console.log(id)
      return id
    },
    getCountryDetails: function () {
      if (!this.getId()) return 'no existe id'
      let url = 'https://exam.genial.gt/api/countries/' + this.getId()
      axios.get(url)
        .then(response => {
          const data = response.data.data
          this.name = data.name || null
          this.alpha2 = data.alpha2 || null
          this.alpha3 = data.alpha3 || null
          this.iso = data['iso_3166_2'] || null
          this.loading = true
        })
    },
    getCookie: function () {
      return this.$cookie.get('data')
    },
    validateSession: function () {
      if (!this.getCookie()) {
        return this.$router.push('/login')
      }
    }
  },
  mounted: function () {
    this.getCountryDetails()
    this.validateSession()
  }
}
</script>
<style lang="scss">
  .color {
    background-color: #D1DBBD;
  }
</style>
