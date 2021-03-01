const getScrollbarWidth = () => {
  const documentWidth = document.documentElement.clientWidth;
  const windowsWidth = window.innerWidth;
  return windowsWidth - documentWidth;
};

const setCompensateBodyMargin = () => {
  document.body.style.marginRight = `${getScrollbarWidth()}px`;
};

const removeCompensateBodyMargin = () => {
  document.body.style.marginRight = '0';
};

const setFixedBody = () => {
  setCompensateBodyMargin();
  document.body.style.overflow = 'hidden';
};

const removeFixedBody = () => {
  removeCompensateBodyMargin();
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
};

const toggleFixedBody = () => {
  const { overflow } = window.getComputedStyle(document.body);

  if (overflow === 'hidden') {
    removeFixedBody();
  } else {
    setFixedBody();
  }
};

export {
  getScrollbarWidth,
  setFixedBody,
  removeFixedBody,
  toggleFixedBody,
};
