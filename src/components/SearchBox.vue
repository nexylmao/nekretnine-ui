<template>
	<div>
		<b-button variant="primary" @click="hidden = !hidden" > {{ hidden ? 'Pokazi filtere' : 'Sakrij filtere' }} </b-button>
		<b-form v-if="!hidden" inline class="justify-content-center search-box">
			<b-form-group id="typeInputGroup" label="Tip">
				<b-select id="typeInput" type="text" v-model="form.type">
					<option selected value=""></option>
					<optgroup label="Naselje"/>
					<option v-for="neighborhood in Object.keys($NEIGHBORHOODS)" v-bind:key="neighborhood" :value="neighborhood">{{$NEIGHBORHOODS[neighborhood]}}</option>
					<optgroup label="Tip"/>
					<option v-for="category in select" v-bind:key="category" :value="category"> {{category}} </option>
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
				<b-button type="button" v-on:click="search" variant="primary">Traži</b-button>
			</b-form-group>
			<b-form-group :label="'\0'">
				<select class="form-control" id="sort">
					<option/>
					<option v-on:click="sortPriceAscending()">Sortiraj po ceni - Rastuće</option>
					<option v-on:click="sortPriceDescending()">Sortiraj po ceni - Opadajuće</option>
					<option v-on:click="sortAreaAscending()">Sortiraj po kvadraturi - Rastuće</option>
					<option v-on:click="sortAreaDescending()">Sortiraj po kvadraturi - Opadajuće</option>
					<option v-on:click="sortCreatedAscending()">Sortiraj po datumu postavljanja - Rastuće</option>
					<option v-on:click="sortCreatedDescending()">Sortiraj po datumu postavljanja - Opadajuće</option>
				</select>
			</b-form-group>
			<b-form-group v-if="this.path" :label="'\0'">
				<select class="form-control" id="filter">
					<option v-on:click="filterUnsold()">Samo neprodate</option>
					<option v-on:click="filterSold()">Samo prodate</option>
					<option v-on:click="restart()">Sve</option>
				</select>
			</b-form-group>
		</b-form>
		<div v-if="loading" id="progress">
			<b-spinner variant="light" />
		</div>
		<b-card class="mt-3 bg-danger text-white" v-if="errorMessage">
			{{errorMessage}}
		</b-card>
	</div>
</template>

<script>
export default {
	props: ['path'],
	data () {
		return {
			hidden: true,
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
			fetched: null,
			shown: null,
			select: []
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
			fetch(this.$SERVER_PATH + (this.path || '/realEstate') + (this.queries !== '?' ? this.queries.substring(0, this.queries.length - 1) : ''), {
				mode: 'cors',
				headers: {
					'content-type': 'application/json'
				},
				credentials: 'include'
			})
				.then(response => {
					if (response.status !== 200) {
						// eslint-disable-next-line no-throw-literal
						throw {
							message: 'Nisu pronađene nikakve nekretnine po kriterijumima.'
						}
					}
					return response.json()
				})
				.then(json => {
					this.fetched = json
					this.shown = this.path ? json.filter(x => !x.sale) : json
					this.loading = false
					this.$emit('result', this.shown)
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
			options.forEach(option => {
				this.select.push(option)
			})
		},
		restart () {
			if (this.fetched) {
				this.shown = this.fetched
				this.restartSort()
				this.$emit('result', this.shown)
			}
		},
		sortPriceAscending () {
			if (this.shown) {
				this.$emit('result', this.shown.sort((x, y) => x.realEstate.price - y.realEstate.price))
			}
		},
		sortPriceDescending () {
			if (this.shown) {
				this.$emit('result', this.shown.sort((x, y) => y.realEstate.price - x.realEstate.price))
			}
		},
		sortAreaAscending () {
			if (this.shown) {
				this.$emit('result', this.shown.sort((x, y) => x.realEstate.area - y.realEstate.area))
			}
		},
		sortAreaDescending () {
			if (this.shown) {
				this.$emit('result', this.shown.sort((x, y) => y.realEstate.area - x.realEstate.area))
			}
		},
		sortCreatedAscending () {
			if (this.shown) {
				this.$emit('result', this.shown.sort((x, y) => new Date(x.realEstate.createdAt) - new Date(y.realEstate.createdAt)))
			}
		},
		sortCreatedDescending () {
			if (this.shown) {
				this.$emit('result', this.shown.sort((x, y) => new Date(y.realEstate.createdAt) - new Date(x.realEstate.createdAt)))
			}
		},
		filterUnsold () {
			if (this.fetched) {
				this.shown = this.fetched.filter(x => !x.sale)
				this.restartSort()
				this.$emit('result', this.shown)
			}
		},
		filterSold () {
			if (this.fetched) {
				this.shown = this.fetched.filter(x => !!x.sale)
				this.restartSort()
				this.$emit('result', this.shown)
			}
		},
		restartSort () {
			let options = document.getElementById('sort').options
			for (let i = 0; i < options.length; i++) {
				options[i].selected = false
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
