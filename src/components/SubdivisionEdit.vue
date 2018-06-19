<template>
  <div class="container">
    <br>
    <br>
    <div class="color">
      <br>
      <form @submit.prevent="setSubdivisionEdit">
        <p>
          <strong>Nombre: </strong>
          <input type="text" v-model.trim="name" class="form-control col-8 offset-2" name="name"
                 :class="{'is-invalid': $v.name.$error,
                 'is-valid': !$v.name.$invalid && $v.name.$dirty}"
                 @input="$v.name.$touch()">
          <p class="invalid-feedback">Ingrese un nombre valido</p>
        <p>
          <strong>Codigo: </strong>
          <input type="text" v-model.trim="code" class="form-control col-8 offset-2" name="code"
                 :class="{'is-invalid': $v.code.$error,
                 'is-valid': !$v.name.$invalid && $v.code.$dirty}"
                 @input="$v.code.$touch()">
        <p class="invalid-feedback">Ingrese un codigo valido</p>
        <button class="btn btn-secondary">Actualizar</button>
        <button type="button" class="btn btn-dark" @click="cancel">Cancelar</button>
      </form>
      <br>
    </div>
  </div>
</template>
<script>
import required from 'vuelidate/lib/validators/required'
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
  validations: {
    name: {
      required
    },
    code: {
      required
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
<style lang="scss">
  .color{
    background-color:#D1DBBD;
  }
</style>
