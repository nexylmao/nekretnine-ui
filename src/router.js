import Vue from 'vue'
import Router from 'vue-router'
// import Landing from './views/Landing'
import SearchResults from './views/SearchResults'
import RealEstatePage from './views/realestate/RealEstatePage'
import AddRealEstate from './views/realestate/AddRealEstate'
import EditRealEstate from './views/realestate/EditRealEstate'
import Login from './views/Login'
import Register from './views/Register'
import RegisterAgent from './views/RegisterAgent'
import AdminAddEmail from './views/admin/AddEmail'
import SearchAgents from './views/admin/SearchAgents'
import SearchClients from './views/admin/SearchClients'
import ClientProfile from './views/admin/ClientProfile'
import ClientAdd from './views/admin/CreateClient'
import EstablishSale from './views/admin/CreateSale'
import Profile from './views/Profile'
import EditProfile from './views/EditProfile'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'landing',
			component: SearchResults
		},
		{
			path: '/realestate',
			name: 'realestate',
			component: RealEstatePage
		},
		{
			path: '/realestate/add',
			name: 'addrealestate',
			component: AddRealEstate
		},
		{
			path: '/realestate/edit',
			name: 'editrealestate',
			component: EditRealEstate
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
		},
		{
			path: '/register/agent',
			name: 'registeragent',
			component: RegisterAgent
		},
		{
			path: '/profile',
			name: 'profile',
			component: Profile
		},
		{
			path: '/profile/edit',
			name: 'editprofile',
			component: EditProfile
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
		},
		{
			path: '/searchAgents',
			name: 'adminsearchagents',
			component: SearchAgents
		},
		{
			path: '/searchClients',
			name: 'adminsearchclients',
			component: SearchClients
		},
		{
			path: '/client/profile',
			name: 'adminclientprofile',
			component: ClientProfile
		},
		{
			path: '/admin/client/add',
			name: 'adminclientadd',
			component: ClientAdd
		},
		{
			path: '/sale/establish',
			name: 'establishsale',
			component: EstablishSale
		}
	]
})
