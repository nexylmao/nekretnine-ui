<template>
	<div>
		<b-form inline class="justify-content-center search-box">
			<b-form-group id="idInputGroup" label="Tip">
				<select id="idInput" type="text">
					<option selected value=""></option>
					<optgroup label="Tip"/>
					<optgroup label="Naselje"/>
					<option v-for="neighborhood in Object.keys($NEIGHBORHOODS)" v-bind:key="neighborhood" :value="neighborhood">{{$NEIGHBORHOODS[neighborhood]}}</option>
				</select>
			</b-form-group>
			<b-form-group id="locationInputGroup" label="Lokacija">
				<b-form-input id="locationInput" type="text"></b-form-input>
			</b-form-group>
			<b-form-group id="priceInputGroup" label="Cena">
				<b-form-input id="priceMinInput" type="number" placeholder="Od"></b-form-input>
				<b-form-input id="priceMaxInput" type="number" placeholder="Do"></b-form-input>
			</b-form-group>
			<b-button type="button" v-on:click="search" variant="light" size=lg>Traži</b-button>
		</b-form>
		<div v-if="loading" id="progress">
			<b-spinner variant="light" label="Spinning"></b-spinner>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			queries: null,
			loading: false
		}
	},
	mounted () {
		this.loading = true
		fetch(this.$SERVER_PATH + '/realEstate/', {
			mode: 'cors',
			headers: {
				'content-type': 'application/json'
			},
			credentials: 'include'
		})
			.then(response => response.json())
			.then(json => {
				this.loading = false
				this.$emit('result', json)
			})
			.catch(err => {
				alert(err)
			})
	},
	methods: {
		search () {
			this.loading = true
			console.log('Search!')
			this.loading = false
		}
	}
}
</script>

<style>
#progress {
	margin-top: 2rem;
}
</style>
