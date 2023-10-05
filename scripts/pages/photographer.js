/* eslint-disable no-undef */
// Globals variables
let jsonData = null;
const id = getIdFromUrl();

// Function to retrieve ID from URL
function getIdFromUrl() {
	const params = new URL(document.location).searchParams;
	const id = parseInt(params.get("id"));
	return id;
}

// Function to fetch data
async function fetchData() {
	try {
		const response = await fetch("data/photographers.json");
		if (!response.ok) {
			throw new Error("Unable to retrieve data.");
		}
		jsonData = await response.json();
	} catch (error) {
		console.error(error);
		jsonData = null;
	}
}

// Function to retrieve photographers
async function getPhotographers() {
	if (jsonData === null) {
		await fetchData();
	}

	return jsonData ? jsonData.photographers : [];
}

// Function to retrieve a photographer by ID
async function getPhotographerById(id) {
	try {
		const photographers = await getPhotographers();
		return photographers.find(photographer => photographer.id === id) || null;
	} catch (error) {
		console.error("Photographer not found");
		return null;
	}
}

/**************************************** Medias ****************************************/

// Function to retrieve medias
async function getMedias() {
	try {
		const response = await fetch("data/photographers.json");
		if (!response.ok) {
			throw new Error("Unable to retrieve media data.");
		}
		const data = await response.json();
		return data.media || [];
	} catch (error) {
		console.error(error);
		return [];
	}
}

// Function to retrieve medias by photographer ID
// eslint-disable-next-line no-unused-vars
async function getMediasByPhotographerId(id) {
	const medias = await getMedias();
	return medias.filter(media => media.photographerId === id);
}

// Function to build photographer page
async function buildPhotographerPage() {
	const photographer = await getPhotographerById(id);
	if (photographer) {
		// eslint-disable-next-line no-undef
		photographerHeader(photographer);
		// eslint-disable-next-line no-undef
		createMedia(photographer);
	} else {
		console.error("Photographer not found");
	}
}

// eslint-disable-next-line no-redeclare
function buildPhotographerPage() {
	photographerHeader();
	likesAndPriceCard();
	headerModal();
}

buildPhotographerPage();
