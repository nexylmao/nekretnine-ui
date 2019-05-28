<template lang="pug">
	div(class="editRE")
		b-row
			b-col
			b-col(xl=7 lg=7 v-if="loading")
				center
					b-spinner(variant="light")
			b-col(xl=7 lg=7 v-else)
				p.
					Ovde mozete da izmenite podatke o nekretnini. 
					({{realEstate.realEstate.address + ' | ' + realEstate.realEstate.city}})
				b-form
					b-form-group(id="addressInputGroup" label="Adresa: " label-for="addressInput")
						b-form-input(id="addressInput" v-model="changes.address" type="text" :placeholder="realEstate.realEstate.address" required)
					b-form-group(id="cityInputGroup" label="Grad: " label-for="cityInput")
						b-form-input(id="cityInput" v-model="changes.city" type="text" :placeholder="realEstate.realEstate.city" required)
					b-form-group(id="priceInputGroup" label="Cena: " label-for="priceInput")
						b-form-input(id="priceInput" v-model="changes.price" type="number" required :placeholder="realEstate.realEstate.price")
					b-form-group(id="areaInputGroup" label="Povrsina: " label-for="areaInput")
						b-form-input(id="areaInput" v-model="changes.area" type="number" required :placeholder="realEstate.realEstate.area")
					b-form-group(id="tagsInputGroup" label="Kategorije: " label-for="tagsInput")
						b-form-input(id="tagsInput" v-model="changes.categories" type="text" required placeholder="Unesite tagove razdvojene zarezima")
					b-form-group(id="descriptionInputGroup" label="Naselje: " label-for="descriptionInput")
						b-form-select(id="descriptionInput" required)
							option(selected v-for="neighborhood in Object.keys($NEIGHBORHOODS)" @click="log(neighborhood)") {{ $NEIGHBORHOODS[neighborhood] }}
					b-button(type="submit" variant="primary" class="w-25 float-right" @click="onUpdateButtonClick") Azuriraj nekretninu
			b-col
</template>

<script>
import { setTimeout } from 'timers';
export default {
	name: 'AddRealEstate',
	props: ['me'],
	data () {
		return {
			id: null,
			loading: false,
			errorMessage: null,
			realEstate: {},
			changes: {}
		}
	},
	methods: {
		/*
		 * Ovde se salju podaci na server. Takodje
		 * ukoliko hoces mozes i da obrises one koji
		 * su ostali isti pa posalji samo izmenjene.
		 */
		log (message) {
			console.log(message)
		},
		onUpdateButtonClick () {
		}
	},
	/*
	 * Ovde ce se fetchovati trenutni podaci
	 * i ubacice se u objekat. Nakon toga bi
	 * novi podaci trebali da se posalju na
	 * server i updateuju u bazi.
	 */
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
		this.loading = false

		if (data.status !== 200) {
			console.error(await data.json())
		}

		this.realEstate = await data.json()
		this.changes.neighborhood = this.realEstate.realEstate.neighborhood
	}
}
</script>

<style>
.editRE {
	color: white;
}
</style>

