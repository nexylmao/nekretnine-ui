import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
	faMapMarkerAlt,
	faEnvelope
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.min.css'

library.add(
	faMapMarkerAlt,
	faEnvelope
)

Vue.use(BootstrapVue)
Vue.component('FontAwesomeIcon', FontAwesomeIcon)

Vue.prototype.$SERVER_PATH = 'https://nekretnine-server.herokuapp.com'

Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
