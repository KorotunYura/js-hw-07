import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryList = document.querySelector('.gallery');

// {
//     preview:
//       'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
//     original:
//       'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
//     description: 'Hokkaido Flower',
//   }

function createMarkup(arr) {
  return arr
    .map(
      ({ preview, original, description }) => `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
    )
    .join('');
}

galleryList.insertAdjacentHTML('beforeend', createMarkup(galleryItems));

galleryList.addEventListener('click', handlerClick);

function handlerClick(evt) {
  evt.preventDefault();

  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }

  //   if (evt.target === evt.currentTarget) {
  //     return;
  //   }

  const { source } = evt.target.dataset;

  const galleryItem = galleryItems.find(({ original }) => original === source);

  const instance = basicLightbox.create(
    `<img src="${galleryItem.original}" >`,
    {
      closable: false,
      onShow: instance => {
        document.addEventListener('keydown', handlerKeydown);
      },
      onClose: instance => {
        document.removeEventListener('keydown', handlerKeydown);
      },
    }
  );
  instance.show();

  function handlerKeydown(evt) {
    console.log(evt.code);
    if (evt.code === 'Escape') {
      instance.close();
    }
  }
}
