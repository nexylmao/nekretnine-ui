<template>
	<b-navbar togglable=md type=dark variant=secondary>
		<b-navbar-brand>Nekretnine</b-navbar-brand>

		<b-navbar-toggle target="nav_collapse" />

		<b-collapse is-nav id="nav_collapse">
			<b-navbar-nav class="ml-auto">
				<div v-if="!userLoggedIn">
					<b-nav-item to="/login">Login</b-nav-item>
				</div>
				<div v-else>
					<b-nav-item-dropdown text="User" right>
						<b-dropdown-item>Profile</b-dropdown-item>
						<b-dropdown-item>Logout</b-dropdown-item>
					</b-nav-item-dropdown>
				</div>
			</b-navbar-nav>
		</b-collapse>
	</b-navbar>
</template>

<script>
export default {
	name: 'NavBar',
	data () {
		return {
			userLoggedIn: false
		}
	},
	mounted () {
		this.userLoggedIn = window.localStorage.getItem('userLoggedIn')
		if (this.userLoggedIn === null || this.userLoggedIn === undefined) {
			this.userLoggedIn = false
		}
	}
}
</script>
