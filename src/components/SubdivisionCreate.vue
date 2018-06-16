<template>
  <div class="row text-center">
    <div class="col-12">
      <h3>Agregar subdivisión</h3>
    </div>
    <div class="col-12">
      <form @submit.prevent="setSubdivision">
        <p>
        <strong>Nombre: </strong>
        <input type="text" v-model="name">
        </p>
        <p>
        <strong>Codigo: </strong>
        <input type="text" v-model="code">
        </p>
        <button class="btn btn-primary">Agregar</button>
        <button type="button" class="btn btn-success" @click="cancel">Cancelar</button>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'subdivision-create',
  data: function () {
    return {
      name: null,
      code: null
    }
  },
  methods: {
    cancel: function () {
      const showForm = false
      this.$emit('cancel', showForm)
    },
    create: function () {
      const showForm = false
      this.$emit('create', showForm)
    },
    setSubdivision: function () {
      if (!this.name) {
        return false
      } else if ((!this.name) && this.name.length === 0) {
        return false
      }
      const data = {
        name: this.name,
        code: this.code
      }
      let url = 'https://exam.genial.gt/api/countries/' + this.getId() + '/subdivisions'
      axios.post(url, data)
        .then(() => {
          this.create()
        })
        .catch((error) => {
          throw error
        })
    },
    getId: function () {
      const id = this.$route.params.id
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
    this.validateSession()
  }
}
</script>
