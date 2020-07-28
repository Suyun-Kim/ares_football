// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import {store} from './store/store'
import moment from 'moment'

Vue.config.productionTip = false
Vue.prototype.moment = moment
axios.defaults.baseURL = 'http://localhost:8090'
axios.defaults.headers.post['Content-Type'] = 'application/json'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>'
})
