// Get references to HTML elements for the lightbox functionality.
const lightbox = document.getElementById('lightbox');
const lightboxContainer = document.querySelector('.lightbox-media-container');
const nextArrow = document.getElementById('next-arrow');
const previousArrow = document.getElementById('previous-arrow');
let currentIndex = 0; // Initialize the index of the currently displayed media.
let lightboxMedia; // Variable to store the currently displayed media element.

// Open lightbox
async function openLightbox() {
  const medias = document.querySelectorAll('.media-item'); // Get all media items.
  currentIndex = 0; // Initialize the index to 0.

  // Add click event listeners to each media item.
    for (let i = 0; i < medias.length; i++) {
      let currentMedia = medias[i];

      currentMedia.addEventListener('click', () => {
        currentIndex = i; // Update the current index.
        displayMedia(currentIndex); // Display the selected media.
        lightbox.style.display = 'block'; // Show the lightbox.
      });
    }

  // Add click event listeners to the next and previous navigation arrows.
    nextArrow.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % medias.length; // Move to the next media.
      displayMedia(currentIndex); // Display the new media.
    });

    previousArrow.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + medias.length) % medias.length; // Move to the previous media.
      displayMedia(currentIndex); // Display the new media.
    });

  function displayMedia(index) {
    // Clear the previous content of the lightbox.
    lightboxContainer.innerHTML = '';

    const currentMedia = medias[index];
    if (currentMedia.classList.contains('img-item')) {
      // If it's an image, create an image element and display it.
      lightboxMedia = document.createElement('img');
      lightboxMedia.src = currentMedia.src;
      lightboxMedia.setAttribute('alt', 'Image');
      lightboxMedia.className = 'lightbox-media';
      lightboxContainer.appendChild(lightboxMedia);
    } else if (currentMedia.classList.contains('video-item')) {
      // If it's a video, create a video element and display it.
      lightboxMedia = document.createElement('video');
      lightboxMedia.src = currentMedia.src;
      lightboxMedia.setAttribute('alt', 'Video');
      lightboxMedia.className = 'lightbox-media';
      lightboxMedia.controls = true; // Enable video controls.
      lightboxContainer.appendChild(lightboxMedia);
    }
  }
}

// Close lightbox
const close = document.getElementById('close-lightbox');
close.addEventListener('click', function () {
  lightbox.style.display = 'none'; // Hide the lightbox.
  lightboxContainer.innerHTML = ''; // Clear the content of the lightbox when closing.
});
