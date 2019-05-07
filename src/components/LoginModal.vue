<template lang="pug">
	b-modal(title="Login" v-model="computedShowModal" centered)
		b-form
			b-form-group(id="usernameEmailLoginInputGroup" label="Username or email:" label-for="usernameEmailLoginInput")
				b-form-input(id="usernameEmailLoginInput" v-model="loginData.identification" type="email" required placeholder="Enter your username or email")
			b-form-group(id="passwordLoginInputGroup" label="Password:" label-for="passwordLoginInput")
				b-form-input(id="passwordLoginInput" v-model="loginData.password" type="password" required)
		div(slot="modal-footer" class="w-100")
			b-button(variant="primary" class="float-right" @click="onLoginButtonClick") Login
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
		/*
		 * Sada se ovde baca ona logika za logovanje
		 * korisnika. Tu mozes isto i ako neke tokene
		 * treba sredjivati umesto u app.vue.
		 * Mislim da je jasno kod logina koje podatke saljes.
		 * Nemam pojma dal zelis da se hesuje ili ne tako da
		 * to ti ovde radi.
		 * Ostavicu ti zakomentarisan import biblioteke
		 * koja ti hashuje u sha256 pa je ti iskoristi ako
		 * oces. Redovno kao u nodejs direktno pozivas biblioteku
		 * jer je ovo javascript blok.
		 */
		onLoginButtonClick () {
			console.log(this.loginData)
			this.$emit('loggedIn', data)
		}
	}
}
</script>
