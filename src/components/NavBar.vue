<template>
	<b-navbar togglable=md type=dark variant=secondary>
		<b-navbar-brand to="/">Nekretnine</b-navbar-brand>

		<b-navbar-toggle target="nav_collapse" />

		<b-collapse is-nav id="nav_collapse">
			<b-navbar-nav class="ml-auto">
				<div v-if="!computedUserLoggedIn">
					<b-nav-item @click="onLoginButtonClick">Login</b-nav-item>
				</div>
				<div v-else>
					<b-nav-item-dropdown :text="computedText" right>
						<b-dropdown-item v-if="agent" :to="'/profile?id=' + id">Profile</b-dropdown-item>
						<b-dropdown-item class="bg-danger" v-else :to="'/register/agent?id=' + id"><div class="text-white">Prijavi se kao agent</div></b-dropdown-item>
						<b-dropdown-item @click="onLogoutButtonClick">Odloguj se</b-dropdown-item>
					</b-nav-item-dropdown>
				</div>
			</b-navbar-nav>
		</b-collapse>
	</b-navbar>
</template>

<script>
export default {
	name: 'NavBar',
	props: ['id', 'account', 'agent'],
	methods: {
		onLoginButtonClick () {
			this.$emit('loginButtonClicked')
		},
		onLogoutButtonClick () {
			fetch(this.$SERVER_PATH + '/logout', {
				method: 'POST',
				mode: 'cors',
				headers: {
					'content-type': 'application/json'
				},
				credentials: 'include'
			})
				.then(response => {
					console.log(response)
					return response.json()
				})
				.then(json => {
					this.$emit('logout')
					console.log(json)
				})
				.catch(err => {
					console.error(err)
				})
		}
	},
	computed: {
		computedUserLoggedIn: {
			get () {
				return !!this.id
			},
			set (newVal) {
				if (!newVal) {
					this.$emit('logout')
				}
			}
		},
		computedText () {
			return this.agent ? `${this.agent.firstName} ${this.agent.lastName} (${this.account.username})` : this.account.username
		}
	},
	mounted () {
		// Magija za proveru dal je korisnik ulogovan
		this.computedUserLoggedIn = window.localStorage.getItem('userLoggedIn')
		if (this.computedUserLoggedIn === null || this.computedUserLoggedIn === undefined) {
			this.computedUserLoggedIn = false
		}
	}
}
</script>
