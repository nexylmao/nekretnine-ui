<template>
	<div id="app">
		<NavBar @loginButtonClicked="showLoginModal = true" @loggedOut="onLoggedOut" :userLoggedIn="userLoggedIn"/>
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
			userLoggedIn: false
		}
	},
	methods: {
		/*
		 * Ovde ide magija koja se tice toga sta raditi nakon
		 * sto je korisnik ulogovan. Generalno tu ne treba
		 * nista dodavati ali ako nesto treba oko cuvanja tokena
		 * i tako toga, to se stavlja ovde.
		 */
		onLoggedIn () {
			// Iskljuci modal za login
			this.showLoginModal = false
			// Dal je user ulogovan
			this.userLoggedIn = true
			window.localStorage.setItem('userLoggedIn', true)
			this.$router.push({ name: 'landing' })
		},
		/*
		 * Ovde ide magija sta raditi kada je kliknuto dugme
		 * logout. Naci ne sta se desava nakon sto je odlogovan
		 * Nego sta se desava kad je dugme kliknuto. Ako nesto
		 * oko ovoga treba, tu se stavlja.
		 */
		onLoggedOut () {
			// Dal je user ulogovan
			this.userLoggedIn = false
			window.localStorage.setItem('userLoggedIn', false)
			this.$router.push({ name: 'landing' })
		}
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
