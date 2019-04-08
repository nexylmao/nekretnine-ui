<template>
	<div>
		<b-card class="search-box-card">
			<SearchBox/>
		</b-card>
		<b-row>
			<b-col cols=8 md=12>
				<SearchResultCard v-for="_ in [1, 2, 3, 4, 5]" :key="_"/>
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
	}
}
</script>

<style>
.search-box-card {
	margin-bottom: 10px;
}
</style>
