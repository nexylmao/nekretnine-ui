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

				<h1 style="margin-top: 10px; margin-bottom: 10px">{{ realEstateData.title }}</h1>

				<b-card>
					<b-card-text>
						<b-row>
							<b-col>
								<p>Ulica: <b>{{ realEstateData.address }}</b></p>
								<p>Grad: <b>{{ realEstateData.city }}</b></p>
							</b-col>
							<b-col>
								<p>Kvadratura: <b>{{ realEstateData.area }} m<sup>2</sup></b></p>
								<p>Tagovi: <b-badge v-for="tag in realEstateData.tags" :key="tag" style="margin-right: 5px">{{ tag }}</b-badge></p>
							</b-col>
						</b-row>
					</b-card-text>
				</b-card>

				<div style="margin-top: 10px; margin-bottom: 10px">
					<small class="grey-text">Ažuriran: {{ getDate(realEstateData.updatedAt) }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Objavljen: {{ getDate(realEstateData.createdAt) }}</small>
				</div>

				<div style="margin-top: 20px; margin-bottom: 20px">
					<h3>Opis</h3>
					<p>{{ realEstateData.description }}</p>
				</div>

				<b-card>
					<b-card-text>
						<b-row>
							<b-col>
								<h3>Kontakt podaci agenta</h3>
							</b-col>
						</b-row>
						<b-row>
							<b-col>
								<p>Ulica: {{ realEstateData.address }}</p>
								<p>Mesto: {{ realEstateData.city }}</p>
							</b-col>
							<b-col>
								<small class="grey-text">Adresa</small>
								<p>{{ realEstateData.agentPhone }}</p>
								<b-button variant=primary class="w-100">Pošalji email</b-button>
							</b-col>
						</b-row>
					</b-card-text>
				</b-card>
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
								<RouterLink to="/profile"><h4>{{ realEstateData.agentName }}</h4></RouterLink>
								<label class="grey-text"><small>Adresa</small></label>
								<p>{{ realEstateData.address }}<br/>{{ realEstateData.city }}</p>
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
import moment from 'moment'

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
				title: 'Neki vrlo skup stan u Novom Sadu',
				price: 5931.54,
				area: 124.00,
				agentName: 'Dušan Simić',
				agentPhone: '0695342091',
				agentEmail: 'dusansimic@nekreletnine.rs',
				address: 'Veljka Petrovica 8',
				city: 'Novi Sad',
				createdAt: new Date(),
				updatedAt: new Date(),
				tags: ['dvosoban', 'iznajmljivanje'],
				description: 'U neposrednoj blizini Hrama ,idealan za laboratoriju ,ordinaciju ,kancelarije.. Moguc dogovor. Nase usluge iznose 50% od visine prve mesecne zakupnine.'
			}
		}
	},
	computed: {
		pricePerSquareMeter () {
			return (this.realEstateData.price / this.realEstateData.area).toFixed(2)
		}
	},
	methods: {
		getDate (dateTime) {
			return moment(dateTime).format('DD. MM. Y.')
		}
	}
}
</script>

<style>
.grey-text {
	color: #00000090;
}
</style>
