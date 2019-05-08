<template lang="pug">
	b-modal(title="Login" v-model="computedShowModal" centered hide-footer)
		b-form(@submit.prevent="onLoginButtonClick")
			b-form-group(id="usernameEmailLoginInputGroup" label="Username or email:" label-for="usernameEmailLoginInput")
				b-form-input(id="usernameEmailLoginInput" v-model="loginData.identification" required placeholder="Enter your username or email")
			b-form-group(id="passwordLoginInputGroup" label="Password:" label-for="passwordLoginInput")
				b-form-input(id="passwordLoginInput" v-model="loginData.password" type="password" required)
			b-card(bg-variant="danger" text-variant="white" class="m-2" v-if="errorMessage") {{ errorMessage }}
			div(slot="modal-footer" class="w-100")
				b-button(v-if="!loading" variant="primary" class="float-right" type="submit") Login
				b-spinner(v-if="loading" variant="dark" class="float-right")
</template>

<script>
import crypto from 'crypto'

export default {
	name: 'LoginModal',
	props: {
		showModal: {
			type: Boolean,
			required: true
		}
	},
	data () {
		return {
			loading: false,
			errorMessage: null,
			loginData: {
				identification: '',
				password: ''
			}
		}
	},
	computed: {
		computedShowModal: {
			get () {
				return this.showModal
			},
			set (newVal) {
				if (!newVal) {
					this.$emit('modalHidden')
				}
			}
		}
	},
	methods: {
		onLoginButtonClick () {
			this.errorMessage = null
			this.loading = true
			fetch(this.$SERVER_PATH + '/login', {
				method: 'POST',
				body: JSON.stringify({
					identification: this.loginData.identification,
					password: crypto.createHash('sha256').update(this.loginData.password, 'utf8').digest('hex')
				}),
				mode: 'cors',
				headers: {
					'content-type': 'application/json'
				},
				credentials: 'include'
			})
				.then(response => {
					if (response.status === 401) {
						// eslint-disable-next-line no-throw-literal
						throw {
							message: 'Vi ste vec ulogovani.'
						}
					} else if (response.status !== 200) {
						// eslint-disable-next-line no-throw-literal
						throw {
							message: 'Ne uspesno prijavljivanje.'
						}
					}
					return response.json()
				})
				.then(json => {
					this.loading = false
					this.$emit('loggedIn', json)
				})
				.catch(err => {
					console.error(err)
					this.loading = false
					this.errorMessage = err.message
				})
		}
	}
}
</script>
