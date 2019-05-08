import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
	faUser,
	faPhone,
	faEnvelope
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.min.css'

library.add(
	faUser,
	faPhone,
	faEnvelope
)

Vue.use(BootstrapVue)
Vue.component('FontAwesomeIcon', FontAwesomeIcon)

Vue.prototype.$SERVER_PATH = 'https://nekretnine-server.herokuapp.com'
Vue.prototype.$DEFAULT_PROFILE = 'https://t3.ftcdn.net/jpg/00/64/67/52/240_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg'
Vue.prototype.$DEFAULT_REALESTATE = 'https://png.pngtree.com/png-vector/20190121/ourlarge/pngtree-vector-house-icon-png-image_332900.jpg'
Vue.prototype.$DEFAULT_REALESTATE_PHOTOS = [
	'http://placekitten.com/1024/768',
	'http://placebear.com/1024/768',
	'http://placebacon.com/1024/768'
]
Vue.prototype.$ROLES = {
	1: 'admin',
	0: 'user'
}
Vue.prototype.$NEIGHBORHOODS = {
	'Suburbs': 'Predgrađe',
	'Center': 'Centar',
	'Campus': 'Univerzitetsko naselje',
	'Apartment Complex': 'Stambeni kompleks',
	'Village': 'Selo',
	'Farm': 'Farma',
	'Mountain Side': 'Planinsko naselje',
	'Beach': 'Plaža',
	'Old Town': 'Stari grad',
	'Downtown': 'Centar grada',
	'Ethnic': 'Etno naselje',
	'Resort': 'Turisticko naselje',
	'Gated Community': 'Zajednica',
	'Industrial': 'Industrijsko naselje'
}

Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
