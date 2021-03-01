import $ from 'jquery';

const onClickOutside = (el, callback) => {
  $(document).click(function ({ target }) {
    const $target = $(target);

    if (!$target.closest(el).length) {
      callback(target);
    }
  });
};

export default onClickOutside;
