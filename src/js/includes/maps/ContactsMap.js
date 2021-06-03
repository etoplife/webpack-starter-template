import $ from 'jquery';
import loadYandexMap from '../../utils/loadYandexMap';
import device from '../device';
import pinIcon from '../../../images/content/svg/map-pin.svg';

const defaultBalloonLayout = `
  <div class="map-balloon">
    <div class="map-balloon__content">
      <div class="map-balloon__header">{{ properties.header | raw }}</div>
      <div class="map-balloon__body">{{ properties.body | raw }}</div>
      <div class="map-balloon__footer">{{ properties.footer | raw }}</div>
    </div>
    <div class="map-balloon__picture" style="background-image: url('{{ properties.imgHref }}')"></div>
  </div>
`;

class ContactsMap {
  constructor(el, items) {
    this.el = el;
    this.items = items;
    this.itemsHash = [];
    this.callbacks = {
      open: [],
    };

    return this.init();
  }

  async initMap() {
    await window.ymaps.ready();
    this.map = new window.ymaps.Map(this.el, {
      center: [0, 0],
      zoom: 13,
      controls: device === 'mobile' ? [] : ['zoomControl'],
    });

    this.items.forEach((item) => {
      const layout = window.ymaps.templateLayoutFactory.createClass(defaultBalloonLayout);
      const placemark = new window.ymaps.Placemark(
        item.coordinates,
        {
          ...item,
          hintContent: item.name,
        },
        {
          balloonContentLayout: layout,
          iconLayout: 'default#image',
          iconImageHref: pinIcon,
          iconImageSize: device === 'mobile' ? [29, 39] : [49, 68],
        },
      );

      this.itemsHash.push({
        item,
        placemark,
      });

      placemark.balloon.events.add('open', () => {
        this.callbacks.open.forEach((callback) => callback.call(null, item));
      });

      this.map.geoObjects.add(placemark);
    });

    if (this.items.length > 1) {
      this.map.setBounds(this.map.geoObjects.getBounds());
    } else {
      this.map.setCenter(this.items[0].coordinates);
    }

    window.m = this.map;
  }

  onOpen(callback) {
    this.callbacks.open.push(callback);
  }

  open(item) {
    const { placemark } = this.itemsHash.find((data) => data.item === item);
    this.map.setCenter(placemark.geometry.getCoordinates());
    this.map.setZoom(14);
    placemark.balloon.open();
  }

  async init() {
    await loadYandexMap();
    await this.initMap();

    return this;
  }
}

$(() => {
  $('.js-contacts-map').each(async (i, item) => {
    const items = JSON.parse(item.dataset.items);
    item.dataset.contactsMap = await new ContactsMap(item, items);
  });
});

export {
  defaultBalloonLayout,
};

export default ContactsMap;
