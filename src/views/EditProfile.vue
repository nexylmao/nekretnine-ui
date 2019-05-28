<template lang="pug">
	b-card
		b-row
			b-col
			b-col(xl=7 lg=7 md=12)
				div(v-if="loading")
					center
						b-spinner
				div(v-else)
					div(v-if="notice")
						b-card(class="bg-danger text-white")
							h4 {{ notice }}
					div(v-if="me.agent")
						p.
							Ovde mozete da promenite podatke od {{ me.agent.firstName + ' ' + me.agent.lastName + ' (' + me.account.username + ')' }}.
						b-form
							b-form-group(id="firstNameInputGroup" label="Ime: " label-for="firstNameInput")
								b-form-input(id="firstNameInput" v-model="agentNew.firstName" type="text" required)
							b-form-group(id="lastNameInputGroup" label="Prezime: " label-for="lastNameInput")
								b-form-input(id="lastNameInput" v-model="agentNew.lastName" type="text" required)
							b-form-group(id="phoneNumberInputGroup" label="Broj telefona: " label-for="phoneNumberInput")
								b-form-input(id="phoneNumberInput" v-model="agentNew.phone" type="text" required)
							b-form-group(id="profileDescriptionInputGroup" label="Opis profila: " label-for="profileDescriptionInput")
								b-form-textarea(id="profileDescriptionInput" v-model="agentNew.profileDescription" placeholder="Napisite nesto o sebi..." rows=3 max-rows=6)
							b-button(type="submit" variant="primary" class="w-25 float-right" @click="onContinueButtonClick") Azuriraj profil
					div(v-else)
						center
							b-spinner(class="my-3")
			b-col
</template>

<script>
export default {
	name: 'EditProfile',
	props: ['me'],
	data () {
		return {
			id: null,
			loading: false,
			notice: null
		}
	},
	methods: {
		async onContinueButtonClick () {
			this.notice = null
			let deltas = {}
			if (this.me.agent.firstName !== this.agentNew.firstName) deltas.firstName = this.agentNew.firstName
			if (this.me.agent.lastName !== this.agentNew.lastName) deltas.lastName = this.agentNew.lastName
			if (this.me.agent.phone !== this.agentNew.phone) deltas.phone = this.agentNew.phone
			if (this.me.agent.profileDescription !== this.agentNew.profileDescription) deltas.profileDescription = this.agentNew.profileDescription
			if (Object.keys(deltas) < 1) {
				this.notice = 'Niste napravili nikakve promene!'
				return
			}
			let request = null
			if (this.id === this.me.id) {
				request = '/me'
			} else {
				request = '/edit/id/' + this.id
			}
			this.loading = true

			let data = await fetch(this.$SERVER_PATH + '/agent' + request, {
				method: 'PUT',
				body: JSON.stringify(deltas),
				mode: 'cors',
				headers: {
					'content-type': 'application/json'
				},
				credentials: 'include'
			})
			this.loading = false

			if (data.status !== 200) {
				if (data.status === 500) {
					this.notice = 'Neki podaci nisu formatirani kako treba!'
				} else if (data.status === 400) {
					this.notice = 'Niste napravili nikakve promene!'
				} else if (data.status === 404) {
					this.notice = 'Korisnik sa tim id-jem ne postoji, ili korisnik nije agent!'
				} else if (data.status === 403) {
					this.notice = 'Vi ne mozete da menjate ovaj nalog!'
				} else {
					this.notice = 'Dogodila se neka greska!'
				}
				return
			}

			if (this.id === this.me.id) {
				this.$emit('updateMe')
			}
			this.$router.back()
		}
	},
	computed: {
		agentNew () {
			return JSON.parse(JSON.stringify(this.me.agent))
		}
	},
	created () {
		this.id = this.$route.query.id
		this.errorMessage = null
	}
}
</script>
