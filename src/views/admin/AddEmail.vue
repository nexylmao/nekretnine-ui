<template lang="pug">
	div
		b-row
			b-col
			b-col(xl=7 lg=7 md=12)
				p Please enter email address you want to register!
				b-form
					b-form-group(id="emailInputGroup" label="Email:" label-for="emailInput")
						b-form-input(id="emailInput" v-model="inviteData.email" type="email" required)
					b-button(type="submit" variant="primary" class="w-25 float-right") Register
			b-col
</template>

<script>
export default {
	name: 'AddEmail',
	data () {
		return {
			inviteData: {
				email: ''
			}
		}
	}
}
</script>
