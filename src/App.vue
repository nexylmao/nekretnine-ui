<template>
	<div id="app">
		<NavBar />
		<b-row id="router-row">
			<b-col/>
			<b-col xl=8 lg=8 md=8>
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

export default {
	name: 'App',
	components: {
		NavBar,
		Footer
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
