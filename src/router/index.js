import Vue from 'vue'
import Router from 'vue-router'
import Countries from '@/components/Countries'
import CountriesCreate from '@/components/CountriesCreate'
import CountriesDetails from '@/components/CountriesDetails'
import SubdivisionEdit from '@/components/SubdivisionEdit'
import LogIn from '@/components/LogIn'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Countries
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
    },
    {
      path: '/countries-edit/:idCountry/subdivisions/:id',
      name: 'SubdivisionEdit',
      component: SubdivisionEdit
    },
    {
      path: '/login',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '*',
      component: Countries
    }
  ]
})
