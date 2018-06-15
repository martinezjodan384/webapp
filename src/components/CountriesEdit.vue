<template>
  <div>
    <form @submit.prevent="setCountryEdit">
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
        <input type="submit">
      </div>
    </form>
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
      alpha3: null
    }
  },
  methods: {
    setCountryEdit: function () {
      const data = {
        name: this.name,
        alpha2: this.alpha2,
        alpha3: this.alpha3
      }

      axios.post('https://exam.genial.gt/api/countries', data)
        .then(() => {
          this.$route.push('/countries')
        })
        .catch((error) => {
          throw error
        })
    }
  }
}
</script>
<style>

</style>
