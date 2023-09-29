// Open lightbox
const lightbox = document.getElementById('lightbox')

async function openLightbox() {
  const medias = document.querySelectorAll('.media-item')
  const lightboxMedia = document.querySelector('.lightbox-media')
  medias.forEach(media => {
    media.addEventListener('click', () => {

    lightbox.style.display = 'block';
    lightboxMedia.src = media.src
    console.log(lightboxMedia.src)
    console.log(media.src)
    })
  });
  // console.log(medias)
}

// Close lightbox
const close = document.getElementById('close-lightbox')
close.addEventListener('click', function() {
  console.log('Coucou')
  lightbox.style.display = 'none'
})
