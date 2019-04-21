<template lang="pug">
	b-modal(title="Login" v-model="computedShowModal" centered)
		b-form
			b-form-group(id="usernameEmailLoginInputGroup" label="Username or email:" label-for="usernameEmailLoginInput")
				b-form-input(id="usernameEmailLoginInput" v-model="loginData.username" type="email" required placeholder="Enter your username or email")
			b-form-group(id="passwordLoginInputGroup" label="Password:" label-for="passwordLoginInput")
				b-form-input(id="passwordLoginInput" v-model="loginData.password" type="password" required)
		div(slot="modal-footer" class="w-100")
			b-button(variant="primary" class="float-right" @click="onLoginButtonClick") Login
</template>

<script>
/* Nemoj mi verovati na rec da se ovako poziva
 * ova biblioteka tako da ako ti bude trebala
 * proveri za svaki slucaj kako se poziva jer
 * Vue taba kroz neki babel il neki kurac pa
 * moras postovati kako se importuje u es6+.
 */
// import crypto from 'crypto'

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
		/* Ista prica kao u navbar za computed.
		 * Samo sto ovde se gleda dal je treba prikazati
		 * modal ili ne.
		 */
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
		/* Sada se ovde baca ona logika za logovanje
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
			this.$emit('loggedIn')
		}
	}
}
</script>
