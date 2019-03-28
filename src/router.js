import Vue from 'vue'
import Router from 'vue-router'
import Landing from './views/Landing'
import SearchResults from './views/SearchResults'
import RealEstatePage from './views/RealEstatePage'

Vue.use(Router)

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
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
		}
	]
})
