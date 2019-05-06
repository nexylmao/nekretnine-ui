<template>
  <div>
    <b-jumbotron header="Nekretnine" lead="Brzo, lako, jeftino, dođite do nekretnina. Sve na jednom mestu!" bg-variant="secondary" text-variant="white" border-variant="dark" id="landing-jumbotron">
			<SearchBox v-on:result="showResults"/>
		</b-jumbotron>
    <b-row>
      <b-col class="mx-auto" xl=8>
        <SearchResultCard v-for="searchResult in searchResults" :key="searchResult.id" :data="searchResult"/>
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
			searchResults: []
		}
	},
	methods: {
		showResults (data) {
			this.searchResults = data
		}
	}
}
</script>

<style>
.search-box-card {
	margin-bottom: 10px;
}

#landing-jumbotron {
	text-align: center;
	padding-bottom: 2rem;
}
.search-box {
	text-align: left;
}
</style>
