<template lang="pug">
	div
		b-row
			b-col
			b-col(xl=7 lg=7 md=12)
				div
					p.
						Please enter clients info.
					b-form
						b-form-group(id="firstNameInputGroup" label="First name:" label-for="firstNameInput")
							b-form-input(id="firstNameInput" v-model="client.firstName" type="text" required)
						b-form-group(id="lastNameInputGroup" label="Last name:" label-for="lastNameInput")
							b-form-input(id="lastNameInput" v-model="client.lastName" type="text" required)
						b-form-group(id="addressInputGroup" label="Address:" label-for="addressInput")
							b-form-input(id="addressInput" v-model="client.address" type="text" required)
						b-form-group(id="cityInputGroup" label="City:" label-for="cityInput")
							b-form-input(id="cityInput" v-model="client.city" type="text" required)
						b-form-group(id="phoneInputGroup" label="Phone:" label-for="phoneInput")
							b-form-input(id="phoneInput" v-model="client.phone" type="text" required)
						b-button(type="submit" variant="primary" class="w-25 float-right" @click="onContinueButtonClick") Create
			b-col
</template>

<script>
export default {
	name: 'Register',
	data () {
		return {
			client: {
				firstName: '',
				lastName: '',
				phone: '',
				address: '',
				city: ''
			}
		}
	},
	methods: {
		onContinueButtonClick () {
			fetch(`${this.$SERVER_PATH}/client`, {
				method: 'POST',
				mode: 'cors',
				body: JSON.stringify(this.client),
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			})
		}
	}
}
</script>
