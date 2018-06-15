<template>
  <div>
    <router-link to="/countries-create">Agregar</router-link>
    <center><ul id="country-list" v-if="countries != null">
    <div v-for="(country, key) in countries" :key="key" id="country">
        {{country.name}}
        {{country.id}}
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
      showModal: false
    }
  },
  methods: {
    getCountries: function () {
      axios.get('https://exam.genial.gt/api/countries')
        .then(response => {
          this.countries = response.data.data
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
    }
  },
  mounted: function () {
    this.getCountries()
  }
}
</script>
<style lang="scss">
  #country-list{
    padding:5px;

      div{
        position: center;
        margin-top:10px;
        width:30%;
        height:90px;
        border:1px solid #ddd;
        background:#eee;
        padding:20px;
        overflow:hiden;

      }
  }
  .enable-modal{
    display: block!important;
  }
  .disable-modal{
    display: none!important;
  }
</style>
