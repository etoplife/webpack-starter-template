import $ from 'jquery';
import twoDigitNumber from "../utils/twoDigitNumber";
import svgSprite from "../utils/svgSprite";

class MainBanner {
  constructor(el) {
    this.$el = $(el);
    this.$titleMain = this.$el.find('.js-main-banner-title-main');
    this.$titleDescription = this.$el.find('.js-main-banner-title-description');
    this.$subtitleMain = this.$el.find('.js-main-banner-subtitle');
    this.$subtitleDescription = this.$el.find('.js-main-banner-subtitle-description');
    this.$image = this.$el.find('.js-main-banner-image');
    this.$current = this.$el.find('.js-main-banner-current');
    this.$prev = this.$el.find('.js-main-banner-prev');
    this.$next = this.$el.find('.js-main-banner-next');
    this.slides = JSON.parse(this.$el.attr('data-items'));
    this.currentSlideIndex = 0;

    this.init();
  }

  changeSlideContent(index) {
    const slide = this.slides[index];
    this.$titleMain.html(slide.titleMain);
    this.$titleDescription.html(slide.titleDescription);
    this.$subtitleMain.html(slide.subtitleMain);
    this.$subtitleDescription.html(slide.subtitleDescription);
    this.$image.attr('xlink:href', slide.image);
  }

  changeNav(index) {
    this.currentSlideIndex = index;
    this.$current.text(twoDigitNumber(index + 1));
  }

  changeSlide(index) {
    if (index < 0 || index > this.slides.length - 1) {
      return;
    }

    this.changeSlideContent(index);
    this.changeNav(index);
  }

  initNav() {
    this.$prev.click(() => this.changeSlide(this.currentSlideIndex - 1));
    this.$next.click(() => this.changeSlide(this.currentSlideIndex + 1));
    svgSprite('obtuse-angle-left').then((svg) => this.$prev.html(svg));
    svgSprite('obtuse-angle-left', {
      transform: 'rotate(180deg)',
    }).then((svg) => this.$next.html(svg));
  }

  init() {
    this.initNav();
    this.changeSlide(this.currentSlideIndex);
  }
}

$(() => {
  const $mainBanner = $('.js-main-banner');

  if ($mainBanner.length) {
    $mainBanner.each((i, item) => new MainBanner(item));
  }
});
