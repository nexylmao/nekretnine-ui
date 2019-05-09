<template lang="pug">
	div
		b-row
			b-col
			b-col(xl=7 lg=7 md=12)
				div
					p.
						Please enter you personal info to be registered as agent.
					b-form
						b-form-group(id="firstNameInputGroup" label="First name:" label-for="firstNameInput")
							b-form-input(id="firstNameInput" v-model="registerData.firstName" type="text" required)
						b-form-group(id="lastNameInputGroup" label="Last name:" label-for="lastNameInput")
							b-form-input(id="lastNameInput" v-model="registerData.lastName" type="text" required)
						b-form-group(id="phoneNumberInputGroup" label="Phone number:" label-for="phoneNumberInput")
							b-form-input(id="phoneNumberInput" v-model="registerData.phoneNumber" type="text" required)
						b-form-group(id="profileDescriptionInputGroup" label="Profile description:" label-for="profileDescriptionInput")
							b-form-textarea(id="profileDescriptionInput" v-model="registerData.profileDescription" placeholder="Write about yourself..." rows=3 max-rows=6 required)
						b-button(type="submit" variant="primary" class="w-25 float-right" @click="onContinueButtonClick") Continue
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
			registerData: {
				firstName: '',
				lastName: '',
				phoneNumber: '',
				profileDescription: ''
			}
		}
	},
	methods: {
		onContinueButtonClick () {
			console.log(this.registerData)
		}
	}
}
</script>
