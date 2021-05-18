const tabsSelector = '.js-tabs';
const tabsSwitchSelector = '.js-tabs-switch';
const tabsContentSelector = '.js-tabs-content';

const switchTab = ($tabs, index) => {
  const $switch = $tabs.find(tabsSwitchSelector);
  const $content = $tabs.find(tabsContentSelector);
  const $currentTab = $content.eq(index);

  const init = () => {
    $switch.removeClass('active').eq(index).addClass('active');
    $content.hide();
    $currentTab.show();
  };

  const $slider = $currentTab.find('.slick-slider');
  if ($slider.length) {
    $currentTab.css('opacity', 0);
    $slider.slick('getSlick').destroy();
    $slider.slick('getSlick').init();
    init();
    setTimeout(() => $currentTab.css('opacity', 1), 100);
  } else {
    init();
  }
};

$(document).on('click', tabsSwitchSelector, function () {
  const $this = $(this);

  if ($this.hasClass('active')) {
    return;
  }

  const $tabs = $this.closest(tabsSelector);
  const index = $this.index();

  switchTab($tabs, index);
});

$(() => $(tabsSelector).each((i, item) => switchTab($(item), 0)));
