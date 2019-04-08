<template>
	<div>
		<b-row>
			<b-col cols=8>
				<b-carousel
					id="carouselSlideshow"
					controls
					indicators
					:interval="10000"
				>
					<b-carousel-slide
						v-for="url in imageUrls"
						:key="url"
						:img-src="url"
					/>
				</b-carousel>
			</b-col>
			<b-col>
				<b-card>
					<b-card-text>
						<b-row>
							<b-col>
								<small>Cena</small>
								<h2>{{ realEstateData.price }}</h2>
								<small>{{ pricePerSquareMeter }} din/m<sup>2</sup></small>
							</b-col>
						</b-row>
						<hr/>
						<b-row>
							<b-col>
								<h4>{{ realEstateData.agentName }}</h4>
								<label class="grey-text"><small>Adresa</small></label>
								<p style="white-space: pre-line">{{ (realEstateData.address).replace(/,/g, '\n').replace(/ *, */g, '\n') }}</p>
								<label class="grey-text"><small>Telefon</small></label>
								<p>{{ realEstateData.agentPhone }}</p>
								<b-button variant=primary class="w-100">Pošalji email</b-button>
							</b-col>
						</b-row>
					</b-card-text>
				</b-card>
			</b-col>
		</b-row>
	</div>
</template>

<script>
export default {
	name: 'RealEstatePage',
	data () {
		return {
			imageUrls: [
				'http://placekitten.com/1024/768',
				'http://placekitten.com/1024/768',
				'http://placekitten.com/1024/768'
			],
			realEstateData: {
				price: 5931.54,
				size: 124.00,
				agentName: 'Dušan Simić',
				address: 'Nušićeva 6, Beograd, 11000, Srbija',
				agentPhone: '0695342091',
				agentEmail: 'dusansimic@nekreletnine.rs'
			}
		}
	},
	computed: {
		pricePerSquareMeter () {
			return (this.realEstateData.price / this.realEstateData.size).toFixed(2)
		}
	}
}
</script>

<style>
.grey-text {
	color: #00000090;
}
</style>
