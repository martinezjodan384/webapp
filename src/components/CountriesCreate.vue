<template>
  <div class="container">
    <form @submit.prevent="setCountry">
      <div class="row">
        <div class="col-8 offset-2">
          <label>Nombre</label>
          <input type="text" v-model="name" class="form-control">
        </div>
        <div class="col-8 offset-2">
          <label>Alpha2</label>
          <input type="text" v-model="alpha2" class="form-control">
        </div>
        <div class="col-8 offset-2">
          <label>Alpha3</label>
          <input type="text" v-model="alpha3" class="form-control">
        </div>
        <div class="col-8 offset-2">
          <label>Iso</label>
          <input type="text" v-model="iso" class="form-control">
        </div>
        <div class="col-8 offset-2">
          <br>
          <button class="btn btn-primary btn-sm">Enviar</button>
          <router-link to="/'countries'" class="btn btn-danger btn-sm">Cancelar</router-link>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
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
  methods: {
    setCountry: function () {
      const data = {
        name: this.name,
        alpha2: this.alpha2,
        alpha3: this.alpha3,
        iso_3166_2: this.iso
      }
      let url = 'https://exam.genial.gt/api/countries'
      if (this.getId() && this.getId().length > 0) {
        url = 'https://exam.genial.gt/api/countries/' + this.getId()
        axios.patchcmd(url, data)
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
