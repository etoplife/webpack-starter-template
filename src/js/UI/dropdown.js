import $ from 'jquery';
import onClickOutside from '../utils/onClickOutside';

class Dropdown {
  static OPEN_EVENT = 'select.open';

  static CLOSE_EVENT = 'select.close';

  static CHANGE_EVENT = 'select.change';

  active = false;

  constructor(root, list, initial = list[0]) {
    this.root = root;
    this.list = list;
    this.initial = initial;
    this.$listItems = new Map();

    this.init();
  }

  toggleActive = () => {
    this.active = !this.active;
    this.$select.toggleClass('active');
    const event = this.active ? Dropdown.CLOSE_EVENT : Dropdown.OPEN_EVENT;
    this.$select.trigger(event);
  };

  change = (item) => {
    this.$select.trigger(Dropdown.CHANGE_EVENT, item);

    const $listItem = this.$listItems.get(item);
    $listItem.siblings().removeClass('active');
    $listItem.addClass('active');

    this.$title.text(item.name);

    if (this.active) {
      this.toggleActive();
    }

    if (this.onChangeCallback) {
      this.onChangeCallback(item);
    }
  };

  onChange(callback) {
    this.onChangeCallback = callback;
  }

  init() {
    const thisHref = this;
    const $select = $('<div class="dropdown js-dropdown"></div>');
    const $title = $(`<div class="dropdown__title js-dropdown-title">${this.initial.name}</div>`);
    const $list = $('<div class="dropdown__list"></div>');

    this.list.forEach((item) => {
      const $listItem = $(`<li class="dropdown__item js-dropdown-item">${item.name}</li>`);
      $listItem.data('item', item);
      $list.append($listItem);

      this.$listItems.set(item, $listItem);
    });

    $select.append($title);
    $select.append($list);

    $title.click(this.toggleActive);
    onClickOutside($select[0], () => {
      if (this.active) {
        this.toggleActive();
      }
    });
    $select.on('click', '.js-dropdown-item', function () {
      const item = $(this).data('item');
      thisHref.change(item);
    });

    $(this.root).html($select);

    this.$title = $title;
    this.$select = $select;
  }
}

export default Dropdown;
