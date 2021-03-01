import $ from 'jquery';
import openPopup from '../utils/openPopup';

const successPopup = `
    <div class="success-popup">
      <div class="success-popup__container">
        <div class="success-popup">
          <img src="/local/frontend/dist/static/img/svg-img/success-bg.svg" alt="Заявка отправлена">
        </div>
        <div class="g-modal__title g-modal-success__title form__title">Заявка отправлена</div>
      </div>
    </div>
`;

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
window.successSend = () => {
  $.fancybox.close();
  openPopup(successPopup);
};
