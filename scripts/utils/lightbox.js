// Function to open the lightbox
function openLightbox() {
  const medias = document.querySelectorAll('.media-item');
  let currentIndex = 0;


  // Function to display a media
function displayMedia(index) {
  const lightboxContainer = document.querySelector('.lightbox-media-container');
  lightboxContainer.innerHTML = '';

  const currentMedia = medias[index];

  // Update lightbox's title
    const title = currentMedia.parentNode.parentNode.childNodes[1].childNodes[0].outerText
    const titleLocation = document.querySelector('.lightbox-text')
    titleLocation.innerText = title



  if (currentMedia.classList.contains('img-item')) {
    displayImage(currentMedia.src);
  } else if (currentMedia.classList.contains('video-item')) {
    displayVideo(currentMedia.src);
  }
}

  // Function to change the displayed media
  function changeMedia(direction) {
    currentIndex = (currentIndex + (direction === 'next' ? 1 : -1) + medias.length) % medias.length;
    displayMedia(currentIndex);
  }

  // Function to display an image in the lightbox
  function displayImage(src) {
    const lightboxMedia = createMediaElement('img', src);
    lightboxMedia.alt = 'Image selectionnee affichee en grand';
    lightboxMedia.setAttribute('aria-label', `Image selectionnee affichee en grand`)
    lightboxMedia.className = 'lightbox-media';
    displayInLightbox(lightboxMedia);
  }

  // Function to display a video in the lightbox
  function displayVideo(src) {
    const lightboxMedia = createMediaElement('video', src);
    lightboxMedia.alt = 'Video selectionnee affichee en grand';
    lightboxMedia.setAttribute('aria-label', `Video selectionnee affichee en grand`)
    lightboxMedia.className = 'lightbox-media';
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
    const lightbox = document.getElementById('lightbox');
    const lightboxContainer = document.querySelector('.lightbox-media-container');
    lightboxContainer.innerHTML = '';
    lightboxContainer.appendChild(mediaElement);
    lightbox.style.display = 'block';
  }

  // Event handlers for arrows
  document.getElementById('next-arrow').addEventListener('click', () => changeMedia('next'));
  document.getElementById('previous-arrow').addEventListener('click', () => changeMedia('previous'));

  // Event handler for closing the lightbox
  document.getElementById('close-lightbox').addEventListener('click', () => {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.querySelector('.lightbox-media-container').innerHTML = '';
  });

  // Event handlers for media items
  function addClickEventToMedias() {
    const medias = document.querySelectorAll('.media-item');
    let currentIndex = 0;
    let title =

    medias.forEach((currentMedia, i) => {
      currentMedia.addEventListener('click', () => {
        currentIndex = i;
        displayMedia(currentIndex);
        document.getElementById('lightbox').style.display = 'block';
      });
    });
  }
  addClickEventToMedias();
}
