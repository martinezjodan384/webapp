<template>
  <div class="container">
    <br>
    <br>
    <div class="color">
      <h2>{{text}} {{name}}</h2>
        <div v-if="!loading">
          <i class="fa fa-spinner fa-spin fa-5x fa-fw"></i>
          <span class="sr-only">Loading...</span>
        </div>
        <div class="row" v-if="loading">
          <div class="col align-self-center">
            <p>
              <strong>Nombre:</strong> {{name}}
            </p>
            <p>
              <strong>Alpha2:</strong> {{alpha2}}
            </p>
            <p>
              <strong>Alpha3:</strong> {{alpha3}}
            </p>
            <p>
              <strong>Iso:</strong> {{iso}}
            </p>
            <router-link to="/countries" class="btn btn-dark">Regresar</router-link>
          </div>
      </div>
      <hr/>
      <button type="button" class="btn btn-secondary" @click="openForm()">Agregar subdivision</button>
      <FormSubdivision v-if="showForm" @cancel="closeForm" @create="createSubdivision"/>
      <br/>
      <br/>
      <table class="container">
        <thead class="row">
          <th class="col-4">Nombre</th>
          <th class="col-4">Codigo</th>
          <th class="col-4">Accion</th>
        </thead>
        <tbody v-for="(subdivision, key) in subdivisions" :key="key">
          <tr class="row">
            <td class="col-4">{{subdivision.name}}</td>
            <td class="col-4">{{subdivision.code}}</td>
            <td class="col-4">
              <button type="button" class="btn btn-danger btn-sm" @click="openModal(subdivision.id)"><i class="fa fa-ban"></i></button>
              <button type="button" @click="openEdit(subdivision.id)" class="btn btn-dark btn-sm"><i class="fa fa-pencil"></i></button>
              <br>
              <br>
            </td>
          </tr>
          <tr v-if="subdivision.id === editId">
            <td>
              <label>Nombre: </label>
              <input type="text" class="form-control">
            </td>
            <td>
              <label>Codigo: </label>
              <input type="text" class="form-control">
            </td>
            <td>
              <button type="button" class="btn btn-dark">Cancelar</button>
              <button type="button" class="btn btn-secondary">Agregar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <br>
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
              Esta seguro que deseea eliminar esta sub-división
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-dark" @click="closeModal">Cancelar</button>
              <button type="button" class="btn btn-secondary" @click="deleteItem()">Aceptar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br>
  </div>
</template>
<script>
import axios from 'axios'
import FormSubdivision from '@/components/SubdivisionCreate'
export default {
  name: 'countries-details',
  components: {
    FormSubdivision
  },
  data () {
    return {
      text: 'Detalle de :',
      id: null,
      name: null,
      alpha2: null,
      alpha3: null,
      iso: null,
      loading: false,
      subdivisions: [],
      url: 'https://exam.genial.gt/api/countries/',
      showForm: false,
      showModal: false,
      subdivisionId: null,
      showEdit: false,
      editId: null
    }
  },
  methods: {
    getId: function () {
      const id = this.$route.params.id
      return id
    },
    getCountryDetails: function () {
      let url = this.url + this.getId()
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
    getSubDivisionDetails: function () {
      let url = this.url + this.getId() + '/subdivisions'
      axios.get(url)
        .then(response => {
          const data = response.data.data || null
          this.subdivisions = data || null
        })
    },
    openForm: function () {
      if (!this.showForm) this.showForm = true
    },
    createSubdivision: function (value) {
      this.showForm = value
      this.getSubDivisionDetails()
    },
    closeForm: function (value) {
      this.showForm = value
    },
    openModal: function (id) {
      this.subdivisionId = id
      if (!this.showModal) {
        this.showModal = true
      }
    },
    deleteItem: function () {
      let url = this.url + this.getId() + '/subdivisions/' + this.subdivisionId
      axios.delete(url)
        .then(() => {
          this.getSubDivisionDetails()
        })
        .catch(error => {
          throw error
        })
      this.showModal = false
      this.subdivisionId = null
    },
    closeModal: function () {
      this.subdivisionId = null
      this.showModal = false
    },
    openEdit: function (id) {
      this.$router.push({name: 'SubdivisionEdit', params: {idCountry: this.getId(), id: id}})
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
    this.getSubDivisionDetails()
    this.validateSession()
  }
}

</script>
<style lang="scss">
  .enable-modal{
    display: block!important;
  }
  .disable-modal {
    display: none !important;
  }
  .color {
    background-color: #D1DBBD;
  }
</style>
