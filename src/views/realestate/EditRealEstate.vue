<template lang="pug">
	div(class="editRE")
		b-row
			b-col
			b-col(xl=7 lg=7 v-if="loading")
				center
					b-spinner(variant="light")
			b-col(xl=7 lg=7 v-else)
				div(v-if="errorMessage")
					h2 {{ errorMessage }}
				p.
					Ovde mozete da izmenite podatke o nekretnini.
					({{realEstate.realEstate.address + ' | ' + realEstate.realEstate.city}})
				b-form
					b-form-group(id="addressInputGroup" label="Adresa: " label-for="addressInput")
						b-form-input(id="addressInput" v-model="realEstate.realEstate.address" type="text" required)
					b-form-group(id="cityInputGroup" label="Grad: " label-for="cityInput")
						b-form-input(id="cityInput" v-model="realEstate.realEstate.city" type="text" required)
					b-form-group(id="priceInputGroup" label="Cena: " label-for="priceInput")
						b-form-input(id="priceInput" v-model="realEstate.realEstate.price" type="number" required)
					b-form-group(id="areaInputGroup" label="Povrsina: " label-for="areaInput")
						b-form-input(id="areaInput" v-model="realEstate.realEstate.area" type="number" required)
					b-form-group(id="tagsInputGroup" label="Kategorije: " label-for="tagsInput")
						b-form(@submit.prevent="enter()")
							b-form-input(id="tagsInput" v-model="category" type="text")
							b-card(class="text-black")
								b-button(v-for="category in categories" :key="category" style="margin-right: 5px; padding: 0px" @click="deleteTag(category)")
									b-badge {{ category }}
					b-form-group(id="descriptionInputGroup" label="Naselje: " label-for="descriptionInput")
						b-select(id="descriptionInput" required v-model="realEstate.realEstate.neighborhood" :options="options")
					b-button(type="submit" variant="primary" class="float-right" @click="onUpdateButtonClick") Azuriraj nekretninu
			b-col
</template>

<script>
export default {
	name: 'EditRealEstate',
	props: ['me'],
	data () {
		return {
			id: null,
			loading: false,
			errorMessage: null,
			original: null,
			realEstate: {},
			options: [],
			category: ''
		}
	},
	methods: {
		enter () {
			let newCategory = this.category.trim()
			if (newCategory === '' || this.realEstate.realEstate.categories.includes(newCategory)) {
				return
			}
			this.realEstate.realEstate.categories += newCategory + ';'
			this.category = ''
		},
		deleteTag (tag) {
			this.realEstate.realEstate.categories = this.realEstate.realEstate.categories.replace(tag + ';', '')
		},
		async onUpdateButtonClick () {
			this.loading = true
			this.errorMessage = null
			let deltas = {}
			if (this.realEstate.realEstate.address !== this.original.realEstate.address) deltas.address = this.realEstate.realEstate.address
			if (this.realEstate.realEstate.city !== this.original.realEstate.city) deltas.city = this.realEstate.realEstate.city
			if (this.realEstate.realEstate.price !== this.original.realEstate.price) deltas.price = this.realEstate.realEstate.price
			if (this.realEstate.realEstate.area !== this.original.realEstate.area) deltas.area = this.realEstate.realEstate.area
			if (this.realEstate.realEstate.categories !== this.original.realEstate.categories) deltas.categories = this.realEstate.realEstate.categories
			if (this.realEstate.realEstate.neighborhood !== this.original.realEstate.neighborhood) deltas.neighborhood = this.realEstate.realEstate.neighborhood
			if (Object.keys(deltas) < 1) {
				this.errorMessage = 'Niste napravili nikakve promene!'
				this.loading = false
				return
			}

			console.log(deltas)

			let data = await fetch(this.$SERVER_PATH + '/realEstate/edit/id/' + this.id, {
				method: 'PUT',
				body: JSON.stringify(deltas),
				mode: 'cors',
				headers: {
					'content-type': 'application/json'
				},
				credentials: 'include'
			})

			let json = await data.json()
			if (data.status !== 200) {
				console.error(json)
				this.loading = false
				return
			}

			console.log(json)
			this.loading = false
			this.$router.back()
		}
	},
	computed: {
		categories () {
			return this.realEstate.realEstate.categories.split(';').filter(x => x !== '')
		}
	},
	created () {
		this.id = this.$route.query.id
		this.errorMessage = null
	},
	async mounted () {
		this.loading = true

		let data = await fetch(this.$SERVER_PATH + '/realEstate/id/' + this.id, {
			mode: 'cors',
			headers: {
				'content-type': 'application/json'
			},
			credentials: 'include'
		})

		if (data.status !== 200) {
			this.loading = false
			console.error(await data.json())
		}

		this.realEstate = await data.json()
		this.original = JSON.parse(JSON.stringify(this.realEstate))
		Object.keys(this.$NEIGHBORHOODS).forEach(element => {
			this.options.push({
				value: element,
				text: this.$NEIGHBORHOODS[element]
			})
		})
		this.loading = false
	}
}
</script>

<style>
.editRE {
	color: white;
}
</style>
