import $ from 'jquery';
import openPopup from '../utils/openPopup';
import svgSprite from '../utils/svgSprite';

const getSuccessPopup = async () => {
  const icon = await svgSprite('success', {}, 'success-popup__img');

  return `
    <div class="success-popup">
      <div class="success-popup__container">
        <div class="success-popup__img-wrapper">
          ${icon}
        </div>
        <div class="success-popup__title">Заявка отправлена</div>
      </div>
    </div>
  `;
};

$(function() {
  $('[data-fancybox]').fancybox({
    mobile: {
      clickSlide: 'close',
    },
  });
});

$(document).on('click', '[data-popup]', function() {
  const src = $(this).attr('data-popup');
  openPopup(src);
});

// показ при успешной отправке
window.successSend = async () => {
  $.fancybox.close();
  const successPopup = await getSuccessPopup();
  openPopup(successPopup);
};
