/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */

// Create a variable to track the state of the lightbox.
let isLightboxOpen = false;

// Function to open the lightbox
function openLightbox() {
	const medias = document.querySelectorAll(".media-item");
	let currentIndex = 0;

	// Function to display a media
	function displayMedia(index) {

		const medias = document.querySelectorAll(".media-item");
		medias.forEach(media => {
			media.setAttribute("tabIndex", -1);
			media.setAttribute("aria-hidden", "true");
		});

		const likes = document.querySelectorAll(".likes-icon");
		likes.forEach(like => {
			like.setAttribute("tabIndex", -1);
			like.setAttribute("aria-hidden", "true");
		});

		const lightboxContainer = document.querySelector(".lightbox-media-container");
		lightboxContainer.innerHTML = "";

		const currentMedia = medias[index];
		console.log(currentMedia);
		// Update lightbox's title
		const title = currentMedia.parentNode.parentNode.childNodes[1].childNodes[0].outerText;
		const titleLocation = document.querySelector(".lightbox-text");
		titleLocation.innerText = title;

		if (currentMedia.classList.contains("img-item")) {
			displayImage(currentMedia.src);
		} else if (currentMedia.classList.contains("video-item")) {
			displayVideo(currentMedia.src);
		}
	}

	// Function to change the displayed media
	function changeMedia(direction) {
		// Check if lightbox is open
		if (isLightboxOpen) {
			currentIndex = (currentIndex + (direction === "next" ? 1 : -1) + medias.length) % medias.length;
			displayMedia(currentIndex);
		}
	}

	// Function to display an image in the lightbox
	function displayImage(src) {
		const lightboxMedia = createMediaElement("img", src);
		lightboxMedia.alt = "Image selectionnee affichee en grand";
		lightboxMedia.setAttribute("aria-label", "Image selectionnee affichee en grand");
		lightboxMedia.className = "lightbox-media";
		displayInLightbox(lightboxMedia);
	}

	// Function to display a video in the lightbox
	function displayVideo(src) {
		const lightboxMedia = createMediaElement("video", src);
		lightboxMedia.alt = "Video selectionnee affichee en grand";
		lightboxMedia.setAttribute("aria-label", "Video selectionnee affichee en grand");
		lightboxMedia.className = "lightbox-media";
		lightboxMedia.controls = true;
		displayInLightbox(lightboxMedia);
	}

	// Function to create a media element
	function createMediaElement(tagName, src) {
		const media = document.createElement(tagName);
		media.src = src;
		return media;
	}

	// Function to display the media in the lightbox
	function displayInLightbox(mediaElement) {
		const lightbox = document.getElementById("lightbox");
		const lightboxContainer = document.querySelector(".lightbox-media-container");
		lightboxContainer.innerHTML = "";
		lightboxContainer.appendChild(mediaElement);
		lightbox.style.display = "block";
	}

	// Event handlers for arrows
	document.getElementById("next-arrow").addEventListener("click", () => changeMedia("next"));
	document.getElementById("previous-arrow").addEventListener("click", () => changeMedia("previous"));

	// Add event listener for keyboard arrow keys
	document.addEventListener("keydown", function (event) {
		if (event.key === "ArrowLeft") {
			changeMedia("previous"); // Previous media on left arrow key press
		} else if (event.key === "ArrowRight") {
			changeMedia("next"); // Next media on right arrow key press
		}
	});

	// Event handler for closing the lightbox
	document.getElementById("close-lightbox").addEventListener("click", () => {
		closeLightbox();
	});

	document.getElementById("close-lightbox").addEventListener("keydown", (event) => {
		if (event.key === "Enter") {
			closeLightbox();
		}
	});

	function closeLightbox() {
		const medias = document.querySelectorAll(".media-item");
		medias.forEach(media => {
			media.setAttribute("tabIndex", 0);
			media.setAttribute("aria-hidden", "false");
		});

		const likes = document.querySelectorAll(".likes-icon");
		likes.forEach(like => {
			like.setAttribute("tabIndex", 0);
			like.setAttribute("aria-hidden", "false");
		});

		const lightbox = document.getElementById("lightbox");
		lightbox.style.display = "none";
		document.querySelector(".lightbox-media-container").innerHTML = "";

		// update lightbox state
		isLightboxOpen = false;
	}


	document.getElementById("close-lightbox").addEventListener("keydown", () => {
		const lightbox = document.getElementById("lightbox");
		lightbox.style.display = "none";
		document.querySelector(".lightbox-media-container").innerHTML = "";

		// update lightbox state
		isLightboxOpen = false;
	});

	// Event handlers for media items
	function addClickEventToMedias() {
		const medias = document.querySelectorAll(".media-item");
		let currentIndex = 0;

		medias.forEach((currentMedia, i) => {
			currentMedia.addEventListener("click", () => {
				currentIndex = i;
				displayMedia(currentIndex);

				// Update lightbox state when open
				isLightboxOpen = true;

				document.getElementById("lightbox").style.display = "block";
			});

			// Ajouter un gestionnaire d'événements pour la touche "Enter"
			currentMedia.addEventListener("keydown", (event) => {
				if (event.key === "Enter") {
					currentIndex = i;
					displayMedia(currentIndex);

					// Update lightbox state when open
					isLightboxOpen = true;

					document.getElementById("lightbox").style.display = "block";
				}
			});
		});
	}
	addClickEventToMedias();
}
