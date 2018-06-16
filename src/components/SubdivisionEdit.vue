<template>
  <div>
    <form @submit.prevent="setSubdivisionEdit">
      <p>
        <strong>Nombre: </strong>
        <input type="text" v-model="name">
      </p>
      <p>
        <strong>Codigo: </strong>
        <input type="text" v-model="code">
      </p>
      <button class="btn btn-primary">Actualizar</button>
      <button type="button" class="btn btn-success" @click="cancel">Cancelar</button>
    </form>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'subdivision-edit',
  data: function () {
    return {
      name: null,
      code: null,
      url: 'https://exam.genial.gt/api/countries/'
    }
  },
  methods: {
    getId: function () {
      const id = this.$route.params.id
      return id
    },
    cancel: function () {
      const id = this.getCountryId()
      this.$router.push({name: 'CountriesDetails', params: {id: id}})
    },
    setSubdivisionEdit: function () {
      const data = {
        name: this.name,
        code: this.code
      }
      let url = this.url + this.getCountryId() + '/subdivisions/' + this.getId()
      axios.patch(url, data)
        .then(() => {
          const id = this.getCountryId()
          this.$router.push({name: 'CountriesDetails', params: {id: id}})
        })
        .catch((error) => {
          throw error
        })
    },
    getSubDivision: function () {
      let url = this.url + this.getCountryId() + '/subdivisions/' + this.getId()
      axios.get(url)
        .then(response => {
          const data = response.data.data || null
          this.name = data.name
          this.code = data.code
        })
    },
    getCountryId: function () {
      const id = this.$route.params.idCountry
      return id
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
    this.getSubDivision()
    this.validateSession()
  }
}
</script>
<style lang="scss"></style>
