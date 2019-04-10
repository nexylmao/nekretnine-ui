import Vue from 'vue'
import Router from 'vue-router'
import Landing from './views/Landing'
import SearchResults from './views/SearchResults'
import RealEstatePage from './views/RealEstatePage'
import Login from './views/Login'
import Register from './views/Register'
import AdminAddEmail from './views/admin/AddEmail'

Vue.use(Router)

// eslint-disable-next-line no-unused-vars
const registerProps = route => {
	return {
		registerEmail: 'simic.dusan@jjzmaj.edu.rs'
	}
}

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'landing',
			component: Landing
		},
		{
			path: '/search',
			name: 'search',
			component: SearchResults
		},
		{
			path: '/realestate',
			name: 'realestate',
			component: RealEstatePage
		},
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/register',
			name: 'register',
			component: Register
			// props: registerProps
		},
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
		},
		{
			path: '/admin/addemail',
			name: 'adminaddemail',
			component: AdminAddEmail
		}
	]
})
