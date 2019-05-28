<template lang="pug">
	div(style="color: white;")
		b-row
			b-col
			b-col(xl=7 lg=7 md=12 v-if="loading")
				center
					b-spinner(variant="light")
			b-col(xl=7 lg=7 md=12 v-else)
				div(v-if="message")
					h2 {{ message }}
				div
					p.
						Unesite potrebne informacije.
					b-form
						b-form-group(id="estateIdInputGroup" label="Nekretnina: " label-for="estateIdInput")
							b-select(id="estateIdInput" v-model="saleData.estateId" type="text" required :options="estates")
						b-form-group(id="clientIdInputGroup" label="Klijent: " label-for="clientIdInput")
							b-select(id="clientIdInput" v-model="saleData.clientId" type="text" required :options="clients")
						b-form-group(id="finalPriceInputGroup" label="Konacna cena: " label-for="finalPriceInput")
							b-form-input(id="finalPriceInput" v-model="saleData.finalPrice" type="number" required)
						b-form-group(id="agentPriceInputGroup" label="Zarada agenta: " label-for="agentPriceInput")
							b-form-input(id="agentPriceInput" v-model="saleData.agentPrice" type="number" required)
						b-button(type="submit" variant="primary" class="w-25 float-right" @click="onContinueButtonClick") Create
			b-col
</template>

<script>
export default {
	name: 'Register',
	data () {
		return {
			loading: true,
			message: null,
			saleData: {
				estateId: null,
				clientId: null,
				finalPrice: null,
				agentPrice: null,
				saleDate: null
			},
			prePost: null,
			estates: [
				{ value: null, text: 'Izaberite nekretninu' }
			],
			clients: [
				{ value: null, text: 'Izaberite klijenta' }
			]
		}
	},
	async mounted () {
		let data = await fetch(this.$SERVER_PATH + '/sale/prePost/', {
			mode: 'cors',
			headers: {
				'content-type': 'application/json'
			},
			credentials: 'include'
		})
		this.loading = false

		let json = await data.json()

		json.clients.forEach(element => {
			let text = element.client.firstName + ' ' + element.client.lastName + ' | ' + element.client.phone + ' | ' + element.client.address + ', ' + element.client.city + ' (' + element.id + ')'
			this.clients.push({ value: element.id, text })
		})

		json.realEstate.forEach(element => {
			let text = element.realEstate.address + ', ' + element.realEstate.city + ' | ' + element.realEstate.price + ' €' + ' | ' + element.realEstate.area + ' m2 (' + element.id + ')'
			this.estates.push({ value: element.id, text })
		})
	},
	methods: {
		async onContinueButtonClick () {
			this.saleData.saleDate = new Date().toISOString()
			this.saleData.finalPrice = parseInt(this.saleData.finalPrice)
			this.saleData.agentPrice = parseInt(this.saleData.agentPrice)
			console.log(JSON.stringify(this.saleData))

			this.loading = true
			let data = await fetch(`${this.$SERVER_PATH}/sale`, {
				method: 'POST',
				mode: 'cors',
				body: JSON.stringify(this.saleData),
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			})

			let json = await data.json()
			if (data.status !== 200) {
				this.message = json.message
				this.loading = false
				return
			}

			this.$router.back()
		}
	}
}
</script>
