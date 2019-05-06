<template>
	<b-card id="thumbnail" :img-src="data.imgSrc || $DEFAULT_REALESTATE" img-left class="search-result-card" :img-height="'300px'" :img-width="'300px'">
    <b-row>
      <b-col>
        <RouterLink :to="'/realestate?id=' + data.id"><h2>{{ data.realEstate.address }}, {{ data.realEstate.city }}</h2></RouterLink>
				<b-btn>
					<img id="smallProfile" :src="data.agent.link || this.$DEFAULT_PROFILE"/>
					<small>{{data.agent.firstName + ' ' + data.agent.lastName}} </small>
				</b-btn>
				<br/>
				<small>{{ date }}</small><br/>
        <b-badge v-for="tag in data.realEstate.categories.split(';')" :key="tag" style="margin-right: 5px">{{ tag }}</b-badge>
        <p>{{ this.$NEIGHBORHOODS[data.realEstate.neighborhood] }}</p>
      </b-col>
    </b-row>

    <b-row align-h="between">
      <b-col>
        <small>Cena:</small>
        <h4>{{ data.realEstate.price }} €</h4>
        <small>{{ pricePerSquareMeter }} €/m<sup>2</sup></small>
      </b-col>
      <b-col>
        <small>Kvadratura</small>
        <h4>{{ data.realEstate.area }} m<sup>2</sup></h4>
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

#smallProfile {
	margin-right: 10px;
	height: 25px;
	width: 25px;
	border-radius: 50%;
}
</style>
