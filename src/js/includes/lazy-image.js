const lazyImageClassName = 'lazy-image';
const lazyImageReadyClassName = 'lazy-image_ready';
const lazyNotReadySelector = `img.${lazyImageClassName}:not([src])`;

const fetchImage = (src) => {
  const img = new Image();

  // if relative path -> change it to absolute
  if (src[0] === '/') {
    const {protocol, hostname} = window.location;
    src = `${protocol}//${hostname}${src}`;
  }

  return new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;

    img.src = src;
  });
};

const loadLazyImage = (image, func) => {
  const img = image;

  return fetchImage(image.dataset.src).then(() => {
    img.src = image.dataset.src;
    img.classList.add(lazyImageReadyClassName);

    if (func) {
      func();
    }
  });
};

if (window.IntersectionObserver) {
  const imageObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        loadLazyImage(lazyImage).then(() => imgObserver.unobserve(lazyImage));
      }
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    const images = [...document.querySelectorAll(lazyNotReadySelector)];

    images.forEach(function (v) {
      imageObserver.observe(v);
    });
  });

} else {
  const images = [...document.querySelectorAll(lazyNotReadySelector)];

  images.forEach(function (image) {
    loadLazyImage(image);
  });
}

export {
  lazyNotReadySelector,
  lazyImageClassName,
  fetchImage,
  loadLazyImage,
};
