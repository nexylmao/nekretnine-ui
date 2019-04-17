<template>
	<b-card :img-src="resultCardData.imgSrc" img-left class="search-result-card" :img-height="small ? '150px' : null">
		<b-card-text v-if="small">
			<b-row>
				<b-col>
					<RouterLink to="/"><h2>{{ resultCardData.title }}</h2></RouterLink>
					<small>{{ date }}</small><br/>
					<b-badge v-for="tag in resultCardData.tags" :key="tag" style="margin-right: 5px">{{ tag }}</b-badge>
					<!-- <h5>{{ resultCardData.address }}, {{ resultCardData.city }}</h5> -->
				</b-col>
				<b-col>
					<small>Cena</small>
					<h4>{{ resultCardData.price }} din</h4>
					<small>{{ pricePerSquareMeter }}} din/m<sup>2</sup></small>
				</b-col>
				<b-col>
					<small>Kvadratura</small>
					<h4>{{ resultCardData.area }} m<sup>2</sup></h4>
				</b-col>
			</b-row>
		</b-card-text>
		<b-card-text v-else>
			<b-row>
				<b-col>
					<RouterLink to=/><h2>{{ resultCardData.title }}</h2></RouterLink>
					<small>{{ date }}</small><br/>
					<b-badge v-for="tag in resultCardData.tags" :key="tag" style="margin-right: 5px">{{ tag }}</b-badge>
					<h4>{{ resultCardData.address }}, {{ resultCardData.city }}</h4>
					<p>{{ resultCardData.shortDescription }}</p>
				</b-col>
			</b-row>

			<b-row align-h="between">
				<b-col>
					<small>Cena:</small>
					<h4>{{ resultCardData.price }} din</h4>
					<small>{{ pricePerSquareMeter }} din/m<sup>2</sup></small>
				</b-col>
				<b-col>
					<small>Kvadratura</small>
					<h4>{{ resultCardData.area }} m<sup>2</sup></h4>
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
		}
	},
	data () {
		return {
			resultCardData: {
				imgSrc: 'https://placekitten.com/300/300',
				title: 'Naslov',
				createdAt: new Date(),
				tags: ['dvosoban', 'iznajmljivanje'],
				address: 'Veljka Petrovica 8',
				city: 'Novi Sad',
				shortDescription: 'Kratak opis',
				price: 41.53,
				area: 12.54
			}
		}
	},
	computed: {
		date () {
			return moment(this.resultCardData.createdAt).format('DD. MM. Y.')
		},
		pricePerSquareMeter () {
			return (this.resultCardData.price / this.resultCardData.area).toFixed(2)
		}
	}
}
</script>

<style>
.search-result-card {
	margin-bottom: 10px;
}
</style>
