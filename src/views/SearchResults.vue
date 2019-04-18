<template>
	<div>
		<b-card class="search-box-card">
			<SearchBox/>
		</b-card>
		<b-row>
			<b-col cols=8 md=12>
				<SearchResultCard v-for="searchResult in searchResults" :key="searchResult.title" :data="searchResult"/>
			</b-col>
			<b-col>
			</b-col>
		</b-row>
	</div>
</template>

<script>
import SearchBox from '@/components/SearchBox'
import SearchResultCard from '@/components/SearchResultCard'

export default {
	name: 'SearchResults',
	components: {
		SearchBox,
		SearchResultCard
	},
	data () {
		return {
			searchResults: [
				{
					title: 'SAVRŠEN PORODIČNI SA POGLEDOM NA HRAM',
					imgSrc: 'https://nekretnineslike.blob.core.windows.net/profile/5cb23b394914907f102bc00b.png.thumbnail',
					createdAt: new Date(),
					tags: ['Trosoban stan', 'Prodaja'],
					address: 'Neimar',
					city: 'Beograd',
					shortDescription: 'UKNJIŽEN Trosoban stan, 80m2 (76m2+ loda + terasa), u održavanoj zgradi sa dva lifta . Odlicno pozicioniran Savršena veze za sve delove grada Odličan...',
					price: 12980550,
					area: 80
				},
				{
					title: 'Savršen za Sve Namene u Centru sa Parkingom',
					imgSrc: 'https://nekretnineslike.blob.core.windows.net/profile/5cb23b394914907f102bc00b.png.thumbnail',
					createdAt: new Date(),
					tags: ['Četvorosoban stan', 'Prodaja'],
					address: 'Takovska, Centar',
					city: 'Beograd',
					shortDescription: 'PROSTRAN SVETAO SAVRŠEN STAN U CENTRU - PREPORUKA ! Prelep četvorosoban, održavan porodični stan u zgradi kakve više ne prave, sa dva stana na spratu,...',
					price: 25371075,
					area: 110
				},
				{
					title: 'Lux Stan u Lux Zgradi na Savršenoj Lokaciji na Neimaru Za Preporuku!',
					imgSrc: 'https://nekretnineslike.blob.core.windows.net/profile/5cb23b394914907f102bc00b.png.thumbnail',
					createdAt: new Date(),
					tags: ['Trosoban stan', 'Prodaja'],
					address: 'Hadži Milentijeva, Neimar',
					city: 'Beograd',
					shortDescription: 'Savršen, retko dobar dvoiposoban stan u vrlo kvalitetnij zgradi iz 2010.godine. sa pikovanom fasadom, mermernim ulazom, gde se nije stedelo na izolaci...',
					price: 20060850,
					area: 68
				},
				{
					title: 'Izuzetan Porodični na Prvom spratu sa Pogledom na Park Uknjižen Odmah Useljiv',
					imgSrc: 'https://nekretnineslike.blob.core.windows.net/profile/5cb23b394914907f102bc00b.png.thumbnail',
					createdAt: new Date(),
					tags: ['Trosoban stan', 'Prodaja'],
					address: 'Rudo, Zvezdara',
					city: 'Beograd',
					shortDescription: 'Savršen, retko dobar dvoiposoban stan u vrlo kvalitetnij zgradi iz 2010.godine. sa pikovanom fasadom, mermernim ulazom, gde se nije stedelo na izolaci...',
					price: 10502445,
					area: 92
				},
				{
					title: 'Retko Dobar u Centru u Mirnoj Ulici sa Drvoredom Uknjižen Odmah Useljiv',
					imgSrc: 'https://nekretnineslike.blob.core.windows.net/profile/5cb23b394914907f102bc00b.png.thumbnail',
					createdAt: new Date(),
					tags: ['Trosoban stan', 'Prodaja'],
					address: 'Đušina, Tašmajdan',
					city: 'Beograd',
					shortDescription: 'Izuzetan trosoban porodični stan na Konjarniku kod Aviv Parka, savršeno pozicioniran, funkcionalan, odličnog rasporeda, idealan za porodicu sa malom d...',
					price: 21004890,
					area: 94
				}
			]
		}
	}
}
</script>

<style>
.search-box-card {
	margin-bottom: 10px;
}
</style>
