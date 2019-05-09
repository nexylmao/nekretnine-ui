<template lang="pug">
	div
		b-row
			b-col
			b-col(xl=7 lg=7 md=12)
				div
					p.
						Please enter clients info.
					b-form
						b-form-group(id="estateIdInputGroup" label="Estate id:" label-for="estateIdInput")
							b-form-input(id="estateIdInput" v-model="saleData.estateId" type="text" required)
						b-form-group(id="clientIdInputGroup" label="Client id:" label-for="clientIdInput")
							b-form-input(id="clientIdInput" v-model="saleData.clientId" type="text" required)
						b-form-group(id="finalPriceInputGroup" label="Final price:" label-for="finalPriceInput")
							b-form-input(id="finalPriceInput" v-model="saleData.finalPrice" type="number" required)
						b-form-group(id="agentPriceInputGroup" label="Agents cut:" label-for="agentPriceInput")
							b-form-input(id="agentPriceInput" v-model="saleData.agentPrice" type="number" required)
						b-button(type="submit" variant="primary" class="w-25 float-right" @click="onContinueButtonClick") Create
			b-col
</template>

<script>
export default {
	name: 'Register',
	props: {
		registerEmail: {
			type: String,
			required: true
		}
	},
	data () {
		return {
			saleData: {
				estateId: null,
				clientId: null,
				finalPrice: null,
				agentPrice: null,
				saleDate: null
			}
		}
	},
	methods: {
		onContinueButtonClick () {
			this.saleData.saleDate = new Date().toISOString()
			fetch(`${this.$SERVER_PATH}/client`, {
				method: 'POST',
				mode: 'cors',
				body: JSON.stringify(this.saleData),
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			})
		}
	}
}
</script>
