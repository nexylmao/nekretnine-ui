<template>
	<b-card id="thumbnail" class="search-result-card">
		<b-row>
			<b-col sm=12 md=6 lg=4>
				<img class="agent-profile-photo-search-result" :src="data.agent.link ? data.agent.link : $DEFAULT_PROFILE">
      </b-col>
			<b-col sm=12 md=6 lg=4>
				<RouterLink :to="'/profile?id=' + data.id"><h2>{{ data.agent.firstName }} {{ data.agent.lastName }}</h2></RouterLink>
				<p>{{ data.agent.profileDescription }}</p>
			</b-col>
			<b-col sm=12 md=6 lg=4>
				<p class="card p-2"> Broj postavljenih nekretnine : {{ data.stats.RealEstateCount }} </p>
				<p class="card p-2"> Broj prodatih nekretnina : {{ data.stats.SalesCount }} </p>
			</b-col>
    </b-row>
	</b-card>
</template>

<script>
import moment from 'moment'

export default {
	name: 'AgentSearchResultCard',
	props: {
		small: {
			type: Boolean,
			default: false,
			required: false
		},
		data: {
			type: Object,
			required: true
		}
	},
	computed: {
		date () {
			return moment(this.data.realEstate.createdAt).format('DD. MM. Y.')
		},
		soldOn () {
			return moment(this.data.sale.saleDate).format('DD. MM. Y.')
		},
		pricePerSquareMeter () {
			return (this.data.realEstate.price / this.data.realEstate.area).toFixed(2)
		}
	}
}
</script>

<style>
.search-result-card {
	margin-bottom: 10px;
}

.agent-profile-photo-search-result {
	object-fit: scale-down;
	max-height: 200px;
	height: 100%;
	max-width: 200px;
	width: 100%;
}
</style>
