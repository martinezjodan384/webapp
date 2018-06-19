<template>
  <div class="row text-center">
    <div class="col-12">
      <h3>Agregar subdivisión</h3>
    </div>
    <div class="col-12">
      <form @submit.prevent="setSubdivision">
        <p>
        <strong>Nombre: </strong>
        <input type="text" v-model.trim="name" name="name" class="form-control col-8 offset-2"
               :class="{'is-invalid': $v.name.$error,
               'is-valid': !$v.name.$invalid && $v.name.$dirty}"
               @input="$v.name.$touch()" placeholder="Ingrese el nombre de la sub-división">
        <p class="invalid-feedback">Ingrese un nombre</p>
        <p>
        <strong>Codigo: </strong>
        <input type="text" v-model.trim="code" name="code" class="form-control col-8 offset-2"
               :class="{'is-invalid': $v.code.$error,
               'is-valid': !$v.code.$invalid && $v.code.$dirty}"
               @input="$v.code.$touch()" placeholder="Ingrese el codigo de la sub-división">
          <p class="invalid-feedback">Ingrese un codigo valido</p>
        <button class="btn btn-secondary">Agregar</button>
        <button type="button" class="btn btn-dark" @click="cancel">Cancelar</button>
      </form>
    </div>
  </div>
</template>
<script>
import required from 'vuelidate/lib/validators/required'
import axios from 'axios'
export default {
  name: 'subdivision-create',
  data: function () {
    return {
      name: null,
      code: null
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
        this.$v.$touch()
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
