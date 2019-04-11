<template>
	<div id="app">
		<NavBar @loginButtonClicked="showLoginModal = true"/>
		<b-row id="router-row">
			<b-col/>
			<b-col xl=8 lg=8 md=8>
				<LoginModal @modalHidden="showLoginModal = false" :showModal="showLoginModal"/>
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
			showLoginModal: false
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
