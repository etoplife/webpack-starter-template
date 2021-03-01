import $ from 'jquery';
import svgSprite from '../utils/svgSprite';
import device from './device';

if (device === 'mobile') {
  $(() => {
    const $sections = $('.js-footer-section');

    $sections.each((i, item) => {
      const $this = $(item);
      const $title = $this.find('.js-footer-section-title');
      const $list = $this.find('.js-footer-section-list');

      svgSprite('angle-down', {}, 'footer__nav-section-angle')
        .then((angle) => $title.append(angle));

      $title.click(() => {
        $this.toggleClass('active');
        $list.slideToggle();
      });
      $list.slideUp();
    });
  });
}
