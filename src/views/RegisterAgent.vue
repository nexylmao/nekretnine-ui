<template lang="pug">
	div
		b-row
			b-col
			b-col(xl=7 lg=7 md=12)
				b-card(class="bg-danger text-white m-3" v-if="notice")
					h6 {{notice}}
				center
					b-spinner(variant="dark" v-if="loading")
				div(v-if="!agent")
					p.
						Molimo vas, unesite podatke da bi se registrovali kao agent.
					b-form
						b-form-group(id="firstNameInputGroup" label="Ime :" label-for="firstNameInput")
							b-form-input(id="firstNameInput" v-model="registerData.firstName" type="text" required)
						b-form-group(id="lastNameInputGroup" label="Prezime :" label-for="lastNameInput")
							b-form-input(id="lastNameInput" v-model="registerData.lastName" type="text" required)
						b-form-group(id="phoneNumberInputGroup" label="Broj telefona:" label-for="phoneNumberInput")
							b-form-input(id="phoneNumberInput" v-model="registerData.phone" type="text" required)
						b-form-group(id="profileDescriptionInputGroup" label="Opis profila:" label-for="profileDescriptionInput")
							b-form-textarea(id="profileDescriptionInput" v-model="registerData.profileDescription" placeholder="Napisite nesto o sebi..." rows=3 max-rows=6 required)
						b-button(type="submit" variant="primary" class="w-25 float-right" @click="onContinueButtonClick") Nastavi
				div(v-else)
					p.
						Vi ste vec agent!
			b-col
</template>

<script>
export default {
	name: 'Register',
	props: ['me'],
	data () {
		return {
			loading: false,
			notice: null,
			registerData: {
				firstName: '',
				lastName: '',
				phone: '',
				profileDescription: ''
			}
		}
	},
	computed: {
		agent () {
			return this.me.agent
		}
	},
	methods: {
		async onContinueButtonClick () {
			this.loading = true
			let data = await fetch(this.$SERVER_PATH + '/agent/init', {
				method: 'POST',
				body: JSON.stringify(this.registerData),
				mode: 'cors',
				headers: {
					'content-type': 'application/json'
				},
				credentials: 'include'
			})

			this.loading = false
			let json = await data.json()
			if (data.status !== 200) {
				this.notice = json.message
				return
			}

			this.$emit('updateMe')
			this.$router.push('/profile?id=' + this.me.id)
		}
	}
}
</script>
