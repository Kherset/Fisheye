// Build header for photographer page
async function photographerHeader() {
  const photographer = await getPhotographerById(id) //
  const photographerName = document.querySelector('.photographer-name')
  const photographerLocation = document.querySelector('.photographer-location')
  const photographerDescription = document.querySelector('.photographer-description')
  const photographerPhoto = document.querySelector('.photographer-photo')

  photographerName.textContent = `${photographer.name}`;
  photographerLocation.textContent = `${photographer.city}, ${photographer.country}`;
  photographerDescription.textContent = `${photographer.tagline}`;
  photographerPhoto.setAttribute('src', `assets/medias/IDPhotos/${photographer.portrait}`)
}


async function createMedia() {
  const medias = await getMediasByPhotographerId(id);
  const mediasContainer = document.getElementById('medias-container');

  for (let i = 0; i < medias.length; i++) {
    const media = medias[i];

    // Create media element
    const article = document.createElement('article');
    article.className = 'medias-item';

    // Create image container
    const imageContainer = document.createElement('div');
    imageContainer.className = 'img-container';

    // Create item content
    const itemContent = document.createElement('div');
    itemContent.className = 'item-content';

    // Create title element
    const mediaTitle = document.createElement('h4');
    mediaTitle.className = 'item-title';
    mediaTitle.textContent = media.title;

    // Create likes container
    const likesContainer = document.createElement('div');
    likesContainer.className = 'likes';

    // Create number of like element
    const likesElement = document.createElement('div');
    likesElement.className = 'likes';

    // Create number of like element
    const mediaNumber = document.createElement('p');
    mediaNumber.className = 'likes-number';
    mediaNumber.textContent = media.likes;

    // Create item icon
    const likesIcon = document.createElement('i');
    likesIcon.className = 'fa-solid fa-heart likes-icon';

    // Create media element and append it to the image container
    const mediaElement = createMediaElement(media);
    if (mediaElement) {
      imageContainer.appendChild(mediaElement);
    }

    // Building page
    mediasContainer.appendChild(article);
    article.appendChild(imageContainer);
    article.appendChild(itemContent);
    itemContent.appendChild(mediaTitle);
    itemContent.appendChild(likesElement);
    likesElement.appendChild(mediaNumber);
    likesElement.appendChild(likesIcon);
  }

  function createMediaElement(media) {
    if (media.image && (media.image.endsWith('.jpg') || media.image.endsWith('.jpeg') || media.image.endsWith('.png'))) {
        const image = document.createElement('img');
        image.src = `assets/medias/${media.photographerId}/${media.image}`;
        image.className = 'media-item img-item';
        return image;
    } else if (media.video && media.video.endsWith('.mp4')) {
        const video = document.createElement('video');
        video.src = `assets/medias/${media.photographerId}/${media.video}`;
        video.className = 'media-item video-item';
        return video;
    } else {
      return null;
    }
  }
  openLightbox()
  addOrRemoveLike()
}


function addOrRemoveLike() {
  const likeButtons = document.querySelectorAll('.likes-icon');

  likeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Find the likes counter associated with this button
      const likeCount = button.parentElement.querySelector('.likes-number');

      // Get the current number of likes from the counter
      let currentLikes = parseInt(likeCount.textContent);

      // Check if the button has the "liked" class to determine if the user has already liked
      if (button.classList.contains('liked')) {
        // Decrease the number of likes if the user has already liked
        currentLikes--;
        button.classList.remove('liked');
      } else {
        // Increase the number of likes if the user hasn't liked yet
        currentLikes++;
        button.classList.add('liked');
      }
      // Update the likes counter with the new value
      likeCount.textContent = currentLikes.toString();

      // Call the function to update likesSum
      updateLikesSum();
    });
  });
}

// Create a function to update likesSum
function updateLikesSum() {
  const likesElements = document.querySelectorAll('.likes-number');
  let totalLikes = 0;

  // Iterate through all the likes-number elements and add their values to totalLikes
  likesElements.forEach((likesElement) => {
  totalLikes += parseInt(likesElement.textContent);
  });

  // Update the text of likesSum with the new total value
  const likesSum = document.querySelector('.likes-sum');
  likesSum.textContent = totalLikes.toString();
}


async function calculateTotalLikes() {
  await createMedia()
  let sumLikes = 0;
  const likes = document.querySelectorAll('.likes-number')
  for (let i = 0; i < likes.length; i++) {
    const like = likes[i];
    sumLikes += parseInt(like.innerText)
  }
  return sumLikes
}

async function priceOfThePhotographer() {
  const photographer = await getPhotographerById(id)
  return photographer.price
}


async function likesAndPriceCard() {
  // Calculate sum of medias' likes.
    const likes = await calculateTotalLikes()
    const likesSum = document.querySelector('.likes-sum')
    likesSum.textContent =  `${likes}`

  // Display the photographer's price.
    const price = await priceOfThePhotographer()
    const priceTag = document.querySelector('.price-tag')
    priceTag.textContent = `${price}€ / jour`
}
