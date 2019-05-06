<template lang="pug">
	div
		b-row
			b-col
			b-col(xl=7 lg=7 md=12)
				b-alert(:show="!tokenValid" variant="danger")
					center
						p(id="alert-text") Token you used has expired or is not valid!
						b-button(variant="danger" to="/") Go back
				b-alert(:show="!emailValid" variant="danger")
					center
						p(id="alert-text") No email was specified!
						b-button(variant="danger" to="/") Go back
				div(v-if="tokenValid && emailValid")
					p.
						You have been invited by administrator to join Nekretnine website.
						Your registered email address is {{ registerEmail }}
					b-form
						b-form-group(id="usernameInputGroup" label="Username:" label-for="usernameInput")
							b-form-input(id="usernameInput" v-model="registerData.username" type="email" required)
						b-form-group(id="passwordInputGroup" label="Password:" label-for="passwordInput")
							b-form-input(id="passwordInput" v-model="registerData.password" type="password" required)
						b-form-group(id="repeatPasswordInputGroup" label="Repeat password:" label-for="repeatPasswordInput")
							b-form-input(id="repeatPasswordInput" v-model="registerData.repeatPassword" type="password" required)
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
			tokenValid: true,
			emailValid: true,
			registerData: {
				username: '',
				password: '',
				repeatPassword: ''
			}
		}
	},
	methods: {
		onContinueButtonClick () {
			console.log(this.registerData)
		}
	},
	mounted () {
		if (this.registerEmail === null || this.registerEmail === undefined) {
			this.emailValid = false
		}
	}
}
</script>

<style>
#alert-text {
	font-size: 1.1em;
}
</style>
