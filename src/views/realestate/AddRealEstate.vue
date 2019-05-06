<template lang="pug">
	div
		b-row
			b-col
			b-col(xl=7 lg=7)
				p.
					Here enter info for the new real estate.
				b-form
					b-form-group(id="titleInputGroup" label="Title:" label-for="titleInput")
						b-form-input(id="titleInput" v-model="realEstateData.title" type="text" required)
					b-form-group(id="imagesInputGroup" label="Images:" label-for="imagesInput")
						b-form-input(id="imagesInput" v-model="realEstateData.images" type="file" multiple)
					b-form-group(id="priceInputGroup" label="Price:" label-for="priceInput")
						b-form-input(id="priceInput" v-model="realEstateData.price" type="number" required)
					b-form-group(id="areaInputGroup" label="Area:" label-for="areaInput")
						b-form-input(id="areaInput" v-model="realEstateData.area" type="number" required)
					b-form-group(id="addressInputGroup" label="Address:" label-for="addressInput")
						b-form-input(id="addressInput" v-model="realEstateData.title" type="text" required)
					b-form-group(id="cityInputGroup" label="City:" label-for="cityInput")
						b-form-input(id="cityInput" v-model="realEstateData.city" type="text" required)
					b-form-group(id="tagsInputGroup" label="Tags:" label-for="tagsInput")
						b-form-input(id="tagsInput" v-model="realEstateData.title" type="text" required placeholder="Uesite tagove razdvojene zarezima")
					b-form-group(id="descriptionInputGroup" label="Description:" label-for="descriptionInput")
						b-form-textarea(id="descriptionInput" v-model="realEstateData.description" type="text" required rows=3 max-rows=6)
					b-button(type="submit" variant="primary" class="w-25 float-right" @click="onAddButtonClick") Add
			b-col
</template>

<script>
export default {
	name: 'AddRealEstate',
	data () {
		return {
			realEstateData: {
				title: '',
				price: '',
				area: '',
				address: '',
				city: '',
				tags: '',
				description: '',
				images: null
			}
		}
	},
	methods: {
		onAddButtonClick () {
		}
	}
}
</script>
