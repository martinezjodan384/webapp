<template>
  <div>
    <div class="col-8 offset-2">
    <img src="./../assets/scss/planeta.png" class="card-img-top size">
    </div>
    <div v-if="!loading">
      <i class="fa fa-spinner fa-spin fa-5x fa-fw"></i>
      <span class="sr-only">Loading...</span>
    </div>
    <br/>
    <router-link to="/countries-create" class="btn btn-success" id="color">Agregar</router-link>
    <center><ul id="country-list" v-if="countries != null">
    <div v-for="(country, key) in countries" :key="key" id="country">
        <h4>{{country.name}}</h4>
        <p><router-link :to="{name: 'CountriesDetails', params: {id: country.id}}" class="btn btn-secondary">Ver</router-link> |
          <router-link :to="{name: 'CountriesEdit', params: {id: country.id}}" class="btn btn-dark">Editar</router-link> |
          <a @click="countryDelete(country.id)" class="btn btn-light">Eliminar</a>
        </p>
      </div>
    </ul>
    <span v-else>Cargando ciudades...</span>
    </center>
    <div class="modal fade show" :class="{'enable-modal': showModal === true, 'disable-modal': showModal === false}">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Eliminar</h5>
            <button type="button" class="close" @click="closeModal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Esta seguro que deseea eliminar este país
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="deleteItem()">Aceptar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'countries',
  data: function () {
    return {
      countries: [],
      countryId: null,
      showModal: false,
      loading: false
    }
  },
  methods: {
    getCountries: function () {
      axios.get('https://exam.genial.gt/api/countries')
        .then(response => {
          this.countries = response.data.data
          this.loading = true
        })
        .catch(error => {
          throw error
        })
    },
    countryDelete: function (id) {
      this.countryId = id
      if (!this.showModal) {
        this.showModal = true
      }
    },
    deleteItem: function () {
      axios.delete('https://exam.genial.gt/api/countries/' + this.countryId)
        .then(response => {
          this.getCountries()
        })
        .catch(error => {
          throw error
        })
      this.showModal = false
      this.countryId = null
    },
    closeModal: function () {
      this.showModal = false
      this.countryId = null
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
    this.getCountries()
    this.validateSession()
  }
}
</script>
<style lang="scss">
  #country-list{
      div{
        position: center;
        margin-top:10px;
        width:75%;
        height:10%;
        border:1px solid #D1DBBD;
        background:#D1DBBD;
        overflow:hiden;
      }
  }
  .enable-modal{
    display: block!important;
  }
  .disable-modal{
    display: none!important;
  }
  #color {
    background-color:#91AA9D;
    border:#91AA9D;
  }
  .size {
    width: 50%;
  }
</style>
