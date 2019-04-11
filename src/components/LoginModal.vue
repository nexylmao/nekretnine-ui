<template lang="pug">
	b-modal(title="Login" v-model="computedShowModal" centered)
		b-form
			b-form-group(id="usernameEmailLoginInputGroup" label="Username or email:" label-for="usernameEmailLoginInput")
				b-form-input(id="usernameEmailLoginInput" v-model="loginData.username" type="email" required placeholder="Enter your username or email")
			b-form-group(id="passwordLoginInputGroup" label="Password:" label-for="passwordLoginInput")
				b-form-input(id="passwordLoginInput" v-model="loginData.password" type="password" required)
		div(slot="modal-footer" class="w-100")
			b-button(type="submit" variant="primary" class="float-right") Login
</template>

<script>
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
				username: '',
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
	}
}
</script>
