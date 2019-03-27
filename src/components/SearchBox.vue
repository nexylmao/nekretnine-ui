<template>
	<b-form inline class="justify-content-center search-box">
		<b-form-group id="idInputGroup" label="Identifikacioni broj:">
			<b-form-input id="idInput" type="text" required></b-form-input>
		</b-form-group>
		&nbsp;&nbsp;&nbsp;
		<b-form-group id="locationInputGroup" label="Lokacija:">
			<b-form-input id="locationInput" type="text" required></b-form-input>
		</b-form-group>
		&nbsp;&nbsp;&nbsp;
		<b-form-group id="priceInputGroup" label="Cena:">
			<b-form-input id="priceMinInput" type="number" required placeholder="Od"></b-form-input>
			&nbsp;&nbsp;&nbsp;
			<b-form-input id="priceMaxInput" type="number" required placeholder="Do"></b-form-input>
		</b-form-group>
		&nbsp;&nbsp;&nbsp;
		<b-button type="submit" variant="light">Traži</b-button>
	</b-form>
</template>
