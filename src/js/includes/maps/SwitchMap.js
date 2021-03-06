import $ from 'jquery';
import ContactsMap from './ContactsMap';
import device from '../device';

class SwitchMap {
  constructor(el) {
    this.el = el;
    this.categories = JSON.parse(this.el.dataset.categories);
    this.tabs = el.querySelector('.js-switch-map-tabs');
    this.mapEl = el.querySelector('.js-switch-map-el');
    this.itemsHash = [];

    return this.init();
  }

  initMap() {
    const items = this.categories.reduce((result, category) => [...result, ...category.items], []);
    return new ContactsMap(this.mapEl, items);
  }

  initTabs() {
    const $list = $('<ul class="vertical-tabs__list"></ul>');
    const $result = $('<div class="vertical-tabs"></div>');
    $result.append($list);

    this.categories.forEach((category) => {
      const { name, items } = category;
      const itemClassName = 'vertical-tabs__item';
      const $category = $(`<li class="${itemClassName}">${name}</li>`);

      $category.on('click select.vertical-tabs', function () {
        $list.find(`.${itemClassName}`).removeClass('active');
        $(this).addClass('active');
      });

      if (items) {
        const $subList = $('<ul class="vertical-tabs__sublist"></ul>');

        items.forEach((item) => {
          const $item = $(`<li class="vertical-tabs__subitem">${item.name}</li>`);

          $item.on('click', () => this.setActive(item));

          this.itemsHash.push({
            item,
            $item,
          });

          $subList.append($item);
        });

        if (device !== 'desktop') {
          const onSelect = function () {
            $list.css('padding-bottom', $subList.height());
            $subList.css({
              position: 'absolute',
              bottom: 0,
              left: 0,
            });
          };

          $category.on('click select.vertical-tabs', onSelect);
        }

        $category.append($subList);
      }

      $list.append($category);
    });

    $(this.tabs).html($result);
  }

  setActive(item) {
    this.itemsHash.forEach((data) => {
      const { $item } = data;
      const isActive = data.item === item;

      if (isActive) {
        $item.addClass('active');
        $item.trigger('select.vertical-tabs');
      } else {
        $item.removeClass('active');
      }
    });
    this.map.open(item);
  }

  async init() {
    this.map = await this.initMap();
    this.initTabs();
    this.map.onOpen((item) => this.setActive(item));
  }
}

$(() => {
  $('.js-switch-map').each((i, item) => {
    item.dataset.switchMap = new SwitchMap(item);
  });
});

export default SwitchMap;
