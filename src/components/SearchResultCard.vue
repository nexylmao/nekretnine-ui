<template>
	<b-card style="background: rgb(255, 255, 255, 0.7);" id="thumbnail" class="search-result-card">
		<b-row>
			<b-col sm=12 md=6 lg=4>
				<img class="real-estate-photo-search-result" :src="data.realEstate.photos ? data.realEstate.photos[0] : $DEFAULT_REALESTATE">
			</b-col>
      <b-col sm=12 md=6 lg=4>
        <RouterLink :to="'/realestate?id=' + data.id"><h2>{{ data.realEstate.address }}, {{ data.realEstate.city }}</h2></RouterLink>
				<RouterLink :to="'/profile?id=' + data.agentId">
					<b-btn v-if="data.agentId" >
						<img id="smallProfile" :src="data.agent.link || this.$DEFAULT_PROFILE"/>
						<small>{{data.agent.firstName + ' ' + data.agent.lastName}} </small>
					</b-btn>
				</RouterLink>
				<br/>
				<small>{{ date }}</small><br/>
        <b-badge v-for="tag in data.realEstate.categories.split(';')" :key="tag" style="margin-right: 5px">{{ tag }}</b-badge>
        <p>{{ this.$NEIGHBORHOODS[data.realEstate.neighborhood] }}</p>
      </b-col>
			<b-col sm=12 md=6 lg=4 v-if="!data.sale">
				<b-col>
					<small>Cena:</small>
					<h4>{{ data.realEstate.price }} €</h4>
					<small>{{ pricePerSquareMeter }} €/m<sup>2</sup></small>
				</b-col>
				<b-col>
					<small>Kvadratura</small>
					<h4>{{ data.realEstate.area }} m<sup>2</sup></h4>
				</b-col>
			</b-col>
			<b-col sm=12 md=6 lg=4 v-else>
				<b-card bg-variant="danger" text-variant="light">
					<h4>PRODATO</h4>
					{{ soldOn }}
				</b-card>
			</b-col>
    </b-row>
	</b-card>
</template>

<script>
import moment from 'moment'

export default {
	name: 'SearchResultCard',
	data () {
		return {
			testImages: ['https://placekitten.com/200/300', 'https://placebear.com/200/300', 'https://baconmockup.com/200/300/']
		}
	},
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

.real-estate-photo-search-result {
	object-fit: scale-down;
	max-height: 300px;
	height: 100%;
	max-width: 300px;
	width: 100%;
}

#smallProfile {
	margin-right: 10px;
	height: 25px;
	width: 25px;
	border-radius: 50%;
}
</style>
