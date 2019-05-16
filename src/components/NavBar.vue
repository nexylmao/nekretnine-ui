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
						<b-dropdown-item v-if="agent" @click="myProfile">Moj profil</b-dropdown-item>
						<b-dropdown-item v-else :to="'/register/agent'">Prijavi se kao agent</b-dropdown-item>
						<b-dropdown-divider />
						<!-- <b-dropdown-item>Podesavanje naloga</b-dropdown-item> -->
						<b-dropdown-item v-if="account.role" :to="'/admin/addemail'">Prijavite novi nalog</b-dropdown-item>
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
		myProfile () {
			if (this.$route.path !== '/profile') {
				this.$router.push('/profile?id=' + this.id)
			} else if (this.$route.fullPath !== ('/profile?id=' + this.id)) {
				window.location.replace('/#/profile?id=' + this.id)
				window.location.reload()
			}
		},
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
					return response.json()
				})
				.then(json => {
					this.$emit('logout')
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
			}
		},
		computedText () {
			return this.agent ? `${this.agent.firstName} ${this.agent.lastName} (${this.account.username})` : this.account.username
		}
	}
}
</script>
