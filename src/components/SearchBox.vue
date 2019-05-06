<template>
	<div>
		<b-form inline class="justify-content-center search-box">
			<b-form-group id="typeInputGroup" label="Tip">
				<b-select id="typeInput" type="text" v-model="form.type">
					<option selected value=""></option>
					<optgroup label="Naselje"/>
					<option v-for="neighborhood in Object.keys($NEIGHBORHOODS)" v-bind:key="neighborhood" :value="neighborhood">{{$NEIGHBORHOODS[neighborhood]}}</option>
					<optgroup label="Tip"/>
				</b-select>
			</b-form-group>
			<b-form-group id="locationInputGroup" label="Lokacija">
				<b-form-input id="locationInput" type="text" v-model="form.location"></b-form-input>
			</b-form-group>
			<b-form-group id="priceInputGroup" label="Cena">
				<b-form-input id="priceMinInput" type="number" placeholder="Od" v-model="form.priceMin"></b-form-input>
				<b-form-input id="priceMaxInput" type="number" placeholder="Do" v-model="form.priceMax"></b-form-input>
			</b-form-group>
			<b-form-group id="priceInputGroup" label="Kvadratura">
				<b-form-input id="priceMinInput" type="number" placeholder="Od" v-model="form.areaMin"></b-form-input>
				<b-form-input id="priceMaxInput" type="number" placeholder="Do" v-model="form.areaMax"></b-form-input>
			</b-form-group>
			<b-form-group :label="'\0'">
				<b-button type="button" v-on:click="search" variant="light">Traži</b-button>
			</b-form-group>
			<b-form-group :label="'\0'">
				<b-select>
					<!-- <option v-on:click="restartSort()"></option> -->
					<option v-on:click="sortPriceAscending()">Sortiraj po ceni - Rastuće</option>
					<option v-on:click="sortPriceDescending()">Sortiraj po ceni - Opadajuće</option>
					<option v-on:click="sortAreaAscending()">Sortiraj po kvadraturi - Rastuće</option>
					<option v-on:click="sortAreaDescending()">Sortiraj po kvadraturi - Opadajuće</option>
				</b-select>
			</b-form-group>
		</b-form>
		<div v-if="loading" id="progress">
			<b-spinner variant="light" />
		</div>
		<b-card class="mt-3 bg-danger" v-if="errorMessage">
			{{errorMessage}}
		</b-card>
	</div>
</template>

<script>
export default {
	data () {
		return {
			form: {
				location: null,
				type: null,
				priceMin: null,
				priceMax: null,
				areaMin: null,
				areaMax: null
			},
			queries: null,
			loading: false,
			errorMessage: null,
			categories: null,
			estate: null
		}
	},
	methods: {
		getQuery () {
			this.queries = '?'
			Object.keys(this.form).forEach(key => {
				if (this.form[key] !== null) {
					this.queries += `${key}=${this.form[key]}&`
				}
			})
		},
		fetch () {
			this.loading = true
			this.errorMessage = ''
			this.$emit('result', [])
			this.getQuery()
			fetch(this.$SERVER_PATH + '/realEstate' + (this.queries !== '?' ? this.queries.substring(0, this.queries.length - 1) : ''), {
				mode: 'cors',
				headers: {
					'content-type': 'application/json'
				},
				credentials: 'include'
			})
				.then(response => {
					if (response.status !== 200) {
						throw {
							message: 'Nisu pronađene nikakve nekretnine po kriterijumima.'
						}
					}
					return response.json()
				})
				.then(json => {
					this.estate = json
					this.loading = false
					this.$emit('result', json)
					if (!this.categories) {
						this.categories = []
						json.forEach(element => {
							let n = element.realEstate.categories.split(';')
							n.forEach(category => {
								if (!this.categories.includes(category) && category !== '') {
									this.categories.push(category)
								}
							})
						})
						this.categories.sort()
						this.addTypeOptions(this.categories)
					}
				})
				.catch(err => {
					console.error(err)
					this.loading = false
					this.errorMessage = err.message
				})
		},
		search () {
			this.fetch()
		},
		addTypeOptions (options) {
			let select = document.getElementById('typeInput')
			options.forEach(option => {
				let newOption = document.createElement('option')
				newOption.value = option
				newOption.text = option
				select.add(newOption)
			})
		},
		restartSort () {
			if (this.estate) {
				this.$emit('result', this.estate)
			}
		},
		sortPriceAscending () {
			if (this.estate) {
				this.$emit('result', this.estate.sort((x, y) => x.realEstate.price - y.realEstate.price))
			}
		},
		sortPriceDescending () {
			if (this.estate) {
				this.$emit('result', this.estate.sort((x, y) => y.realEstate.price - x.realEstate.price))
			}
		},
		sortAreaAscending () {
			if (this.estate) {
				this.$emit('result', this.estate.sort((x, y) => x.realEstate.area - y.realEstate.area))
			}
		},
		sortAreaDescending () {
			if (this.estate) {
				this.$emit('result', this.estate.sort((x, y) => y.realEstate.area - x.realEstate.area))
			}
		}
	},
	mounted () {
		this.fetch()
	}
}
</script>

<style>
.form-group {
	margin: 10px;
}

#progress {
	margin-top: 2rem;
}
</style>
