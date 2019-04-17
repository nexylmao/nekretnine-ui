<template lang="pug">
	div
		b-row
			b-col(xl=3 lg=3 md=12)
				b-img(thumbnail fluid :src="profileInfo.profilePhoto" class="w-100")
				h2 {{ profileInfo.firstName}} {{ profileInfo.lastName }}
				h4 {{ profileInfo.username }}
				p {{ profileInfo.profileDescription }}
				br
				FontAwesomeIcon(icon="map-marker-alt")
				label &nbsp;&nbsp;{{ profileInfo.location }}
				br
				FontAwesomeIcon(icon="envelope")
				label &nbsp;&nbsp;{{ profileInfo.email}}

				b-button(variant="primary" class="w-100") Edit
			b-col
				SearchResultCard(small v-for="_ in [1, 2, 3, 4, 5]" :key="_")
</template>

<script>
import SearchResultCard from '@/components/SearchResultCard'

export default {
	name: 'Profile',
	components: {
		SearchResultCard
	},
	data () {
		return {
			profileInfo: {
				profilePhoto: 'https://nekretnineslike.blob.core.windows.net/profile/5cb23b394914907f102bc00b.png.thumbnail',
				firstName: 'Dušan',
				lastName: 'Simić',
				username: 'dusansimic',
				email: 'simic.dusan@jjzmaj.edu.rs',
				profileDescription: 'Ovo je opis profila. Tu ce agenti moci da napisu sta zele o njima i to ce moci da vide svi korisnici ovog sajta.',
				location: 'Novi Sad, Serbia'
			}
		}
	}
}
</script>
