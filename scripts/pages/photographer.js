// Globals variables
let jsonData = null;
const id = getIdFromUrl(); // variables to retrieve ID from URL


// The functions facilitating data retrieval.


  // Allows to retrieve photographers' ID.
      function getIdFromUrl() {
        const params = new URL(document.location).searchParams;
        const id = parseInt(params.get('id'));
        return id;
      }

async function fetchData() {
  try {
      const response = await fetch('data/photographers.json');
      if (!response.ok) {
          throw new Error('Impossible de recuperer les donnees.');
      }
      jsonData = await response.json();
  } catch (error) {
      console.error(error);
      jsonData = null;
  }
}

      /**************************************** Photographers ****************************************/
  // Allows to retrieve all photographers from the JSON file.
  async function getPhotographers() {
    if (jsonData === null) {
        await fetchData();
    }

    if (jsonData) {
        return jsonData.photographers;
    } else {
        return [];
    }
}

  // Retrieve the photographer based on the ID.
      async function getPhotographerById(id) {
        try {
          const photographers = await getPhotographers();
          const photographer = photographers.find(photographer => photographer.id === id);
          return photographer;
        } catch (error) {
          console.error("Photographe introuvable");
          return null; // Null if error
        }
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




function buildPhotographerPage() {
  photographerHeader()
  likesAndPriceCard()
}

buildPhotographerPage()
