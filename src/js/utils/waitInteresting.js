import throttle from 'lodash.throttle';

const isInteresting = (el, offset) => {
  const targetPosition = {
    top: window.pageYOffset + el.getBoundingClientRect().top,
    left: window.pageXOffset + el.getBoundingClientRect().left,
    right: window.pageXOffset + el.getBoundingClientRect().right,
    bottom: window.pageYOffset + el.getBoundingClientRect().bottom,
  };

  const windowPosition = {
    top: window.pageYOffset,
    left: window.pageXOffset,
    right: window.pageXOffset + document.documentElement.clientWidth,
    bottom: window.pageYOffset + document.documentElement.clientHeight,
  };

  return targetPosition.bottom + offset > windowPosition.top
    && targetPosition.top - offset < windowPosition.bottom;
};

const waitInteresting = (el, offset = 500) => new Promise((resolve) => {
  const checkIsInteresting = () => isInteresting(el, offset) && resolve(el);
  window.addEventListener('scroll', throttle(checkIsInteresting, 200));
  checkIsInteresting();
});

export default waitInteresting;
