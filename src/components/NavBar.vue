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
					<b-nav-item-dropdown text="User" right>
						<b-dropdown-item to="/profile">Profile</b-dropdown-item>
						<b-dropdown-item @click="onLogoutButtonClick">Logout</b-dropdown-item>
					</b-nav-item-dropdown>
				</div>
			</b-navbar-nav>
		</b-collapse>
	</b-navbar>
</template>

<script>
export default {
	name: 'NavBar',
	props: {
		userLoggedIn: {
			type: Boolean,
			required: true
		}
	},
	methods: {
		onLoginButtonClick () {
			this.$emit('loginButtonClicked')
		},
		onLogoutButtonClick () {
			this.computedUserLoggedIn = false
			window.localStorage.setItem('userLoggedIn', false)
		}
	},
	computed: {
		/* Ovo ovde je computed varijabla sa geterom
		 * i seterom. Generalno computed su samo geteri
		 * ali zato sto se i setuje (koristim za emitter)
		 * onda mora imati i seter. Ovde ne bi trebalo
		 * nista da se dodaje ako ne mora.
		 */
		computedUserLoggedIn: {
			get () {
				return this.userLoggedIn
			},
			set (newVal) {
				if (!newVal) {
					this.$emit('loggedOut')
				}
			}
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
