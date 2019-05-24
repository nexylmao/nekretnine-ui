<template>
	<div>
		<b-jumbotron class="agents-search-box" id="landing-jumbotron">
			<ClientSearchBox :me="me" @result="showResults"/>
		</b-jumbotron>
		<b-row>
			<b-col class="mx-auto" xl=8>
				<ClientSearchResultCard v-for="searchResult in searchResults" :key="searchResult.id" :data="searchResult"/>
			</b-col>
		</b-row>
	</div>
</template>

<script>
import ClientSearchBox from '@/components/ClientSearchBox'
import ClientSearchResultCard from '@/components/ClientSearchResultCard'

export default {
	name: 'SearchResults',
	props: ['me'],
	components: {
		ClientSearchBox,
		ClientSearchResultCard
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
