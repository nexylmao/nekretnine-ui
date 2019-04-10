<template lang="pug">
	div
		b-row
			b-col
			b-col(xl=7 lg=7 md=12)
				b-card
					b-card-text
						b-form
							b-form-group(id="usernameEmailLoginInputGroup" label="Username or email:" label-for="usernameEmailLoginInput")
								b-form-input(id="usernameEmailLoginInput" v-model="loginData.username" type="email" required placeholder="Enter your username or email")
							b-form-group(id="passwordLoginInputGroup" label="Password:" label-for="passwordLoginInput")
								b-form-input(id="passwordLoginInput" v-model="loginData.password" type="password" required)
							b-button(type="submit" variant="primary" class="w-100") Login
			b-col
</template>

<script>
export default {
	name: 'Login',
	data () {
		return {
			loginData: {
				username: '',
				password: ''
			}
		}
	}
}
</script>
