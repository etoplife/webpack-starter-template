import $ from 'jquery';
import device from './device';

const initSlider = (el, options = {}) => {
  const $el = $(el);
  const dots = $el.attr('data-dots') === '1';
  const arrows = $el.attr('data-nav') === '1';
  const items = $el.attr(`data-${device}-items`) || $el.attr('data-items') || 1;
  const variableWidth = $el.attr('data-autowidth') === '1';

  const defaultOptions = {
    dots,
    arrows,
    slidesToShow: items,
    slidesToScroll: items,
    lazyLoad: 'ondemand',
    variableWidth,
  };

  const resultOptions = {
    ...defaultOptions,
    ...options,
  };

  return $el.slick(resultOptions);
};

const $slider = $('.js-slider');
$slider.toArray().forEach((item) => initSlider(item));

export default initSlider;