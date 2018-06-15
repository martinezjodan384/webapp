import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Countries from '@/components/Countries'
import CountriesCreate from '@/components/CountriesCreate'
import CountriesDetails from '@/components/CountriesDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/countries',
      name: 'Countries',
      component: Countries
    },
    {
      path: '/countries-create',
      name: 'CountriesCreate',
      component: CountriesCreate
    },
    {
      path: '/countries-edit/:id',
      name: 'CountriesEdit',
      component: CountriesCreate
    },
    {
      path: '/countries-details/:id',
      name: 'CountriesDetails',
      component: CountriesDetails
    }
  ]
})
