import $ from 'jquery';
import IMask from 'imask';

function plus7(elem, mask) {
  elem.addEventListener('focus', function () {
    if (!mask.masked.rawInputValue) {
      mask.typedValue = '7(';
    }
  }, true);
  elem.addEventListener('blur', function () {
    if (!mask.masked.rawInputValue) {
      mask.value = '';
    }
  }, true);
}

$(() => {
  const $tel = $('input[type="tel"]');

  $tel.each((i, item) => {
    const mask = IMask(item, {
      mask: '+{7} (000) 000-00-00',
    });
    plus7(item, mask);
  });
});
