<template lang="pug">
	b-card
		b-row
			b-col
			b-col(xl=7 lg=7 md=12)
				b-card(class="bg-success text-white" v-if="notice")
					h6 {{ notice }}
				b-card(class="bg-danger text-white" v-if="error")
					h6 {{ error }}
				center(class="my-2" v-if="loading || !me")
					b-spinner
				div(v-else)
					div(v-if="me && me.account && me.account.role !== 1")
						center
							h4(class="my-3" id="alert-text") Vi niste admin
							b-button(variant="danger" to="/") Vratite se na glavnu stranicu
					div(v-else)
						p Molimo vas, unesite email adresu za novi nalog
						b-form(@submit.prevent="submit")
							b-form-group(id="emailInputGroup" label="Email:" label-for="emailInput")
								b-form-input(id="emailInput" v-model="inviteData.email" type="email" required)
							b-form-group(id="adminCheckboxGroup" label="Email:" label-for="emailInput")
								b-form-checkbox(id="adminCheckbox" v-model="inviteData.isAdmin") Napravi administratorski nalog
							b-button(type="submit" variant="primary" class="w-25 float-right") Registruj
			b-col
</template>

<script>
export default {
	name: 'AddEmail',
	props: ['me'],
	data () {
		return {
			loading: true,
			notice: null,
			error: null,
			inviteData: {
				email: '',
				isAdmin: false
			}
		}
	},
	methods: {
		async submit () {
			this.loading = true
			this.notice = null
			this.error = null
			let data = await fetch(this.$SERVER_PATH + '/register/token', {
				method: 'POST',
				body: JSON.stringify({
					email: this.inviteData.email,
					role: this.inviteData.isAdmin ? 1 : undefined
				}),
				mode: 'cors',
				headers: {
					'content-type': 'application/json'
				},
				credentials: 'include'
			})
			let json = await data.json()
			this.loading = false
			if (data.status !== 200) {
				this.error = json.message
				return
			}
			this.notice = json.message
		}
	},
	mounted () {
		this.loading = false
	}
}
</script>
