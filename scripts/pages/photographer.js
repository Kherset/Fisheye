// Allows to retrieve the photographer's ID.
    let params = new URL(document.location).searchParams;
    let id = parseInt(params.get("id"));

/**************************************** Photographers ****************************************/
  // Allows to retrieve all photographers from the JSON file.
      async function getPhotographers() {
        try {
            const response = await fetch('data/photographers.json');
            if (!response.ok) {
                throw new Error('Unable to retrieve photographer data.');
            }
            const data = await response.json();
            return data.photographers;
        } catch (error) {
            console.error(error);
            return [];
        }
      }

  // Allows to retrieve a photographer from his ID.
      async function getPhotographersById(id) {
          const photographers = await getPhotographers();

          const photographer = photographers.find(function (photographer) {
            return photographer.id === id;
          });

          if (photographer) {
            // console.log("Photographer found :", photographer);
            return photographer;
          } else {
            console.log("No photographer found with the ID", id);
            return null;
          }
      }

  async function displayPhotographer() {
    const photographer = await getPhotographersById(id) // Photographer object retrieved.
    photographerHeader(photographer)
  }

/**************************************** Medias ****************************************/
  // Allows to retrieve all photographers from the JSON file.
      async function getMedias() {
        try {
            const response = await fetch('data/photographers.json');
            if (!response.ok) {
                throw new Error('Unable to retrieve medias data.');
            }
            const data = await response.json();
            return data.media;
        } catch (error) {
            console.error(error);
            return [];
        }
      }

  // Allows the use of the photographer's ID to retrieve the associated media.
      async function getMediasByPhotographerId(id) {
        const medias = await getMedias();
        return medias.filter(media => media.photographerId === id);
      }

getMediasByPhotographerId(id)

async function displayMedias() {
  const medias = await getMediasByPhotographerId(id) // Photographer object retrieved.
  medias.forEach(media => {
    createMedias(media)
  });
  AddOrRemoveLike()
  openLightbox()
}

async function displayRedCard() {
  const photographer = await getPhotographersById(id)
  const medias = await getMedias();
  redCard(photographer, medias)
}


// Créez une fonction pour mettre à jour likesSum
function updateLikesSum() {
  // Sélectionnez tous les éléments likes-number
  const likesElements = document.querySelectorAll('.likes-number');

  // Initialisez la somme des likes à 0
  let totalLikes = 0;

  // Parcourez tous les éléments likes-number et ajoutez leurs valeurs à totalLikes
  likesElements.forEach((likesElement) => {
    totalLikes += parseInt(likesElement.textContent);
  });

  // Mettez à jour le texte de likesSum avec la nouvelle valeur totale
  const likesSum = document.querySelector('.likes-sum');
  likesSum.textContent = totalLikes.toString();
}



function buildPage() {
  displayPhotographer();
  displayMedias();
  displayRedCard();
}

buildPage()
