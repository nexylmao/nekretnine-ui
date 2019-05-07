<template>
	<div id="app">
		<NavBar :id="id" :account="account" :agent="agent" @logout="onLoggedOut" @loginButtonClicked="showLoginModal = true"/>
		<b-row id="router-row">
			<b-col/>
			<b-col xl=8 lg=8 md=8>
				<LoginModal @modalHidden="showLoginModal = false" @loggedIn="onLoggedIn" :showModal="showLoginModal"/>
				<RouterView/>
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
	methods: {
		getAgent () {
			fetch(this.$SERVER_PATH + '/agent/me', {
				mode: 'cors',
				headers: {
					'content-type': 'application/json'
				},
				credentials: 'include'
			})
				.then(response => {
					if (response.status === 404) {
						this.getAccount()
					}
					else if (response.status === 403) {
						throw {
							message: 'Niste ulogovani'
						}
					}
					else if (response.status !== 200) {
						throw {
							message: 'Nismo mogli da uzmemo podatke o vasem nalogu'
						}
					}
					return response.json()
				})
				.then(json => {
					console.log(json)
					this.id = json.id
					this.account = json.account
					this.agent = json.agent
				})
				.catch(err => {
					console.error(err)
				})
		},
		getAccount () {
			fetch(this.$SERVER_PATH + '/me', {
				mode: 'cors',
				headers: {
					'content-type': 'application/json'
				},
				credentials: 'include'
			})
				.then(response => {
					if (response.status !== 200) {
						throw {
							message: 'Nismo mogli da uzmemo podatke o vasem nalogu'
						}
					}
					return response.json()
				})
				.then(json => {
					this.id = json.id
					this.account = json.account
					this.agent = json.agent
				})
				.catch(err => {
					console.error(err)
				})
		},
		onLoggedIn (json) {
			this.showLoginModal = false
			this.id = json.id
			this.account = json.account
			this.getAgent()
		},
		onLoggedOut () {
			this.id = null
			this.account = null
			this.agent = null
		}
	},
	mounted () {
		this.getAgent()
	}
}
</script>

<style>
#app {
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
