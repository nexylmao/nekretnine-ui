<template>
	<div>
		<b-row class="my-1">
			<div v-if="loading" id="progress" class="mx-auto my-0">
				<b-spinner variant="dark" />
			</div>
		</b-row>
		<b-row class="mx-auto my-1">
			<b-card v-if="errorMessage" bg-variant="danger" class="w-100">
				{{ errorMessage }}
			</b-card>
		</b-row>
		<b-row v-if="realEstate" sm=12 md=10 lg=8>
			<b-col>
				<b-carousel
					id="carouselSlideshow"
					controls
					indicators
					:interval="10000"
				>
					<b-carousel-slide
						v-for="url in (realEstate.photos || $DEFAULT_REALESTATE_PHOTOS)"
						:key="url"
						:img-src="url"
					/>
				</b-carousel>

				<div class="p-2 text-white">
					<h1 style="margin-top: 10px; margin-bottom: 10px">{{ realEstate.address }}</h1>
				</div>

				<b-card>
					<b-card-text>
						<b-row>
							<b-col>
								<p>Ulica: <b>{{ realEstate.address }}</b></p>
								<p>Grad: <b>{{ realEstate.city }}</b></p>
								<p>Naselje: <b>{{ $NEIGHBORHOODS[realEstate.neighborhood] }}</b></p>
							</b-col>
							<b-col>
								<p>Kvadratura: <b>{{ realEstate.area }} m<sup>2</sup></b></p>
								<p>Tagovi: <b-badge v-for="category in realEstate.categories.split(';')" :key="category" style="margin-right: 5px">{{ category }}</b-badge></p>
							</b-col>
						</b-row>
					</b-card-text>
				</b-card>

				<div style="margin-top: 10px; margin-bottom: 10px;" class="p-2 text-white">
					<small class="grey-text">Ažuriran: {{ getDate() }}</small>
				</div>
			</b-col>
			<b-col>
				<b-card>
					<b-card-text>
						<b-row>
							<b-col>
								<h3>Kontakt podaci agenta</h3>
							</b-col>
						</b-row>
						<b-row>
							<b-col>
								<b-img thumbnail fluid :src="agent.link || $DEFAULT_PROFILE" class="w-100" />
							</b-col>
							<b-col>
								<RouterLink :to="'/profile?id=' + agentId"><h2> {{ agent.firstName + ' ' + agent.lastName }} </h2></RouterLink>
								<h4> <FontAwesomeIcon icon="user"/> {{ account.username }} </h4>
								<h6> <FontAwesomeIcon icon="envelope"/> &nbsp;<a :href="'mailto:' + account.email"> {{account.email}} </a> </h6>
								<h6> <FontAwesomeIcon icon="phone"/> &nbsp;{{ agent.phone }} </h6>
								<p> {{ agent.profileDescription }} </p>
								<small> pridruzio se : {{ getAgentDate() }} </small>
							</b-col>
						</b-row>
					</b-card-text>
				</b-card>

				<b-card class="my-1" v-if="!sale">
					<b-card-text>
						<b-row>
							<b-col>
								<small>Cena</small>
								<h2>{{ realEstate.price }}</h2>
								<small>{{ pricePerSquareMeter }} din/m<sup>2</sup></small>
							</b-col>
						</b-row>
					</b-card-text>
				</b-card>
				<b-card class="my-1" v-else bg-variant="danger" text-variant="white">
					<b-card-text>
						<b-row>
							<b-col>
								<h4> Nekretnina je prodata! </h4>
								<small> {{ 'prodato : ' + getSaleDate() }} </small>
							</b-col>
						</b-row>
					</b-card-text>
				</b-card>

				<b-card v-if="!!me.account.role || me.id === agentId">
					<router-link :to="'/realestate/edit?id=' + id"><b-button>Edituj nekretninu</b-button></router-link>
				</b-card>
			</b-col>
		</b-row>
	</div>
</template>

<script>
import moment from 'moment'
// import { randomBytes } from 'crypto'

export default {
	name: 'RealEstatePage',
	props: ['me'],
	created () {
		this.id = this.$route.query.id
	},
	mounted () {
		this.loading = true
		this.errorMessage = null
		fetch(this.$SERVER_PATH + '/realEstate/id/' + this.id, {
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
						message: 'Nije pronadjena nekretnina.'
					}
				}
				return response.json()
			})
			.then(json => {
				this.loading = false
				this.agentId = json.agentId
				this.realEstate = json.realEstate
				this.agent = json.agent
				this.account = json.account
				this.sale = json.sale
			})
			.catch(err => {
				console.error(err)
				this.loading = false
				this.errorMessage = err.message
			})
	},
	data () {
		return {
			id: null,
			agentId: null,
			realEstate: null,
			agent: null,
			account: null,
			sale: null,
			errorMessage: null,
			loading: false
		}
	},
	computed: {
		pricePerSquareMeter () {
			return (this.realEstate.price / this.realEstate.area).toFixed(2)
		}
	},
	methods: {
		getDate () {
			return moment(this.realEstate.updatedAt).format('DD. MM. Y.')
		},
		getSaleDate () {
			if (this.sale) {
				return moment(this.sale.saleDate).format('DD. MM. Y.')
			}
		},
		getAgentDate () {
			if (this.agent) {
				return moment(this.agent.createdAt).format('DD. MM. Y')
			}
		}
	}
}
</script>

<style>
.grey-text {
	color: #00000090;
}
</style>
