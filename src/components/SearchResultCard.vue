<template>
	<b-card :img-src="data.imgSrc" img-left class="search-result-card" :img-height="small ? '150px' : null">
    <b-row>
      <b-col>
        <RouterLink to="/realestate"><h2>{{ data.realEstate.address }}, {{ data.realEstate.city }}</h2></RouterLink>
        <small>{{ date }}</small><br/>
        <b-badge v-for="tag in data.realEstate.categories" :key="tag" style="margin-right: 5px">{{ tag }}</b-badge>
        <p>{{ data.realEstate.neighborhood }}</p>
      </b-col>
    </b-row>

    <b-row align-h="between">
      <b-col>
        <small>Cena:</small>
        <h4>{{ data.realEstate.price }} din</h4>
        <small>{{ pricePerSquareMeter }} din/m<sup>2</sup></small>
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
</style>
