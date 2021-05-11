import $ from 'jquery';
import 'slick-carousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import twoDigitNumber from '../utils/twoDigitNumber';
import svgSprite from '../utils/svgSprite';
import device from "./device";

class MainBanner {
  constructor(el) {
    this.$el = $(el);
    this.$bannerImage = this.$el.find('.js-main-banner-image');
    this.$slider = this.$el.find('.js-main-banner-slider');
    this.$current = this.$el.find('.js-main-banner-current');

    this.init();
  }

  async init() {
    const promises = [];
    promises.push(svgSprite('obtuse-angle-left'));
    promises.push(svgSprite('obtuse-angle-left', { transform: 'rotate(180deg)' }));

    const icons = await Promise.all(promises);

    const $arrowsContainer = $('.js-main-banner-nav');

    const $slider = this.$slider.slick({
      fade: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 15000,
      rows: 0,
    });

    const slickObject = $slider.slick('getSlick');

    if (device === 'desktop') {
      const $list = slickObject.$list;
      const listRightCoord = $list[0].getBoundingClientRect().right;
      const listOffsetRight = Math.ceil(window.innerWidth - listRightCoord);
      $list.css({
        marginRight: listOffsetRight * -1,
        paddingRight: listOffsetRight,
      });
    }

    const setBannerImage = (e, slick, currentSlide, nextSlide) => {
      const $slide = $(slick.$slides[nextSlide]);
      const image = $slide.attr('data-image');
      this.$bannerImage.attr('xlink:href', image);
    };

    setBannerImage(null, slickObject, 0, 0);
    $slider.on('beforeChange', setBannerImage);

    $slider.on('beforeChange', (e, slick, currentSlide, nextSlide) => {
      const humanizedIndex = nextSlide + 1;
      this.$current.text(twoDigitNumber(humanizedIndex));
    });

    const $prevArrow = $(`
        <button class="main-banner__arrow main-banner__arrow_direction_prev" 
        type="button">
          ${icons[0]}
        </button>
    `);

    $prevArrow.click(() => slickObject.slickPrev());

    const $nextArrow = $(`
        <button class="main-banner__arrow main-banner__arrow_direction_prev"
        type="button">
          ${icons[1]}
        </button>
    `);

    $nextArrow.click(() => slickObject.slickNext());

    $arrowsContainer.append($prevArrow).append($nextArrow);
  }
}

$(() => {
  const $mainBanner = $('.js-main-banner');

  if ($mainBanner.length) {
    $mainBanner.each((i, item) => new MainBanner(item));
  }
});
