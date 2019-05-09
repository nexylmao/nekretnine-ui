<template lang="pug">
	div
		b-row
			b-col
			b-col(xl=7 lg=7 md=12)
				center(class="my-2" v-if="loading")
					b-spinner
				div(v-else)
					b-alert(:show="!tokenValid" variant="danger")
						center
							h4(class="my-3" id="alert-text") {{ errorMessage || 'Vas link nije validan' }}
							b-button(variant="danger" to="/") Vratite se na glavnu stranicu
					div(v-if="tokenValid")
						p.
							Pozvani ste od strane administratora da se registrujete na ovaj sajt.
						b-form
							b-form-group(id="usernameInputGroup" label="Korisnicko ime:" label-for="usernameInput")
								b-form-input(id="usernameInput" v-model="registerData.username" type="text" required)
							b-form-group(id="passwordInputGroup" label="Sifra:" label-for="passwordInput")
								b-form-input(id="passwordInput" v-model="registerData.password" type="password" required)
							b-form-group(id="repeatPasswordInputGroup" label="Ponovite sifru:" label-for="repeatPasswordInput")
								b-form-input(id="repeatPasswordInput" v-model="registerData.repeatPassword" type="password" required)
							b-card(v-if="notice" class="m-2 bg-danger text-white")
								h6 {{notice}}
							b-button(type="submit" variant="primary" class="w-25 float-right" @click="onContinueButtonClick") Continue
			b-col
</template>

<script>
export default {
	name: 'Register',
	data () {
		return {
			loading: false,
			token: null,
			tokenValid: false,
			errorMessage: null,
			notice: null,
			registerData: {
				username: '',
				password: '',
				repeatPassword: ''
			}
		}
	},
	methods: {
		async onContinueButtonClick () {
			this.notice = null
			if (this.registerData.password !== this.registerData.repeatPassword) {
				this.notice = 'Morate uneti istu sifru!'
				return
			}
			this.loading = true
			let data = await fetch(this.$SERVER_PATH + '/register/final', {
				method: 'POST',
				body: JSON.stringify({
					token: this.token,
					username: this.registerData.username,
					password: this.registerData.password
				}),
				mode: 'cors',
				headers: {
					'content-type': 'application/json'
				},
				credentials: 'include'
			})

			this.loading = false
			let json = await data.json()
			if (data.status !== 200) {
				this.notice = json.message ? json.message : 'Neocekivana greska se dogodila'
				return
			}
			this.$emit('loggedIn', {
				id: json.account.id,
				account: json.account
			})
			this.$router.push('/')
		}
	},
	async created () {
		this.token = this.$route.query.token
		if (!this.token) {
			this.tokenValid = false
			return
		}
		this.loading = true
		let data = await fetch(this.$SERVER_PATH + '/register/valid', {
			method: 'POST',
			body: JSON.stringify({
				token: this.token
			}),
			mode: 'cors',
			headers: {
				'content-type': 'application/json'
			},
			credentials: 'include'
		})
		this.loading = false
		if (data.status !== 200) {
			let json = await data.json()
			if (json.message) {
				if (json.message.includes('logged in')) {
					this.errorMessage = 'Vi ste vec ulogovani. Odlogujte se, i pokusajte ponovo.'
				} else if (json.message.includes('used')) {
					this.errorMessage = 'Vas link je iskoriscen.'
				} else if (json.message.includes('expired')) {
					this.errorMessage = 'Vas link je istekao.'
				}
			}
			return
		}
		this.tokenValid = true
	}
}
</script>
