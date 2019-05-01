<template>
  <div>
    <b-card class="search-box-card">
      <SearchBox/>
    </b-card>
    <b-row>
      <b-col cols=8 md=12>
        <SearchResultCard v-for="searchResult in searchResults" :key="searchResult.id" :data="searchResult"/>
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
	mounted: function () {
		fetch(this.$SERVER_PATH + '/realEstate/', {
			mode: 'cors',
			headers: {
				'content-type': 'application/json'
			},
			credentials: 'include'
		})
			.then(response => response.json())
			.then(json => {
				this.searchResults = json
			})
			.catch(err => {
				console.log(err)
			})
	},
	data () {
		return {
			searchResults: []
		}
	}
}
</script>

<style>
  .search-box-card {
    margin-bottom: 10px;
  }
</style>
