import $ from 'jquery';
import device from './device';
import containerWidth from './container';

const initSlider = (el, options = {}) => {
  const $el = $(el);
  const dots = $el.attr('data-dots') === '1';
  const arrows = $el.attr('data-nav') === '1';
  const items = $el.attr(`data-${device}-items`) || $el.attr('data-items') || 1;
  const variableWidth = $el.attr('data-autowidth') === '1';
  const isContainerWidth = $el.attr('data-containerwidth') === '1';

  if (isContainerWidth) {
    let padding = 0;

    if (device === 'desktop') {
      padding = (document.body.clientWidth - containerWidth) / 2;
    } else {
      padding = document.body.clientWidth * 0.22;
    }

    const width = el.offsetWidth - padding;
    $el.children()
      .css('max-width', width)
      .prepend(`<div style="width: ${width}px"></div>`);
  }

  const defaultOptions = {
    dots,
    arrows,
    slidesToShow: items,
    slidesToScroll: items,
    lazyLoad: 'ondemand',
    variableWidth,
    draggable: true,
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
