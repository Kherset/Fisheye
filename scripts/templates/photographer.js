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
            return image;
        } else if (data.video && data.video.endsWith('.mp4')) {
            const video = document.createElement('video');
            video.src = `assets/medias/${data.photographerId}/${data.video}`;
            video.controls = true;
            return video;
        }
    }
    // Si aucune image ni vidéo valide n'est trouvée, vous pouvez renvoyer null ou un élément de remplacement, par exemple un message d'erreur.
    return null;
};
 const mediaElement = imageOrVideo(data);
 mediaElement.className = "media-item"

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




function redCard(dataPhotographer, dataMedia) {
  // Calculate sum of medias' likes.
    let likes = 0;
    const mediasbyID = dataMedia.filter(media => media.photographerId === id)
    for (let i = 0; i < mediasbyID.length; i++) {
      likes += mediasbyID[i].likes;
    }
    const likesSum = document.querySelector('.likes-sum')
    likesSum.textContent = `${likes}`

  // Display the photographer's price.
    const price = dataPhotographer.price;
    const priceTag = document.querySelector('.price-tag')
    priceTag.textContent = `${price}€ / jour`
}

function AddOrRemoveLike() {
    // Sélectionnez tous les boutons "J'aime" sur la page
const likeButtons = document.querySelectorAll('.likes-icon');

// Ajoutez un gestionnaire d'événements à chaque bouton "J'aime"
likeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // Trouvez le compteur de likes associé à ce bouton
        console.log('Clique')
        const likeCount = button.parentElement.querySelector('.likes-number');

        // Obtenez le nombre actuel de likes depuis le compteur
        let currentLikes = parseInt(likeCount.textContent);

        // Vérifiez si le bouton a la classe "liked" pour déterminer si l'utilisateur a déjà aimé
        if (button.classList.contains('liked')) {
            // Diminue le nombre de likes si l'utilisateur a déjà aimé
            currentLikes--;
            button.classList.remove('liked');
        } else {
            // Augmente le nombre de likes si l'utilisateur n'a pas encore aimé
            currentLikes++;
            button.classList.add('liked');
        }

        // Mettez à jour le compteur de likes avec la nouvelle valeur
        likeCount.textContent = currentLikes;
    });
});

}
