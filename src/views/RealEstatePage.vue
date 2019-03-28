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
			]
		}
	}
}
</script>
