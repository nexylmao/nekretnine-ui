<template>
	<div id="app">
		<NavBar :id="id" :account="account" :agent="agent" @logout="onLoggedOut" @loginButtonClicked="showLoginModal = true"/>
		<b-row id="router-row">
			<b-col/>
			<b-col xl=8 lg=8 md=8>
				<LoginModal @modalHidden="showLoginModal = false" @loggedIn="onLoggedIn" :showModal="showLoginModal"/>
				<RouterView @loggedIn="onLoggedIn" @updateMe="getAgent" :me="me"/>
			</b-col>
			<b-col/>
		</b-row>
		<Footer/>
	</div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import LoginModal from '@/components/LoginModal'

export default {
	name: 'App',
	components: {
		NavBar,
		Footer,
		LoginModal
	},
	data () {
		return {
			showLoginModal: false,
			id: null,
			account: null,
			agent: null
		}
	},
	computed: {
		me () {
			return {
				id: this.id,
				account: this.account,
				agent: this.agent
			}
		}
	},
	methods: {
		async getAgent () {
			let data = await fetch(this.$SERVER_PATH + '/agent/me', {
				mode: 'cors',
				headers: {
					'content-type': 'application/json'
				},
				credentials: 'include'
			})

			let json = await data.json()
			if (data.status !== 200) {
				if (json.message === 'You are not an agent!') {
					this.getAccount()
				}
				return
			}

			this.id = json.id
			this.account = json.account
			this.agent = json.agent
			this.getAccount()
		},
		async getAccount () {
			let data = await fetch(this.$SERVER_PATH + '/me', {
				mode: 'cors',
				headers: {
					'content-type': 'application/json'
				},
				credentials: 'include'
			})

			let json = await data.json()
			if (data.status !== 200) {
				return
			}

			this.id = json.id
			this.account = json.account
		},
		onLoggedIn (json) {
			this.showLoginModal = false
			this.id = json.id
			this.account = json.account
			this.getAgent()
			window.location.reload()
		},
		onLoggedOut () {
			this.id = null
			this.account = null
			this.agent = null
			if (this.$route.path === '/') {
				window.location.reload()
			} else {
				this.$router.push('/')
			}
		}
	},
	mounted () {
		this.getAgent()
	}
}
</script>

<style>
#app {
	background-color: green;
	min-height: 100vh;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	overflow: hidden;
}
#router-row {
	margin-top: 20px;
}
</style>
