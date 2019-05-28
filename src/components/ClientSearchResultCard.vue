<template>
	<b-card style="background: rgb(255, 255, 255, 0.7);" id="thumbnail" class="search-result-card">
		<b-row>
			<b-col sm=12 md=6 lg=4>
				<RouterLink :to="'/client/profile?id=' + data.id"><h2>{{ data.client.firstName }} {{ data.client.lastName }}</h2></RouterLink>
				<p>{{ data.client.address }} {{ data.client.city }}</p>
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
</style>
