<template>
	<div>
		<h1>Pretraga agenata</h1>
		<b-form inline>
			<b-form-group class="ml-auto">
				<b-button variant="primary" @click="hidden = !hidden" > {{ hidden ? 'Pokazi filtere' : 'Sakrij filtere' }} </b-button>
			</b-form-group>
			<b-form-group class="mr-auto">
				<b-button type="button" v-if="admin" to="/admin/addemail" variant="secondary">Dodaj novi nalog</b-button>
			</b-form-group>
		</b-form>
		<b-form v-if="!hidden" inline class="justify-content-center search-box">
			<b-form-group id="nameInputGroup" label="Ime i prezime: ">
				<b-form-input id="nameInput" type="text" v-model="form.identification" />
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
			<b-spinner variant="dark" />
		</div>
		<b-card class="mt-3 bg-danger text-white" v-if="errorMessage">
			{{errorMessage}}
		</b-card>
	</div>
</template>

<script>
export default {
	props: ['path', 'admin'],
	data () {
		return {
			hidden: true,
			form: {
				identification: null
			},
			queries: null,
			loading: false,
			errorMessage: null,
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
			fetch(this.$SERVER_PATH + '/agent' + (this.queries !== '?' ? this.queries.substring(0, this.queries.length - 1) : ''), {
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
				this.$emit('result', this._sortByStrings(this.shown, 'firstName'))
			}
		},
		sortNameDescending () {
			if (this.shown) {
				this.$emit('result', this._sortByStrings(this.shown, 'firstName').reverse())
			}
		},
		sortSurnameAscending () {
			if (this.shown) {
				this.$emit('result', this._sortByStrings(this.shown, 'lastName'))
			}
		},
		sortSurnameDescending () {
			if (this.shown) {
				this.$emit('result', this._sortByStrings(this.shown, 'lastName').reverse())
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
