<template>
  <div class="container">
    <div class="row">
      <form @submit.prevent="setCountryEdit">
        <div class="col">
          <label>Nombre</label>
          <input type="text" v-model="name">
        </div>
        <div class="col">
          <label>Alpha2</label>
          <input type="text" v-model="alpha2">
        </div>
         <div class="col">
          <label>Alpha3</label>
          <input type="text" v-model="alpha3">
        </div>
        <div class="col">
          <input type="submit">
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'countries-edit',
  data: function () {
    return {
      name: null,
      alpha2: null,
      alpha3: null,
      iso: null
    }
  },
  methods: {
    setCountryEdit: function () {
      const data = {
        name: this.name,
        alpha2: this.alpha2,
        alpha3: this.alpha3,
        iso_3166_2: this.iso
      }

      axios.post('https://exam.genial.gt/api/countries', data)
        .then(() => {
          this.$route.push('/countries')
        })
        .catch((error) => {
          throw error
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
    this.validateSession()
  }
}
</script>
<style>

</style>
