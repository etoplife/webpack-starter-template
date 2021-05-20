import device from './device';
import initSlider from './slider';

const $itemsWrapper = $('<div class="gallery-grid__items"></div>');
const $galleryGrid = $('.js-gallery-grid');

$galleryGrid.each(function () {
  const $this = $(this);
  const $items = $this.children();
  const itemsCount = +$this.attr(`data-${device}-gallery-items`);

  for (let i = 0; i < $items.length; i += itemsCount) {
    $items.slice(i, i + itemsCount).wrapAll($itemsWrapper.clone());
  }

  initSlider(this, {
    fade: true,
    dots: true,
    rows: 0,
  });
});
