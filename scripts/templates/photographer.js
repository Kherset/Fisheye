function photographerHeader(data) {
  const { name, portrait, city, country, tagline,} = data;
  const picture = `assets/medias/IDPhotos/${portrait}`;

  const photographerName = document.querySelector('.photographer-name')
  const photographerLocation = document.querySelector('.photographer-location')
  const photographerDescription = document.querySelector('.photographer-description')
  const photographerPhoto = document.querySelector('.photographer-photo')

  photographerName.textContent = `${name}`;
  photographerLocation.textContent = `${city}, ${country}`;
  photographerDescription.textContent = `${tagline}`;
  photographerPhoto.setAttribute('src', `${picture}`)
}


function createMedias(data) {
  const { id, photographerId, title, image, video, likes, date, price} = data;
  const imageMedia = `assets/medias/${photographerId}/${image}`;
  const videoMedia = `assets/medias/${photographerId}/${video}`;
  const mediasContainer = document.getElementById('medias-container');

  // Create media element
  const article = document.createElement('article')
  article.className ='medias-item'

  // Create image container
  const imageContainer = document.createElement('div')
  imageContainer.className ='img-container'

  // Create image or video element
  const imageOrVideo = (data) => {
    if (data && (data.image || data.video)) {
        if (data.image && (data.image.endsWith('.jpg') || data.image.endsWith('.jpeg') || data.image.endsWith('.png'))) {
            const image = document.createElement('img');
            image.src = `assets/medias/${data.photographerId}/${data.image}`;
            image.className = 'media-item img-item';
            return image;
        } else if (data.video && data.video.endsWith('.mp4')) {
            const video = document.createElement('video');
            video.src = `assets/medias/${data.photographerId}/${data.video}`;
            video.className = 'media-item video-item';
            // video.controls = true;
            return video;
        }
    }
    return null;
};
 const mediaElement = imageOrVideo(data);

   // Create item content
   const itemContent = document.createElement('div')
   itemContent.className ='item-content'

  // Create title element
  const mediaTitle = document.createElement('h4');
  mediaTitle.className ='item-title'
  mediaTitle.textContent = title;

  // Create item content
  const likesContainer = document.createElement('div')
  likesContainer.className ='likes'

  // Create number of like element
  const likesElement = document.createElement('div');
  likesElement.className ='likes'

  // Create number of like element
  const mediaNumber = document.createElement('p');
  mediaNumber.className ='likes-number'
  mediaNumber.textContent = likes;

  // Create item icon
  const likesIcon = document.createElement('i')
  likesIcon.className ='fa-solid fa-heart likes-icon'

  // Building page
    mediasContainer.appendChild(article)
    article.appendChild(imageContainer)
    imageContainer.appendChild(mediaElement)
    article.appendChild(itemContent)
    itemContent.appendChild(mediaTitle)
    itemContent.appendChild(likesElement)
    likesElement.appendChild(mediaNumber)
    likesElement.appendChild(likesIcon)
}


function AddOrRemoveLike() {
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

function updateLikesSum() {
  const likesElements = document.querySelectorAll('.likes-number');
  let totalLikes = 0;

  likesElements.forEach((likesElement) => {
    totalLikes += parseInt(likesElement.textContent);
  });

  const likesSum = document.querySelector('.likes-sum');
  likesSum.textContent = totalLikes.toString();
}

async function redCard(dataPhotographer, dataMedia) {
  // Calculate sum of medias' likes.
    let likes = 0;
    const mediasbyID = dataMedia.filter(media => media.photographerId === id)
    for (let i = 0; i < mediasbyID.length; i++) {
      likes += mediasbyID[i].likes;
    }
    const likesSum = document.querySelector('.likes-sum')
    likesSum.textContent =  `${likes}`

  // Display the photographer's price.
    const price = dataPhotographer.price;
    const priceTag = document.querySelector('.price-tag')
    priceTag.textContent = `${price}€ / jour`
}
