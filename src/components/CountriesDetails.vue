<template>
<div class="container">
  <h2>{{text}} {{getId()}}</h2>
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
      </div>
  </div>
</div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'countries-details',
  data () {
    return {
      text: 'Detalle de :',
      id: null,
      name: null,
      alpha2: null,
      alpha3: null,
      iso: null,
      loading: false
    }
  },
  methods: {
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
