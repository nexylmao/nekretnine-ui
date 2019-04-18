<template>
	<b-card :img-src="data.imgSrc" img-left class="search-result-card" :img-height="small ? '150px' : null">
		<b-card-text v-if="small">
			<b-row>
				<b-col>
					<RouterLink to="/"><h2>{{ data.title }}</h2></RouterLink>
					<small>{{ date }}</small><br/>
					<b-badge v-for="tag in data.tags" :key="tag" style="margin-right: 5px">{{ tag }}</b-badge>
					<!-- <h5>{{ data.address }}, {{ data.city }}</h5> -->
				</b-col>
				<b-col>
					<small>Cena</small>
					<h4>{{ data.price }} din</h4>
					<small>{{ pricePerSquareMeter }}} din/m<sup>2</sup></small>
				</b-col>
				<b-col>
					<small>Kvadratura</small>
					<h4>{{ data.area }} m<sup>2</sup></h4>
				</b-col>
			</b-row>
		</b-card-text>
		<b-card-text v-else>
			<b-row>
				<b-col>
					<RouterLink to=/><h2>{{ data.title }}</h2></RouterLink>
					<small>{{ date }}</small><br/>
					<b-badge v-for="tag in data.tags" :key="tag" style="margin-right: 5px">{{ tag }}</b-badge>
					<h4>{{ data.address }}, {{ data.city }}</h4>
					<p>{{ data.shortDescription }}</p>
				</b-col>
			</b-row>

			<b-row align-h="between">
				<b-col>
					<small>Cena:</small>
					<h4>{{ data.price }} din</h4>
					<small>{{ pricePerSquareMeter }} din/m<sup>2</sup></small>
				</b-col>
				<b-col>
					<small>Kvadratura</small>
					<h4>{{ data.area }} m<sup>2</sup></h4>
				</b-col>
			</b-row>
		</b-card-text>
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
			return moment(this.data.createdAt).format('DD. MM. Y.')
		},
		pricePerSquareMeter () {
			return (this.data.price / this.data.area).toFixed(2)
		}
	}
}
</script>

<style>
.search-result-card {
	margin-bottom: 10px;
}
</style>
