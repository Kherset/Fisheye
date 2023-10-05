// eslint-disable-next-line no-unused-vars
function homepageTemplate(data) {
	// Destructure data object for easier access
	const { name, portrait, city, country, tagline, price } = data;

	// Construct the path to the photographer's portrait image
	const picture = `assets/medias/IDPhotos/${portrait}`;

	// Function to create and return a DOM element for the photographer's card
	function getUserCardDOM() {
		// Create a new <article> element for the photographer's card
		const article = document.createElement("article");
		article.setAttribute("aria-label", `Photographer's card for ${name}`);

		// Create an <img> element for the photographer's portrait
		const img = document.createElement("img");
		img.setAttribute("src", picture);
		img.setAttribute("alt", `Photographer ${name}'s photo`);

		// Create a <div> to hold photographer's identity information
		const photographer = document.createElement("div");
		photographer.className = "photographer_identity";

		// Create <h2>, <h3>, <p>, and <p> elements to display photographer's details
		const h2 = document.createElement("h2");
		const h3 = document.createElement("h3");
		const p = document.createElement("p");
		const p2 = document.createElement("p");
		p2.className = "price";

		// Populate the elements with photographer's information
		h2.textContent = name;
		h3.textContent = `${city}, ${country} `;
		p.textContent = tagline;
		p2.textContent = `${price}Є/day`;

		// Create a link to the photographer's dedicated page
		const linkPhotographer = document.createElement("a");
		linkPhotographer.setAttribute("href", `photographer.html?id=${data.id}`);

		// Append elements to the DOM hierarchy
		linkPhotographer.appendChild(photographer);
		photographer.appendChild(img);
		photographer.appendChild(h2);

		// Create a <div> to hold additional photographer's information
		const infoPhotographer = document.createElement("div");
		infoPhotographer.className = "info_photographer";
		infoPhotographer.appendChild(h3);
		infoPhotographer.appendChild(p);
		infoPhotographer.appendChild(p2);

		// Append elements to the article and return the whole card
		article.appendChild(linkPhotographer);
		article.appendChild(infoPhotographer);

		return article;
	}

	// Return relevant data and the function to generate the photographer's card
	return { name, picture, getUserCardDOM };
}
