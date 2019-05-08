<template>
	<div>
		<b-button variant="primary" @click="hidden = !hidden" > {{ hidden ? 'Pokazi filtere' : 'Sakrij filtere' }} </b-button>
		<b-form v-if="!hidden" inline class="justify-content-center search-box">
			<b-form-group id="nameInputGroup" label="Ime:">
				<b-form-input id="nameInput" type="text" v-model="form.name" />
			</b-form-group>
			<b-form-group id="surnameInputGroup" label="Prezime:">
				<b-form-input id="surnameInput" type="text" v-model="form.surname" />
			</b-form-group>
			<b-form-group id="addressInputGroup" label="Adresa:">
				<b-form-input id="addressInput" type="text" v-model="form.address"/>
			</b-form-group>
			<b-form-group :label="'\0'">
				<b-button type="button" @click="search" variant="primary">Traži</b-button>
			</b-form-group>
			<b-form-group :label="'\0'">
				<select class="form-control" id="sort">
					<option/>
					<option @click="sortNameAscending()">Sortiraj po imenu - Rastuće</option>
					<option @click="sortNameDescending()">Sortiraj po imenu - Opadajuće</option>
					<option @click="sortSurnameAscending()">Sortiraj po prezimenu - Rastuće</option>
					<option @click="sortSurnameDescending()">Sortiraj po prezimenu - Opadajuće</option>
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
				name: null,
				surname: null,
				address: null
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
		_sortByStrings (arr, prop) {
			return arr.sort((x, y) => (x[prop] > y[prop]) ? 1 : (x[prop] < y[prop]) ? -1 : 0)
		},
		sortNameAscending () {
			if (this.shown) {
				this.$emit('result', this._sortByStrings(this.shown, 'name'))
			}
		},
		sortNameDescending () {
			if (this.shown) {
				this.$emit('result', this._sortByStrings(this.shown, 'name').reverse())
			}
		},
		sortSurnameAscending () {
			if (this.shown) {
				this.$emit('result', this._sortByStrings(this.shown, 'surname'))
			}
		},
		sortSurnameDescending () {
			if (this.shown) {
				this.$emit('result', this._sortByStrings(this.shown, 'surname').reverse())
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
