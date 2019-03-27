<template>
	<div class="home">
		<b-jumbotron header="Nekretnine" lead="Przo, lako, jeftino, dodjite do nekretnina. Sve na jednom mestu!" bg-variant="secondary" text-variant="white" border-variant="dark" id="landing-jumbotron">
			<SearchBox/>
		</b-jumbotron>
	</div>
</template>

<script>
import SearchBox from '@/components/SearchBox'

export default {
	name: 'home',
	components: {
		SearchBox
	}
}
</script>

<style>
#landing-jumbotron {
	text-align: center;
}
.search-box {
	text-align: left;
}
</style>
