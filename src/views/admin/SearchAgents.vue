<template>
	<div>
		<b-jumbotron class="agents-search-box" id="landing-jumbotron">
			<AgentSearchBox @result="showResults" :admin="!!me.account.role"/>
		</b-jumbotron>
		<b-container>
			<b-row>
				<b-col class="mx-auto" xl=8>
					<AgentSearchResultCard v-for="searchResult in searchResults" :key="searchResult.id" :data="searchResult"/>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
import AgentSearchBox from '@/components/AgentSearchBox'
import AgentSearchResultCard from '@/components/AgentSearchResultCard'

export default {
	name: 'SearchResults',
	props: ['me'],
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
	padding: 
}
.search-box {
	text-align: left;
}
</style>
