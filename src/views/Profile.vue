<template>
	<div>
		<b-row>
			<b-card class="mx-auto" v-if="errorMessage" bg-variant="danger" text-variant="light">
				<h4> {{ errorMessage }} </h4>
			</b-card>
		</b-row>
		<b-row>
			<div v-if="loading" id="progress" class="mx-auto">
				<b-spinner variant="dark" />
			</div>
		</b-row>
		<b-row sm=12 v-if="me.id == id">
			<h2 class="mx-auto">Ovo ste vi!</h2>
		</b-row>
		<b-row>
			<b-col md=12 lg=3 v-if="agent">
				<b-img thumbnail fluid :src="agent.link || $DEFAULT_PROFILE" class="w-100" />
				<div class="p-2">
					<h2> {{ agent.firstName + ' ' + agent.lastName }} </h2>
					<h4> <FontAwesomeIcon icon="user"/> {{ account.username }} </h4>
					<h6> <FontAwesomeIcon icon="envelope"/> &nbsp;<a :href="'mailto:' + account.email"> {{account.email}} </a> </h6>
					<h6> <FontAwesomeIcon icon="phone"/> &nbsp;{{ agent.phone }} </h6>
					<p> {{ agent.profileDescription }} </p>
					<small> pridruzio se : {{ date }} </small>
					<b-button variant="primary" @click="editProfile" class="w-100">Edit profile</b-button>
				</div>
			</b-col>
			<b-col>
				<b-card v-if="stats" class="my-3">
					<h3>Statistika</h3>
					<h6 class="mx-auto"> {{ 'ukupno postavljenih nekretnina : ' + stats.RealEstateCount }} </h6>
					<h6 class="mx-auto"> {{ 'prodatih nekretnina : ' + stats.SalesCount }} </h6>
				</b-card>
				<b-card class="mb-3">
					<SearchBox :path="'/realEstate/agent/' + this.id" v-on:result="showResults" />
				</b-card>
				<SearchResultCard v-for="estate in realEstates" v-bind:key="estate.id" :data="estate" />
			</b-col>
		</b-row>
	</div>
</template>

<script>
import moment from 'moment'
import SearchBox from '@/components/SearchBox'
import SearchResultCard from '@/components/SearchResultCard'

export default {
	name: 'Profile',
	props: ['me'],
	components: {
		SearchBox,
		SearchResultCard
	},
	data () {
		return {
			loading: false,
			errorMessage: null,
			id: null,
			agent: null,
			account: null,
			stats: null,
			realEstates: null
		}
	},
	computed: {
		date () {
			return moment(this.agent.createdAt).format('DD. MM. Y.')
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
					this.account = json.account
					this.stats = json.stats
				})
				.catch(err => {
					console.error(err)
					this.loading = false
					this.errorMessage = err.message
				})
		},
		showResults (data) {
			this.realEstates = data
		},
		editProfile () {
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
