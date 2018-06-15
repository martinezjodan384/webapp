<template>
  <div>
    <form @submit.prevent="setCountry">
      <div>
        <label>Nombre</label>
        <input type="text" v-model="name">
      </div>
      <div>
        <label>Alpha2</label>
        <input type="text" v-model="alpha2">
      </div>
      <div>
        <label>Alpha3</label>
        <input type="text" v-model="alpha3">
      </div>
      <div>
        <label>Iso</label>
        <input type="text" v-model="iso">
      </div>
      <div>
        <input type="submit">
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
      iso: null,
      loading: false
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
      if (this.getId().length > 0) {
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
            this.$route.push('/countries')
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
    }
  },
  mounted: function () {
    this.getCountryDetails()
  }
}
</script>
