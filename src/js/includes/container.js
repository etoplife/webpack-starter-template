const containerWidth = 1170;

const setContainerPaddings = (el) => {
  const padding = (document.body.clientWidth - containerWidth) / 2;
  const rect = el.getBoundingClientRect();

  if (rect.left < padding) {
    el.style.paddingLeft = `${padding}px`;
  }

  if (rect.right > (containerWidth + padding)) {
    el.style.paddingRight = `${padding}px`;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const containerEls = [...document.querySelectorAll('.js-container')];

  containerEls.forEach((el) => setContainerPaddings(el));
});

export default containerWidth;
