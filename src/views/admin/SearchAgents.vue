<template>
	<div>
		<b-jumbotron class="agents-search-box" id="landing-jumbotron">
			<AgentSearchBox @result="showResults"/>
		</b-jumbotron>
		<b-row>
			<b-col class="mx-auto" xl=8>
				<AgentSearchResultCard v-for="searchResult in searchResults" :key="searchResult.id" :data="searchResult"/>
			</b-col>
		</b-row>
	</div>
</template>

<script>
import AgentSearchBox from '@/components/AgentSearchBox'
import AgentSearchResultCard from '@/components/AgentSearchResultCard'

export default {
	name: 'SearchResults',
	components: {
		AgentSearchBox,
		AgentSearchResultCard
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
