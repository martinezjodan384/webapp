// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/scss/templates/templates.scss'
import '../node_modules/font-awesome/scss/font-awesome.scss'
import VueCookie from 'vue-cookie'

Vue.config.productionTip = false
Vue.use(VueCookie)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
