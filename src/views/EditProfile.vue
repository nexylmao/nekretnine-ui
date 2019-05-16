<template lang="pug">
	div
		b-row
			b-col
			b-col(xl=7 lg=7 md=12)
				div
					p.
						Please enter your personal info you want to edit.
					b-form
						b-form-group(id="firstNameInputGroup" label="First name:" label-for="firstNameInput")
							b-form-input(id="firstNameInput" v-model="agentNew.firstName" type="text" required)
						b-form-group(id="lastNameInputGroup" label="Last name:" label-for="lastNameInput")
							b-form-input(id="lastNameInput" v-model="agentNew.lastName" type="text" required)
						b-form-group(id="phoneNumberInputGroup" label="Phone number:" label-for="phoneNumberInput")
							b-form-input(id="phoneNumberInput" v-model="agentNew.phone" type="text" required)
						b-form-group(id="profileDescriptionInputGroup" label="Profile description:" label-for="profileDescriptionInput")
							b-form-textarea(id="profileDescriptionInput" v-model="agentNew.profileDescription" placeholder="Write about yourself..." rows=3 max-rows=6)
						b-button(type="submit" variant="primary" class="w-25 float-right" @click="onContinueButtonClick") Update
			b-col
</template>

<script>
export default {
	name: 'Register',
	data () {
		return {
			id: null,
			agent: null,
			agentNew: null,
			account: null,
			loading: null,
			stats: null
		}
	},
	methods: {
		getAgent () {
			this.loading = true
			fetch(this.$SERVER_PATH + '/agent/id/' + this.id, {
				mode: 'cors',
				headers: {
					'content-type': 'application/json'
				},
				credentials: 'include'
			})
				.then(response => {
					if (response.status !== 200) {
						// eslint-disable-next-line no-throw-literal
						throw {
							message: 'Nije pronadjen agent.'
						}
					}
					return response.json()
				})
				.then(json => {
					this.loading = false
					this.agent = json.agent
					this.agentNew = JSON.parse(JSON.stringify(json.agent))
					this.account = json.account
					this.stats = json.stats
				})
				.catch(err => {
					console.error(err)
					this.loading = false
					this.errorMessage = err.message
				})
		},
		onContinueButtonClick () {
			let newObj = {}
			if (this.agent.firstName !== this.agentNew.firstName) newObj.firstName = this.agentNew.firstName
			if (this.agent.firstLast !== this.agentNew.firstLast) newObj.firstLast = this.agentNew.firstLast
			if (this.agent.phone !== this.agentNew.phone) newObj.phone = this.agentNew.phone
			if (this.agent.profileDescription !== this.agentNew.profileDescription) newObj.profileDescription = this.agentNew.profileDescription
			// Postovanje je na tebi jer znm sta oces za handlovanje da radis
		}
	},
	created () {
		this.id = this.$route.query.id
		this.errorMessage = null
	},
	mounted () {
		this.getAgent()
	}
}
</script>
