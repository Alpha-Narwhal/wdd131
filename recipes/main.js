import recipes from './recipes.mjs';

function random(num) {
	return Math.floor(Math.random() * num);
}

function getRandomListEntry(list) {
	const listLength = list.length;
	const randomNum = random(listLength);
	return list[randomNum];
}

function tagsTemplate(tags) {
	let html = '<ul class="recipe__tags">';
	for (let tag of tags) {
		html += `<li>${tag}</li>`;
	}
	html += '</ul>';
	return html;
}

function ratingTemplate(rating) {
	let html = `<span
	class="rating"
	role="img"
	aria-label="Rating: ${rating} out of 5 stars"
>`;
	for (let i = 1; i <= 5; i++) {
		if (i <= Math.floor(rating)) {
			html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
		} else {
			html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
		}
	}
	html += `</span>`;
	return html;
}

function recipeTemplate(recipe) {
	return `<section class="recipe">
	<img src="${recipe.image}" alt="${recipe.name}" class="recipe-img" />
	<p class="recipe-tags">
		${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
	</p>
	<h2 class="recipe-title">${recipe.name}</h2>
	${ratingTemplate(recipe.rating)}
	<p class="recipe-description">${recipe.description}</p>
</section>`;
}

function renderRecipes(recipeList) {
	const outputElement = document.querySelector('main');
	const recipeHTML = recipeList.map(recipeTemplate).join('');
	outputElement.innerHTML = recipeHTML;
}

function filterRecipes(query) {
	const filtered = recipes.filter(recipe => {
		query = query.toLowerCase();

		// Check name
		const inName = recipe.name.toLowerCase().includes(query);

		// Check description
		const inDescription = recipe.description.toLowerCase().includes(query);

		// Check tags array
		const inTags = recipe.tags.find(tag => tag.toLowerCase().includes(query));

		// Check ingredients array
		const inIngredients = recipe.recipeIngredient.find(ingredient => ingredient.toLowerCase().includes(query));

		return inName || inDescription || inTags || inIngredients;
	});

	// Sort filtered by name alphabetically
	filtered.sort((a, b) => a.name.localeCompare(b.name));

	return filtered;
}

function searchHandler(e) {
	e.preventDefault();
	const input = document.querySelector('input[name="search"]');
	const query = input.value.trim().toLowerCase();

	const filteredRecipes = filterRecipes(query);

	renderRecipes(filteredRecipes);
}

function init() {
	const recipe = getRandomListEntry(recipes);
	renderRecipes([recipe]);

	// Attach event listener to the search button
	const searchForm = document.querySelector('.search-form');
	searchForm.addEventListener('submit', searchHandler);
}

init();
